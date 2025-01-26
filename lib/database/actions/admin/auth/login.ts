"use server";

import { connectToDatabase } from "@/lib/database/connect";
<<<<<<< HEAD
import Vendor from "@/lib/database/models/vendor.model";
import { cookies } from "next/headers";

export const loginVendor = async (email: string, password: string) => {
=======
import Admin from "@/lib/database/models/admin.model";
import { cookies } from "next/headers";

export const loginAdmin = async (email: string, password: string) => {
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
  try {
    await connectToDatabase();
    if (!email || !password) {
      return {
        message: "Please fill in all fields",
        success: false,
      };
    }
<<<<<<< HEAD
    const vendor = await Vendor.findOne({ email }).select("+password");
    if (!vendor) {
      return {
        message: "Vendor does'nt exits.",
        success: false,
      };
    }
    const isPasswordValid = await vendor.comparePassword(password);
=======
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return {
        message: "Admin doesn't exist.",
        success: false,
      };
    }
    const isPasswordValid = await admin.comparePassword(password);
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
    if (!isPasswordValid) {
      return {
        message: "Password is incorrect.",
        success: false,
      };
    }
<<<<<<< HEAD
    const token = vendor.getJWTToken();
    const cookieStore = await cookies();
    cookieStore.set("vendor_token", token, {
=======
    const token = admin.getJWTToken();
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    });
    return {
      message: "Login Successful.",
<<<<<<< HEAD
      vendor: JSON.parse(JSON.stringify(vendor)),
=======
      admin: JSON.parse(JSON.stringify(admin)),
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
      token,
      success: true,
    };
  } catch (error: any) {
    console.log(error);
<<<<<<< HEAD
=======
    return {
      message: "An error occurred during login.",
      success: false,
    };
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
  }
};
