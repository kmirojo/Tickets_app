// Command to stablish connection
const socket = io();

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desk")) {
    window.location = "index.html";
    throw new Error("Desk is required");
}

const desk = searchParams.get("desk");
const $small = $("small");

console.log(desk);
$("h1").text("Desk " + desk);

$("button").on("click", function () {
    socket.emit(
        "attendTicket",
        {
            desk,
        },
        function (resp) {
            if (resp === "No more Tickets!") {
                $small.text(resp);
                alert(resp);
                return;
            }

            $small.text("Ticket" + resp.number);
        }
    );
});
