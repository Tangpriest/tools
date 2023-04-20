import { useEffect, useState } from "react";

const MqttSettingsDialog = ({ isOpen, onClose }) => {
  const [serverAddress, setServerAddress] = useState("");
  const [groupId, setGroupId] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleSave = () => {
    window.localStorage.setItem("mqttServerAddress", serverAddress);
    window.localStorage.setItem("mqttGroupId", groupId);
    window.localStorage.setItem("mqttPublicKey", publicKey);
    window.localStorage.setItem("mqttPrivateKey", privateKey);
    onClose();
  };

  useEffect(()=>{
    setServerAddress(window.localStorage.getItem("mqttServerAddress") || "")
    setGroupId(window.localStorage.getItem("mqttGroupId") || "")
    setPublicKey(window.localStorage.getItem("mqttPublicKey") || "")
    setPrivateKey(window.localStorage.getItem("mqttPrivateKey") || "")
  },[])

  const copy = () => {
    const text = `{
      "serverAddress": "${serverAddress}",
      "groupId": "${groupId}",
      "publicKey": "${publicKey}",
      "privateKey": "${privateKey}"
    }`;
    navigator.clipboard.writeText(text);

    alert(`Copy Success!`)
  }

  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">MQTT Settings</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="serverAddress" className="form-label">
                Server Address
              </label>
              <input
                type="text"
                className="form-control"
                id="serverAddress"
                placeholder="mqtt.example.com"
                value={serverAddress}
                onChange={(e) => setServerAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="groupId" className="form-label">
                Group ID
              </label>
              <input
                type="text"
                className="form-control"
                id="groupId"
                placeholder="my-group"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="publicKey" className="form-label">
                Public Key
              </label>
              <textarea
                className="form-control"
                id="publicKey"
                rows="3"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="privateKey" className="form-label">
                Private Key
              </label>
              <textarea
                className="form-control"
                id="privateKey"
                rows="3"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-primary" onClick={copy}>
                Cpoy to clipboard
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MqttSettingsDialog;
