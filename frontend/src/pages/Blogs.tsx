import { Link } from "react-router-dom";
import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "./../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div className="flex justify-center mt-10">Loading blogs...</div>
    }

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="w-full max-w-screen-lg px-4 sm:px-6 md:px-8 pt-4">
                    {blogs.map(blog => (
                    <Link to={`/blog/${blog.id}`}>
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate="2nd of March 2026"
                        />
                    </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}