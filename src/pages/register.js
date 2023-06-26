import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import FormikInput from 'components/FormikInput';
import { useState } from 'react';

export default function Register() {
    const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      first_name: yup.string().required('First name is required'),
      last_name: yup.string().required('Last name is required'),
      email: yup.string().email('Invalid email address').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
        
        const response = await axios.post("/api/auth/register", values);
        console.log("response:", response);

        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);

        } else {
        // Handle error
      }
    },
  });

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
        <div className="bg-primary pt-3 rounded w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
            <div className="mb-4">
                <h1 className="text-4xl text-white font-bold mx-4">Register</h1>
            </div>
            <form 
                className="flex flex-col bg-white gap-2 pt-4"
                onSubmit={formik.handleSubmit}
            >
            <FormikInput name="first_name" id="first_name" label="First Name" formik={formik} />
            <FormikInput name="last_name" id="last_name" label="Last Name" formik={formik} />
            <FormikInput name="email" id="email" label="Email" formik={formik} />
            <FormikInput name="password" id="password" label="Password" type="password" formik={formik} />
                <div className="bg-primary flex justify-end py-2 rounded-b">
                    <button type="submit" className="bg-secondary text-white px-5 py-2 rounded-lg w-1/4 mr-4">Submit</button>
                </div>
            </form>
        </div>
    </main>
  );
}
