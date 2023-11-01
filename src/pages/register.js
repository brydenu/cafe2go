import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import FormikInput from "components/FormikInput";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import Navbar from "components/Navbar";

export default function Register() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            first_name: yup.string().required("First name is required"),
            last_name: yup.string().required("Last name is required"),
            email: yup
                .string()
                .email("Invalid email address")
                .required("Email is required"),
            password: yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                const response = await axios.post("/api/auth/register", values);

                if (response.status === 200) {
                    const data = response.data;
                    const { token } = data;
                    localStorage.setItem("token", token);
                    router.push("/dashboard");
                }
            } catch (e) {
                if (e.response.status === 409) {
                    setErrorMessage("Account with that email already exists");
                    setIsSubmitting(false);
                } else {
                    setErrorMessage(
                        "Error creating account. Please try again later."
                    );
                    setIsSubmitting(false);
                }
            }
        },
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/dashboard");
        }
    }, []);

    return (
        <main className="w-full min-h-screen flex flex-col items-center justify-center bg-background">
            <Navbar />
            <div className="pt-3 sm:rounded w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                <div className="flex flex-row items-center justify-center gap-5">
                    <Image
                        priority
                        src="/images/logo.png"
                        height={45}
                        width={45}
                        alt="Cafe2Go logo"
                    />
                    <h1 className="text-4xl text-primary font-bold my-5">
                        Register
                    </h1>
                </div>
                <form
                    className="flex flex-col bg-white gap-2 pt-4 items-center sm:rounded shadow-md"
                    onSubmit={formik.handleSubmit}
                >
                    <FormikInput
                        name="first_name"
                        id="first_name"
                        label="First Name"
                        formik={formik}
                    />
                    <FormikInput
                        name="last_name"
                        id="last_name"
                        label="Last Name"
                        formik={formik}
                    />
                    <FormikInput
                        name="email"
                        id="email"
                        label="Email"
                        formik={formik}
                    />
                    <FormikInput
                        name="password"
                        id="password"
                        label="Password"
                        type="password"
                        formik={formik}
                    />
                    <div className="w-full flex justify-between py-2 rounded-b px-10 pb-5">
                        <p className="text-sm mt-2">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className=" text-secondary underline"
                            >
                                Login
                            </Link>
                        </p>
                        <p className="text-red-700 font-sm">
                            {!!errorMessage && errorMessage}
                        </p>
                        <button
                            type="submit"
                            disabled={isSubmitting ? true : false}
                            className="bg-secondary text-white px-2 py-2 ml-2 rounded-lg w-1/4 text-center"
                        >
                            {isSubmitting ? (
                                <ClipLoader
                                    color="#ffffff"
                                    size={16}
                                    loading={true}
                                    aria-label="Loading Spinner"
                                />
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
