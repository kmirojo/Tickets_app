const socket = io();

// Listen Events
socket.on("connect", function () {
    console.log("Connected to server");
});

socket.on("disconnect", function () {
    console.warn("Connection lost");
});

// Send Info
socket.emit(
    "sendMessage",
    {
        user: "Juan",
        message: "Hello World",
    },
    function (resp) {
        console.log("Server Response:", resp);
    }
);

// Listen Info
socket.on("sendMessage", function (message) {
    console.log("Server:", message);
});
