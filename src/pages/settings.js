import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import FormikInput from "components/FormikInput";
import getLoggedInUser from "utils/client/getLoggedInUser";
import updateUser from "utils/client/updateUser";
import AuthWrapper from "components/AuthWrapper";

export default function Settings() {
    const [user, setUser] = useState({});
    const [token, setToken] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);

        const getUser = async () => {
            const res = await getLoggedInUser(token);
            const loggedInUser = res.user.data;
            setUser(loggedInUser);
        };
        getUser();
    }, []);

    const formik = useFormik({
        initialValues: {
            first_name: user?.first_name,
            last_name: user?.last_name,
            email: user?.email,
            password: "",
            new_password: "",
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
                const response = await updateUser(token, values);

                if (response.status === 200) {
                    const data = response.data;
                    setIsSubmitting(false);
                }
            } catch (e) {
                if (e.response.status === 409) {
                    setErrorMessage("Account with that email already exists");
                    setIsSubmitting(false);
                } else {
                    setErrorMessage(
                        "Error updating account. Please try again later."
                    );
                    setIsSubmitting(false);
                }
            }
        },
    });

    useEffect(() => {
        formik.setValues(user);
    }, [user]);

    const handleGoToDashboard = () => {
        router.push("/dashboard");
    };

    //   console.log("user", user);
    //   console.log("formik", formik);
    return (
        <AuthWrapper>
            <main
                className="w-full min-h-screen flex flex-col items-center justify-center bg-background"
                style={{ margin: 0, padding: 0 }}
            >
                <div className="bg-white rounded w-full sm:m-36">
                    <form
                        className="flex flex-col bg-white gap-2 p-6 items-center sm:rounded shadow-md"
                        onSubmit={formik.handleSubmit}
                    >
                        <h1 className="text-4xl">Settings</h1>
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
                            name="new_password"
                            id="new_password"
                            label="New Password"
                            type="password"
                            formik={formik}
                        />
                        <FormikInput
                            name="password"
                            id="password"
                            label="Current Password"
                            type="password"
                            formik={formik}
                        />
                        <div className="flex flex-row w-full gap-6">
                            <button
                                type="button"
                                onClick={handleGoToDashboard}
                                className="bg-secondary hover:bg-primary duration-200 text-white w-full px-4 py-2 rounded"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting ? true : false}
                                className="bg-secondary hover:bg-primary duration-200 text-white w-full px-4 py-2 rounded"
                            >
                                {isSubmitting ? (
                                    <ClipLoader
                                        color="#ffffff"
                                        size={16}
                                        loading={true}
                                        aria-label="Loading Spinner"
                                    />
                                ) : (
                                    "Update"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </AuthWrapper>
    );
}
