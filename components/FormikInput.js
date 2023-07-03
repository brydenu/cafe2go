import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

export default function FormikInput({ name, id, label, formik, type="text" }) {
    // const [isError, setIsError] = useState(formik.touched[name] && formik.errors[name]);

    const isError = formik.touched[name] && formik.errors[name];
    // const classNames =  isError ? "border border-red-500" : "";
    
    return (
        <div className="flex flex-col mx-10">
            <label htmlFor={name} className="text-sm font-bold">{label}</label>
            <div className={`duration-200 pb-3 pt-2 rounded`}>
                <input id={id} type={type} className="w-full px-3 pt-2 text-2xl outline-none duration-300 focus:bg-gray-100" {...formik.getFieldProps(id)} />
                <div className={`w-full border-b border-1 duration-300 ${isError ? "border-red-500" : "border-secondary" }`} />
            </div>
                {formik.touched[name] && formik.errors[name] ? (
                    <div className="text-red-500 text-sm">{formik.errors[name]}</div>
                    ) : null}
        </div>
    )
}