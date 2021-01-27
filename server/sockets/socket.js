const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
    client.on("nextTicket", (data, callback) => {
        const nextTicket = ticketControl.nextTicket();

        console.log(nextTicket);
        callback(nextTicket);
    });

    client.emit("currentStatus", {
        current: ticketControl.getLastTicket(),
        last4Tickets: ticketControl.getLast4Tickets(),
    });

    client.on("attendTicket", (data, callback) => {
        const { desk } = data;
        if (!desk) {
            return callback({
                err: true,
                message: "Desk is required",
            });
        }

        const ticketToAttend = ticketControl.attendTicket(desk);

        callback(ticketToAttend);

        client.broadcast.emit("last4Tickets", {
            last4Tickets: ticketControl.getLast4Tickets(),
        });
    });
});
