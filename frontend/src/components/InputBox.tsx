import { ChangeEvent } from "react";

interface InputBoxProps {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export const InputBox = ({ onChange, type, placeholder, label }: InputBoxProps) => {
    return (
        <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" placeholder={placeholder} required />
        </div>
    )
}