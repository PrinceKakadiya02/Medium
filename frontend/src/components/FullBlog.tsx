import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"


export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div>
            <AppBar />
            <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl mx-auto gap-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold py-3">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on 7th July 2000
                    </div>
                    <div className="pt-4 text-slate-700 leading-relaxed">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full pt-4">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Master of mirth, purveyour of puns, and the funniest person in the kingdom
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}