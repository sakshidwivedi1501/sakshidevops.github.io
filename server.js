(async () => {
    const express = require('express');
    const fs = require('fs');
    const path = require('path');
    const morgan = require("morgan");
    const { v4: uuidv4 } = await import('uuid');

    const app = express();
    const PORT = 3000;

    // ensure logs directory exists
    if (!fs.existsSync("logs")) fs.mkdirSync("logs");

    // middleware to parse JSON
    app.use(express.json());

    // ==========================
    // 1️⃣ REQUEST LOGGING
    // ==========================
    morgan.token("id", () => uuidv4());

    const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "logs/access.log"),
    { flags: "a" }
    );

    app.use(
    morgan(
        ":date[iso] | :remote-addr | :id | :method :url | :status | rt=:response-time ms | :user-agent",
        { stream: accessLogStream }
    )
    );

    // ==========================
    // 2️⃣ SERVE FRONTEND
    // ==========================
    app.use(express.static(path.join(__dirname, "public")));

    // ==========================
    // 3️⃣ EVENT LOGGING ENDPOINT
    // ==========================
    app.post("/log", (req, res) => {
    const event = {
        timestamp: new Date().toISOString(),
        ip: req.ip,
        ...req.body
    };

    fs.appendFileSync(
        "logs/events.log",
        JSON.stringify(event) + "\n"
    );

    res.sendStatus(204);
    });

    // health check
    app.get("/health", (req, res) => {
    res.json({ status: "UP" });
    });

    app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    })
})();
