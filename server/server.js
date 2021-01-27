const express = require("express");
const socketIO = require("socket.io");
const path = require("path");
const http = require("http");
const app = express();
const PORT = process.env.PORT || 3000;

// Node Server Config
const server = http.createServer(app);

// Public folder
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

// Socket config, Backend's comunication
module.exports.io = socketIO(server);
require("./sockets/socket");

// Express Server start
server.listen(PORT, (err) => {
    if (err) throw new Error(err);

    console.log(`Server runnning on port: ${PORT}`);
});
