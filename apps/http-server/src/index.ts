import express from "express";
import { client } from "@repo/db/client";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Hey there" });
})

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    const user = await client.user.create({
        data: {
            username, password
        }
    })

    res.json({
        message: "Signup successful",
        id: user.id
    })
});

app.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    const user = await client.user.findFirst({
        where: {
            username, password
        }
    })

    if (!user) {
        res.json({ message: "Invalid Creds" });
        return;
    }

    res.json({ message: "Sigin successful" });
})

app.listen(3000, () => {
    console.log("HTTP server running on PORT 3000");
});