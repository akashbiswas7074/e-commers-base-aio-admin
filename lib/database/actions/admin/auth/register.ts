"use server";

import { connectToDatabase } from "@/lib/database/connect";
<<<<<<< HEAD
import Vendor from "@/lib/database/models/vendor.model";
import { cookies } from "next/headers";
const bcrypt = require("bcrypt");

export const registerVendor = async (
  name: string,
  email: string,
  password: string,
  address: string,
  phoneNumber: number,
  zipCode: number
) => {
  try {
    await connectToDatabase();
    if (!name || !email || !password || !address || !phoneNumber || !zipCode) {
=======
import Admin from "@/lib/database/models/admin.model";
import { cookies } from "next/headers";
const bcrypt = require("bcrypt");

export const registerAdmin = async (email: string, password: string) => {
  try {
    await connectToDatabase();
    if (!email || !password) {
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
      return {
        message: "Please fill in all fields",
        success: false,
      };
    }
<<<<<<< HEAD
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return {
        message: "Vendor already exists.",
=======
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return {
        message: "Admin already exists.",
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
        success: false,
      };
    }
    if (password.length < 6) {
      return {
        message: "Password must be at least 6 characters long.",
        success: false,
      };
    }
<<<<<<< HEAD
    const cryptedPassword = await bcrypt.hash(password, 12);
    const vendor = await new Vendor({
      name,
      email,
      password: cryptedPassword,
      address,
      phoneNumber,
      zipCode,
    }).save();

    // Call the `getJWTToken` method on the saved `vendor`
    const token = vendor.getJWTToken();

    const cookieStore = await cookies();
    cookieStore.set("vendor_token", token, {
=======
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await new Admin({
      email,
      password: hashedPassword,
    }).save();

    // Call the getJWTToken method on the saved admin
    const token = admin.getJWTToken();

    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    });

    return {
<<<<<<< HEAD
      message: "Successfully registered new vendor.",
      vendor: JSON.parse(JSON.stringify(vendor)),
=======
      message: "Successfully registered new admin.",
      admin: JSON.parse(JSON.stringify(admin)),
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
      success: true,
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: "An error occurred during registration.",
      success: false,
    };
  }
};
