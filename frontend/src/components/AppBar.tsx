import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = () => {
    return (
        <div className="border-b flex justify-between items-center px-4 md:px-10 py-4">
            <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer text-xl font-bold">
                Medium
            </Link>
            <div className="">
                <Link to={`/publish`}>
                    <button className="mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        New
                    </button>
                </Link>
                <Avatar size={"big"} name="harkirat" />
            </div>
        </div>
    )
}