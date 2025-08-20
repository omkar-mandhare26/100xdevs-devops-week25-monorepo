import { WebSocketServer } from "ws";
import { client } from "@repo/db/client";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", socket => {
    socket.send("You are connected to WS server");

    socket.on("message", async e => {
        const payload = JSON.parse(e.toString());

        switch (payload.type) {
            case "signup":
                const user = await client.user.create({
                    data: {
                        username: payload.username,
                        password: payload.password
                    }
                })
                socket.send(JSON.stringify({ message: "Signup successful", id: user.id }))
                break;
            case "signin":
                const userExits = await client.user.findFirst({
                    where: {
                        username: payload.username,
                        password: payload.password
                    }
                })
                if (!userExits) {
                    socket.send(JSON.stringify({ message: "Invalid creds" }))
                    return
                }
                socket.send(JSON.stringify({ message: "Sigin successful" }))
                break;

            default:
                socket.send('{message: "Hello There" }')
        }
    })
});
