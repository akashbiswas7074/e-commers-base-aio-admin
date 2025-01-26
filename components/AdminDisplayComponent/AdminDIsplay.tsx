"use client";
import {
  deleteAdminById,
  fetchAllAdmins,
} from "@/lib/database/actions/admin/admin.actions";
import React, { useState, useEffect } from "react";

// Type for Admin
type Admin = {
  _id: string;
  username: string;
  email: string;
};

// AdminsList Component Props type
type AdminsListProps = {
  reload: boolean; // Reload trigger prop
};

const AdminsList: React.FC<AdminsListProps> = ({ reload }) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);

  // Fetch all admins using the service function whenever `reload` changes
  useEffect(() => {
    const loadAdmins = async () => {
      setLoading(true); // Start loading
      setErrorMessage("");
      try {
        const { success, admins, error } = await fetchAllAdmins();
        if (success) {
          setAdmins(admins);
        } else {
          setErrorMessage("Unable to fetch admins");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching admins.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadAdmins();
  }, [reload]); // Trigger fetch when reload changes

  // Handle admin deletion using the service function
  const handleDelete = async () => {
    if (adminToDelete) {
      setLoading(true); // Start loading during deletion
      setErrorMessage("");
      try {
        const { message } = await deleteAdminById(adminToDelete._id);
        if (message) {
          // Filter out the deleted admin from the list
          setAdmins((prevAdmins) =>
            prevAdmins.filter((admin) => admin._id !== adminToDelete._id)
          );
        } else {
          setErrorMessage("Failed to delete admin.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while deleting the admin.");
      } finally {
        setLoading(false); // Stop loading after deletion
        setIsModalOpen(false); // Close modal after deletion
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Admins List</h1>

      {/* Display error message if any */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Loading spinner */}
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-lg">
          Loading...
        </div>
      )}

      <div className="space-y-4 mt-4">
        {admins.length > 0 ? (
          admins.map((admin) => (
            <div
              key={admin._id}
              className="flex justify-between items-center p-4 border rounded-lg shadow-sm"
            >
              <div>
                <h3 className="text-lg font-semibold">{admin.username}</h3>
                <p>{admin.email}</p>
              </div>
              <button
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                onClick={() => {
                  setAdminToDelete(admin);
                  setIsModalOpen(true);
                }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No admins found.</p>
        )}
      </div>

      {/* Confirmation Modal for deletion */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this admin?</p>
            <div className="flex justify-end gap-2">
              <button
                className="border p-2 rounded hover:bg-gray-100 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminsList;
