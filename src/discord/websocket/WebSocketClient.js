const WebSocket = require("ws");
const OPCODES = require("./opcode");
const {Intents} = require('./intents');

class WebSocketClient {
    constructor() {
        // TODO - better encapsulation of this
        this.token = "";
    }

    connect(token, path) {
        this.token = token;
        const ws = new WebSocket(path);
        ws.on("open", () => {
            console.log("OPENED");
        });

        ws.on("message", (data) => {
            console.log(data);
            this.processData(JSON.parse(data));
        });

        this.websocket = ws;
        this.sendHeartbeat = true;
    }

    identify(token) {
        // TODO dwb-6: dynamic intents
        const intents = new Intents();
        intents.addIntent(intents.GUILDS);
        intents.addIntent(intents.GUILD_MESSAGES);

        const identityOpts = {
            op: OPCODES.Identify,
            d: {
                token: token,
                intents: intents.getIntents(),
                // TODO dwb-7: dynamic properties
                properties: {
                    "$os": "linux",
                    "$browser": "DeadweightBot",
                    "$device": "DeadweightBot"
                }
            }
        };

        this.websocket.send(JSON.stringify(identityOpts));
    }

    processData(data) {
        switch (data.op) {
            case OPCODES.Hello:
                this.startHeartbeat(data.d.heartbeat_interval);
                this.identify(this.token);
                break;
            default:
                console.log(`Unknown response: ${JSON.stringify(data)}`);
                break;
        }
    }

    startHeartbeat(interval) {
        const h = setInterval(() => {}, interval);

        this.heartbeat = h;
    }

    stopHeartbeat() {
        clearInterval(this.heartbeat);
    }
}

module.exports = { WebSocketClient };
