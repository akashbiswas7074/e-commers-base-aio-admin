"use client";
import React, { useState } from "react";
import {
  Button,
<<<<<<< HEAD
  NumberInput,
  PasswordInput,
  Textarea,
=======
  PasswordInput,
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
  TextInput,
  Notification,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
<<<<<<< HEAD
import { loginVendor } from "@/lib/database/actions/admin/auth/login";
=======
import { loginAdmin } from "@/lib/database/actions/admin/auth/login"; // Adjusted function name for clarity
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6

const SignInPage = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Invalid Email."),
      password: hasLength(
        { min: 10 },
        "Password must be at least 10 characters long."
      ),
    },
  });
<<<<<<< HEAD
=======

>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
  const [successMessage, setSuccessMessage] = useState(false);
  const [failureMessage, setFailureMessage] = useState<{
    visible: boolean;
    message: string | undefined;
  }>({ visible: false, message: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
<<<<<<< HEAD
  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true);
      await loginVendor(values.email, values.password)
=======

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true);
      await loginAdmin(values.email, values.password) // Calling the admin-specific function
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
        .then((res) => {
          if (res?.success) {
            setSuccessMessage(true);
            setFailureMessage({ visible: false, message: "" });
            setTimeout(() => {
<<<<<<< HEAD
              router.push("/vendor/dashboard");
=======
              router.push("/admin/dashboard");
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
            }, 3000);
          } else if (!res?.success) {
            setSuccessMessage(false);
            setFailureMessage({ visible: true, message: res?.message });
          }
        })
        .catch((err) => {
          setFailureMessage({ visible: true, message: err.toString() });
        });
    } catch (error: any) {
<<<<<<< HEAD
      console.log(error);
=======
      console.error(error);
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="">
<<<<<<< HEAD
          <h1 className="text-3xl font-bold">Sign In</h1>
=======
          <h1 className="text-3xl font-bold">Admin Sign In</h1>
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
          {failureMessage.visible && (
            <Notification color="red" title="Error!" mt={"md"}>
              {failureMessage.message}
            </Notification>
          )}
          {successMessage && (
<<<<<<< HEAD
            <Notification color="teal" title="Successfully logged in" mt={"md"}>
=======
            <Notification color="teal" title="Successfully Logged In" mt={"md"}>
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
              You&apos;re being redirected to the dashboard
            </Notification>
          )}
          <Box pos={"relative"}>
            {loading && (
              <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
              />
            )}
            <form
              onSubmit={form.onSubmit((values) => {
                handleSubmit(values);
              })}
              className="w-[500px]"
            >
              <TextInput
                {...form.getInputProps("email")}
                mt={"md"}
                label="Email"
                placeholder="Email"
                required
              />

              <PasswordInput
                {...form.getInputProps("password")}
                label="Password"
                placeholder="Password"
                required
              />

              <Button type="submit" mt={"md"}>
<<<<<<< HEAD
                {loading ? "Loading..." : "Submit"}
=======
                {loading ? "Loading..." : "Sign In"}
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
              </Button>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
