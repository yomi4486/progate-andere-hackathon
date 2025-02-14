import mqtt from "mqtt";

function sub() {
  try {
    const protocol = "mqtt";
    const host = "localhost";
    const port = "1883";
    const connectUrl = `${protocol}://${host}:${port}`;

    const client = mqtt.connect(connectUrl);

    const topic = "test"; // トピック名を publisher と統一する

    client.on("connect", function () {
      console.log("Connected to MQTT broker");

      // 正しい `subscribe` の使い方
      client.subscribe(topic, (error, granted) => {
        if (error || !granted) {
          console.error("Subscribe error:", error);
        } else {
          console.log(
            `Subscribed to topic: ${granted.map((g) => g.topic).join(", ")}`,
          );
        }
      });
    });

    // メッセージを受信する処理を追加
    client.on("message", (topic, message) => {
      console.log(`Received message from ${topic}:`, message.toString());
    });

    client.on("error", (error) => {
      console.error("MQTT Client Error:", error);
    });
  } catch (error) {
    console.error("MQTT Subscription Error:", error);
  }
}

sub();
