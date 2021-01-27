const socket = io();

const lblTicket1 = $("#lblTicket1");
const lblTicket2 = $("#lblTicket2");
const lblTicket3 = $("#lblTicket3");
const lblTicket4 = $("#lblTicket4");

const lblDesk1 = $("#lblDesk1");
const lblDesk2 = $("#lblDesk2");
const lblDesk3 = $("#lblDesk3");
const lblDesk4 = $("#lblDesk4");

const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];

socket.on("currentStatus", function (data) {
    updateHTML(data.last4Tickets);
});

socket.on("last4Tickets", function (data) {
    const audio = new Audio("audio/new-ticket.mp3");
    audio.play();

    updateHTML(data.last4Tickets);
});

function updateHTML(last4Tickets) {
    for (let i = 0; i < last4Tickets.length; i++) {
        lblTickets[i].text("Ticket " + last4Tickets[i].number);
        lblDesks[i].text("Desk " + last4Tickets[i].desk);
    }
}
