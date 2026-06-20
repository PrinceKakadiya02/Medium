import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
    content: string;
    title: string;
    id: string;
    published: boolean;
    author: {
        name: string;
        id: string;
        email: string;
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token") || ""
            }
        })
            .then(res => res.json())
            .then(data => {
                setBlogs(data.blogs || []);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [])

    return {
        loading,
        blogs
    }
}

export const useBlog = ( { id }: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token") || ""
            }
        })
            .then(res => res.json())
            .then(data => {
                setBlog(data.blog || []);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [ id ])

    return {
        loading,
        blog
    }
}

