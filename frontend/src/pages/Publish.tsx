
import { useState } from "react";
import { AppBar } from "../components/AppBar"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const postBlog = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/blog`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token") || ""
                },
                body: JSON.stringify({
                    title,
                    content: description
                })
            });

            if (response.ok) {
                const data = await response.json();
                navigate(`/blog/${data.id}`);
            } else {
                alert("Error creating the blog");
            }
        } catch (error) {
            console.error("Error publishing blog:", error);
            alert("Error creating the blog");
        }
    };

    return (
        <div>
            <AppBar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input onChange={(e) => setTitle(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none mb-4" placeholder="Title" />
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-full min-h-[200px] resize-none rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Write your article..."></textarea>
                    <button type="submit" onClick={postBlog} className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-600">
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    )
}