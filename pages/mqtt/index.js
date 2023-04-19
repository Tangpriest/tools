import { getMqttClientInfo } from "@/utils/mqtt";
import "bootstrap/dist/css/bootstrap.min.css";
import mqtt from "mqtt";
import { useState } from "react";
import MqttSettingsDialog from "./components/mqtt-dialog";

const MqttDebugTool = () => {
  const [client, setClient] = useState(null);
  const [username, setUsername] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [mqttSettingsOpen, setMqttSettingsOpen] = useState(false);

  const openSettings = () => {
    setMqttSettingsOpen(true)
  }

  const handleConnect = () => {
    

    const mqttConfig = 
    {
      mqttServerAddress: window.localStorage.getItem("mqttServerAddress"),
      mqttGroupId : window.localStorage.getItem("mqttGroupId"),
      mqttPublicKey : window.localStorage.getItem("mqttPublicKey"),
      mqttPrivateKey : window.localStorage.getItem("mqttPrivateKey")
    }

    const {
      url,
      config
    } = getMqttClientInfo(username,mqttConfig)

    console.log(config)

    if(!mqttConfig.mqttServerAddress || !mqttConfig.mqttGroupId || !mqttConfig.mqttPublicKey || !mqttConfig.mqttPrivateKey){
      alert("Please set MQTT settings first")
      return
    }

    console.log(mqttConfig)

    const newClient = mqtt.connect(url, config);

    setClient(newClient);

    newClient.on("connect", () => {
      console.log("Connected to MQTT server");
      alert("Connected to MQTT server")
    });

    newClient.on("message", (topic, message) => {
      setReceivedMessages((prevMessages) => [
        ...prevMessages,
        { topic: topic, message: message.toString() },
      ]);
    });

    newClient.on("error", (err) => {
      console.error("Error connecting to MQTT server:", err);
      alert("Error connecting to MQTT server:", err)
    });
  };

  const handleDisconnect = () => {
    client.end();
    setClient(null);
    console.log("Disconnected from MQTT server");
    alert("Disconnected from MQTT server")
  };

  const handleSubscribe = () => {
    client.subscribe(topic);
    console.log(`Subscribed to ${topic}`);
    alert(`Subscribed to ${topic}`)
  };

  const handlePublish = () => {
    client.publish(topic, message);
    console.log(`Published message "${message}" to topic "${topic}"`);
    alert(`Publish Suceess`)
  };

  return (
    <div className="container" style={{ marginTop: 50 }}>
      <div className="row">
        <div className="col-md-6">
          <h2>Connect to MQTT Server</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleConnect}
            >
              Connect
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDisconnect}
              style={{ marginLeft: 20 }}
            >
              Disconnect
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={openSettings}
              style={{ marginLeft: 20 }}
            >
              OpenSettings
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Subscribe to Topic</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="topic" className="form-label">
                Topic to Subscribe:
              </label>
              <input
                type="text"
                className="form-control"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <h2>Publish Message</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="pub-topic" className="form-label">
                Topic to Publish:
              </label>
              <input
                type="text"
                className="form-control"
                id="pub-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message:
              </label>
              <input
                type="text"
                className="form-control"
                id="message"
                value={message}
                onChange={(
                  e) => setMessage(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handlePublish}
            >
              Publish
            </button>
          </form>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <h2>Received Messages</h2>
          <ul className="list-group">
            {receivedMessages.map((msg, i) => (
              <li className="list-group-item" key={i}>
                <strong>{msg.topic}: </strong>
                {msg.message}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <MqttSettingsDialog
        isOpen={mqttSettingsOpen}
        onClose={() => setMqttSettingsOpen(false)}
      />
    </div>
  );
};

export default MqttDebugTool;