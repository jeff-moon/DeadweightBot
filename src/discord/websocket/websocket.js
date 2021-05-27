const WebSocket = require("ws");
const OPCODES = require("./opcode");

class WebsocketClient {
    constructor(path) {
        const ws = new WebSocket(path);
        ws.on("open", () => {
            console.log("OPENED");
        });

        ws.on("message", (data) => {
            this.processData(JSON.parse(data));
        });

        this.websocket = ws;
        this.sendHeartbeat = true;
    }

    processData(data) {
        switch (data.op) {
            case OPCODES.Hello:
                this.startHeartbeat(data.d.heartbeat_interval);
                break;
        }
    }

    startHeartbeat(interval) {
        const h = setInterval(() => {}, interval);

        this.heartbeat = h;
    }

    stopHeartbeat() {}
}

module.exports = { WebsocketClient };
