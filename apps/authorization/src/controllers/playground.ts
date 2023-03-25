import app from "~/app";
import db from "db";

app.get('/playground', async (req, reply) => {
    const t1 = performance.now();
    const r = await db.users.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@gmail.com',
        }
    })
    return r;
});
