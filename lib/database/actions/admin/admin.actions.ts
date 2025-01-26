import { connectToDatabase } from "../../connect";
import Admin from "../../models/admin.model";

export async function deleteAdminById(id: string | null) {
  try {
    if (!id) {
      throw new Error("Admin ID is required");
    }

    await connectToDatabase();

    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      throw new Error("Admin not found");
    }

    return { message: "Admin deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting admin:", error);
    throw new Error(error.message || "Unknown error");
  }
}

export async function fetchAllAdmins() {
  try {
    await connectToDatabase();
    
    const admins = await Admin.find();
    
    const formattedAdmins = admins.map((admin) => ({
      _id: admin._id,
      email: admin.email,
      username: admin.username,
    }));

    return { success: true, admins: formattedAdmins };
  } catch (error: any) {
    console.error("Error fetching admins:", error);
    return { success: false, error: "Failed to fetch admins", admins: [] };
  }
}

