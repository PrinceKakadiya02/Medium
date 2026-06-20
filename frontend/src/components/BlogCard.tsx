import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string | number;
    authName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({ id, authName, title, content, publishedDate }: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-4 border-b border-slate-200 pb-4 w-full cursor-pointer">
                <div className="flex items-center">
                    <Avatar name={authName} />
                    <div className="font-medium pl-2 text-sm flex justify-center flex-col">
                        {authName}
                    </div>
                    <div className="flex justify-center flex-col pl-2">
                        <Circle />
                    </div>
                    <div className="pl-2 font-normal text-slate-500 text-sm flex justify-center flex-col">
                        {publishedDate}
                    </div>
                </div>
                <div className="text-2xl font-bold pt-2">
                    {title}
                </div>
                <div className="text-base font-normal pt-1">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="text-slate-500 text-sm font-normal pt-4">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    )
}

export function Avatar({ name, size = "small" }: { name?: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-slate-200 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`font-medium text-gray-600 ${size === "small" ? "text-xs" : "text-xl"}`}>{(name || "Anonymous")[0].toUpperCase()}</span>
        </div>
    )
}

export function Circle() {
    return (
        <div className="h-1 w-1 rounded-full bg-slate-500">
        </div>
    )
}