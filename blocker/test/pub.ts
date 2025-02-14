import mqtt from "mqtt";

async function mqtt_connect() {
  try {
    const protocol = "mqtt";
    const host = "localhost";
    const port = "1883";
    const connectUrl = `${protocol}://${host}:${port}`;

    const client = mqtt.connect(connectUrl);

    const topic = "test";

    client.on("connect", function () {
      console.log("Connected to MQTT broker, publishing messages...");
      setInterval(() => {
        const payload = "aaa";
        console.log("Publishing:", payload);
        client.publish(topic, payload);
      }, 1000);
    });

    client.on("error", (error) => {
      console.error("MQTT Client Error:", error);
    });
  } catch (error) {
    console.error("MQTT Connection Error:", error);
  }
}

mqtt_connect();
