import { Hono } from 'hono'
import { sign } from 'hono/jwt';
import { signup, signin } from '@prince-kakadiya/medium-common';

export const userRouter = new Hono<{
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

userRouter.post('/signup', async (c) => {
    try {
        const prisma = c.get('prisma')
        const body = await c.req.json();
        const { success } = signup.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ message: "Invalid input" })
        }
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({
            token
        })
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({ message: "Error while signing up" })
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = c.get('prisma');
    try {
        const body = await c.req.json();
        const { success } = signin.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ message: "Invalid input" })
        }
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        })
        if (!user) {
            c.status(403)
            return c.json({
                message: "Unauthorized"
            })
        }
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
            token
        })
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({ message: "Error while signing in" })
    }
})