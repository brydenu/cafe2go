import Link from 'next/link';
import Header from 'components/Header'
import Image from 'next/image';
import axios from 'axios';
import FormikInput from 'components/FormikInput';
import * as yup from 'yup';
import { useFormik } from 'formik';
import LoadingSpinner from 'components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid email address').required('Email is required'),
            password: yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            console.log("submitted. values:", values)
            try {
                const response = await axios.post("/api/auth", values);
                console.log("login response:", response);
                if (response.status === 200) {
                    const { data } = response;
                    const { token } = data;
                    localStorage.setItem('token', token);
                    console.log("logged in successful");
                    router.push("/dashboard");
                }
            } catch (e) {
                console.error("Error logging in. Error:", e)
            }
        }
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/dashboard");
        }
    }, []);

    return (
        <>
        <Header />
        <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <div className="w-full flex justify-center items-center my-10">
                <Image 
                    priority
                    src="/images/BS-Symbol-BS-Master-TM.svg"
                    height={75}
                    width={75}
                    alt="Biolife Solutions logo"
                />
                <h1 className="mx-4 font-bold text-primary text-4xl">Biolife Cafe</h1>
            </div>
            <form 
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full w-full sm:w-4/5 flex flex-col items-center justify-center"
                onSubmit={formik.handleSubmit}    
            >
                    <FormikInput name="email" id="email" label="Email" formik={formik} />
                    <FormikInput name="password" id="password" label="Password" type="password" formik={formik} />
                <div className="w-full flex flex-col-reverse gap-2 sm:gap-0 sm:flex-row justify-between items-center">
                    <Link href="/register" as="p" className="text-xs text-secondary underline">Create your account</Link>
                    <button disabled={isSubmitting ? true : false} className="w-40 bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        {isSubmitting ? 
                            (<LoadingSpinner size="6" color="white" />)
                            :
                            "Sign in"
                        }
                    </button>
                </div>
            </form>
        </main>
        </>
    )
}
