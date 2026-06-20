import zod from 'zod'

export const signup = zod.object({
    email: zod.string().email(),
    password: zod.string().min(5),
    name: zod.string()
})

export const signin = zod.object({
    email: zod.string().email(),
    password: zod.string().min(5)
})

export const createBlog = zod.object({
    title: zod.string().min(5),
    content: zod.string().min(5)
})

export const updateBlog = zod.object({
    id: zod.string(),
    title: zod.string().min(5),
    content: zod.string().min(5)
})

export const getBlog = zod.object({
    id: zod.string()
})

export type SigninInput = zod.infer<typeof signin>
export type SignupInput = zod.infer<typeof signup>
export type CreateBlogInput = zod.infer<typeof createBlog>
export type UpdateBlogInput = zod.infer<typeof updateBlog>
export type GetBlogInput = zod.infer<typeof getBlog>