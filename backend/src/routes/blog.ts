import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { createBlog, updateBlog, getBlog } from '@prince-kakadiya/medium-common'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        DIRECT_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        prisma: any,
        userId: string
    }
}>({ strict: false })

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header('authorization') || '';
    const token = header.split(' ')[1];
    if (!token) {
        c.status(401);
        return c.json({ error: 'unauthorized' });
    }
    try {
        const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
        c.set('userId', payload.id as string);
        await next();
    } catch (err) {
        c.status(401);
        return c.json({ error: 'unauthorized' });
    }
});

blogRouter.post('/', async (c) => {
    const prisma = c.get('prisma')
    const userId = c.get('userId')
    const body = await c.req.json();
    const { success } = createBlog.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ message: "Invalid input" })
    }
    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        if (!blog) {
            c.status(404)
            return c.json({
                message: "Error creating the blog"
            })
        }
        return c.json({
            id: blog.id,
            title: blog.title,
            content: blog.content
        })
    } catch (error) {
        console.log(error)
        c.status(500)
        return c.json({
            message: "Internal server error"
        })
    }
})
blogRouter.put('/', async (c) => {
    try {
        const prisma = c.get('prisma')
        const userId = c.get('userId')
        const body = await c.req.json();
        const { success } = updateBlog.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ message: "Invalid input" })
        }
        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json(post)
    } catch (error: any) {
        console.log(error)
        if (error.code === 'P2025') {
            c.status(404)
            return c.json({
                message: "Post not found or you don't have permission to update it"
            })
        }
        c.status(500)
        return c.json({
            message: "Internal server error"
        })
    }
})

blogRouter.get('/', async (c) => {
    try {
        const prisma = c.get('prisma')
        const userId = c.get('userId')
        const blogs = await prisma.post.findMany({
            where: {
                authorId: userId
            },
            select: {
                id: true,
                title: true,
                content: true,
            }
        });
        if (!blogs) {
            c.status(404)
            return c.json({
                message: "Error creating the blog"
            })
        }
        c.status(200)
        return c.json({
            message: "Post fetched successfully",
            userId,
            blogs
        })
    } catch (error) {
        console.log(error)
        c.status(500)
        return c.json({
            message: "Internal server error"
        })
    }
})

blogRouter.get('/bulk', async (c) => {
    try {
        const prisma = c.get('prisma')
        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({ blogs });
    } catch (e) {
        c.status(500);
        console.log(e)
        return c.json({ message: "Error fetching blogs" });
    }
});

blogRouter.get('/:id', async (c) => {
    try {
        const prisma = c.get('prisma')
        const id = c.req.param('id')
        const blog = await prisma.post.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        if (!blog) {
            c.status(404)
            return c.json({
                message: "Blog not found"
            })
        }
        c.status(200)
        return c.json({
            message: "Post fetched successfully",
            blog
        })
    } catch (error) {
        console.log(error)
        c.status(500)
        return c.json({
            message: "Internal server error"
        })
    }
})

