import aedes from "aedes";
import net from "net";

const broker = new aedes();
const server = net.createServer(broker.handle);
const port = 1883;

// Client error event
broker.on("clientError", function (client, err) {
  console.log(
    "client error",
    client ? client.id : "unknown",
    err.message,
    err.stack,
  );
});

// Connection error event
broker.on("connectionError", function (client, err) {
  console.log(
    "connection error",
    client ? client.id : "unknown",
    err.message,
    err.stack,
  );
});

// Publish event - triggered when a message is published
broker.on("publish", function (packet, client) {
  if (client) {
    console.log("message from client", client.id, packet.payload.toString());
  }
});

// Subscribe event - triggered when a new client subscribes
broker.on("subscribe", function (subscriptions, client) {
  if (client) {
    console.log("subscribe from client", subscriptions, client.id);
  }
});

// Client event - triggered when a new client connects
broker.on("client", function (client) {
  console.log("new client", client.id);
});

// Start the MQTT broker server
server.listen(port, function () {
  console.log("server listening on port", port);
});
