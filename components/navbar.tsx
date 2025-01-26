"use client";
import { Button, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/database/actions/admin/auth/logout";
import { useEffect, useState } from "react";
import { getAdminCookiesandFetchAdmin } from "@/lib/database/actions/admin/admin.actions";

import React from "react";
import Logo from "./Logo";

const Navbar = () => {
  const [admin, setAdmin] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const res = await getAdminCookiesandFetchAdmin();
        if (res?.success) {
          setAdmin(res?.admin);
        }
      } catch (error: any) {
        console.error("Error fetching admin details:", error);
      }
    };
    fetchAdminDetails();
  }, []);

  return (
    <header className="p-[1rem] border-b-[1px] border-b-[#eaeaea]">
      <nav className="flex justify-between items-center">
        <Logo />
        <Group>
          {admin && admin.email ? (
            <div className="flex gap-[10px]">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/dashboard")}
              >
                Admin Dashboard
              </Button>
              <Button
                onClick={async () => {
                  try {
                    const response = await logout(); // Call the logout function
                    if (response?.message === "Successfully logged out!") {
                      router.push("/"); // Navigate to home after successful logout
                    } else {
                      console.error(
                        "Logout failed:",
                        response?.message || "Unknown error"
                      );
                    }
                  } catch (error) {
                    console.error("Logout error:", error);
                  }
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-[10px]">
              <Button variant="outline" onClick={() => router.push("/signin")}>
                Sign in
              </Button>
              <Button onClick={() => router.push("/signup")}>Sign Up</Button>
            </div>
          )}
        </Group>
      </nav>
    </header>
  );
};

export default Navbar;
