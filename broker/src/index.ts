import aedes from "aedes";
import ws from "websocket-stream";
import httpServer from "http";

try {
  const broker = new aedes();
  const httpserver = httpServer.createServer();
  ws.createServer(
    { server: httpserver },
    broker.handle as unknown as () => void,
  );

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

  broker.on("client", function (client) {
    console.log("new client", client.id);
  });

  // Start the MQTT broker server
  httpserver.listen(3000, function () {
    console.log("server listening on port", 3000);
  });
} catch (e) {
  console.error("Error:", e);
}
