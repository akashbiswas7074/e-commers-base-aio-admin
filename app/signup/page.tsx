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
import { registerVendor } from "@/lib/database/actions/admin/auth/register";

const SignUpPage = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      description: "",
      address: "",
      phoneNumber: 0,
      zipCode: 0,
    },
    validate: {
      name: hasLength({ min: 8 }, "Must be at least 8 characters long."),
=======
import { registerAdmin } from "@/lib/database/actions/admin/auth/register";

// AdminRegistrationForm Component
const AdminRegistrationForm = ({ onSuccess, onFailure }: any) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
      email: isEmail("Invalid Email."),
      password: hasLength(
        { min: 10 },
        "Password must be at least 10 characters long."
      ),
<<<<<<< HEAD
      address: hasLength({ min: 15 }, "Must be at least 15 characters long."),
    },
  });
=======
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const res = await registerAdmin(values.email, values.password);
      if (res?.success) {
        onSuccess();
      } else {
        onFailure(res?.message);
      }
    } catch (error) {
      onFailure(error.toString());
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="w-[500px]">
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
        Register
      </Button>
    </form>
  );
};

// SignUpPage Component
const SignUpPage = () => {
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
  const [successMessage, setSuccessMessage] = useState(false);
  const [failureMessage, setFailureMessage] = useState<{
    visible: boolean;
    message: string | undefined;
<<<<<<< HEAD
  }>({ visible: false, message: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true);
      await registerVendor(
        values.name,
        values.email,
        values.password,
        values.address,
        values.phoneNumber,
        values.zipCode
      )
        .then((res) => {
          if (res?.success) {
            setSuccessMessage(true);
            setFailureMessage({ visible: false, message: "" });
            setTimeout(() => {
              router.push("/vendor/dashboard");
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
      console.log(error);
    } finally {
      setLoading(false);
    }
=======
  }>({
    visible: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    setSuccessMessage(true);
    setFailureMessage({ visible: false, message: "" });
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 3000);
  };

  const handleFailure = (message: string) => {
    setSuccessMessage(false);
    setFailureMessage({ visible: true, message });
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="">
<<<<<<< HEAD
          <h1 className="text-3xl font-bold">Sign Up</h1>
=======
          <h1 className="text-3xl font-bold">Admin Registration</h1>
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
          {failureMessage.visible && (
            <Notification color="red" title="Error!" mt={"md"}>
              {failureMessage.message}
            </Notification>
          )}
          {successMessage && (
            <Notification
              color="teal"
<<<<<<< HEAD
              title="Successfully sent verification request to an admin."
=======
              title="Registration Successful"
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
              mt={"md"}
            >
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
<<<<<<< HEAD
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
              <TextInput
                {...form.getInputProps("name")}
                label="Name"
                placeholder="Name"
                required
              />
              <PasswordInput
                {...form.getInputProps("password")}
                label="Password"
                placeholder="Password"
                required
              />
              <NumberInput
                {...form.getInputProps("phoneNumber")}
                label="Phone Number"
                placeholder="Phone Number"
                required
                mt={"md"}
              />
              <NumberInput
                {...form.getInputProps("zipCode")}
                label="Zip Code"
                placeholder="Zip Code"
                required
                mt={"md"}
              />
              <Textarea
                {...form.getInputProps("address")}
                placeholder="Address"
                label="Address"
                required
              />
              <Textarea
                {...form.getInputProps("description")}
                placeholder="Description"
                label="Description"
              />
              <Button type="submit" mt={"md"}>
                {loading ? "Loading..." : "Submit"}
              </Button>
            </form>
=======
            <AdminRegistrationForm
              onSuccess={handleSuccess}
              onFailure={handleFailure}
            />
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
