import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: any;
    userId: string;
  };
}>({ strict: false });
app.use('/*', cors());
app.use('*', async (c, next) => {
  try {
    const prisma = new PrismaClient({
      accelerateUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    c.set('prisma', prisma);
    await next();
  } catch (e) {
    console.log(e);
    c.status(500)
    return c.json({
      "msg": " Internal Server Error"
    })
  }

});

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);
export default app
