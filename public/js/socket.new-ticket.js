// Command to establish the connection
const socket = io();

const label = $("#lblNewTicket");

socket.on("connect", function () {
    console.warn("Connected to Server!");
});

socket.on("disconnect", function () {
    console.error("Disconected from Server!");
});

socket.on("currentStatus", function(resp){
    console.log(resp.current)
    label.text(resp.current)
})

$("button").on("click", function () {
    socket.emit("nextTicket", null, function (nextTicket) {
        label.text(nextTicket);
    });
});
