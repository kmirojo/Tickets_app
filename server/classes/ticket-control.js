const fs = require("fs");

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {
    constructor() {
        this.lastTicket = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4Tickets = [];

        const data = require("../data/data.json");

        if (data.today === this.today) {
            this.lastTicket = data.lastTicket;
            this.tickets = data.tickets;
            this.last4Tickets = data.last4Tickets;
        } else {
            this.restartCount();
        }
    }

    nextTicket() {
        this.lastTicket += 1;

        const ticket = new Ticket(this.lastTicket, null);
        this.tickets.push(ticket);

        this.saveFile();

        return `Ticket ${this.lastTicket}`;
    }

    getLastTicket() {
        return `Ticket ${this.lastTicket}`;
    }
    
    getLast4Tickets() {
        return this.last4Tickets;
    }

    attendTicket(desk) {
        if (this.tickets.length < 1) {
            return "No more Tickets!";
        }

        const ticketNumber = this.tickets[0].number;
        this.tickets.shift();

        const ticketToAttend = new Ticket(ticketNumber, desk);

        this.last4Tickets.unshift(ticketToAttend);

        if (this.last4Tickets.length > 4) {
            this.last4Tickets.splice(-1, 1); // Delete last item in array
        }

        console.log(" === Last 4 Tickets === === === === === === === ===");
        console.log(this.last4Tickets);

        this.saveFile();
        return ticketToAttend;
    }

    restartCount() {
        this.lastTicket = 0;
        this.tickets = [];
        this.last4Tickets = [];

        console.log("System has been initialized!");
        this.saveFile();
    }

    saveFile() {
        const jsonData = {
            lastTicket: this.lastTicket,
            today: this.today,
            tickets: this.tickets,
            last4Tickets: this.last4Tickets,
        };

        const jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync("./server/data/data.json", jsonDataString);
    }
}

module.exports = {
    TicketControl,
};
