//const WebSocket = require("ws");
import WebSocket from 'ws';
import { Intents, IWebSocketData, IWebSocketHeartbeat, IWebSocketHello, IWebSocketIdentify, Opcodes } from './websocket-types';

/**
 * WebSocket gateway client for discord
 */
export class WebSocketClient {

    /**
     * The underlying websocket
     */
    private ws: WebSocket | undefined;

    /**
     * The discord configuration
     */
    private token: string = "";

    /*
     * Last sequence number received by client
     */
    private s: number | null = null;

    /**
     * Hearbeat interval
     */
    private heartbeat: NodeJS.Timer | undefined = undefined;

    /**
     * Connects the websocket
     * @param config The discord configuration
     */
    public connect(wsPath: string, token: string): void {
        this.token = token;

        this.ws = new WebSocket(wsPath);

        this.ws.on('open', () => {
            console.log("OPENED");
        });

        this.ws.on('message', (data: WebSocket.Data) => {
            this.processData(data);
        });
    }

    /**
     * Performs the identify step in gateway connection
     */
    private identify(): void {
        if (!this.ws) {
            return;
        }

        // TODO dwb-6: dynamic intents
        let intents: number = 0;
        intents |= Intents.Guilds;
        intents |= Intents.GuildMessage;

        const identityOpts: IWebSocketIdentify = {
            op: Opcodes.Identify,
            d: {
                token: this.token,
                intents: intents,
                // TODO dwb-7: dynamic properties
                properties: {
                    "$os": "linux",
                    "$browser": "DeadweightBot",
                    "$device": "DeadweightBot"
                }
            }
        };

        this.ws.send(JSON.stringify(identityOpts));
    }

    /**
     * Processes incoming webscket data
     * @param data The incoming websocket data
     */
    private processData(data: WebSocket.Data) {
        let dataObj: IWebSocketData;
        if (typeof data === 'string') {
            dataObj = JSON.parse(data as string) as IWebSocketData;
        } else {
            throw new Error(`Unsupported websocket type: ${typeof data}`);
        }

        switch (dataObj.op) {
            case Opcodes.Hello:
                const interval = (dataObj as IWebSocketHello).d.heartbeat_interval;
                this.startHeartbeat(interval);
                this.identify();
                break;
            default:
                console.log(`Unknown response: ${JSON.stringify(data)}`);
                break;
        }
    }

    /**
     * Sends the heartbeat at the given interval
     * @param interval The interval in ms to send the heartbeat
     */
    private startHeartbeat(interval: number) {
        this.sendHeartbeat();
        this.heartbeat = setInterval(this.sendHeartbeat, interval);
    }

    /**
     * Stops the heartbeat
     */
    private stopHeartbeat() {
        if (this.heartbeat) {
            clearInterval(this.heartbeat);
        }
    }

    private sendHeartbeat(): void {
        const dataObj: IWebSocketHeartbeat = {
            op: Opcodes.Heartbeat,
            d: this.s
        };
        this.ws?.send(JSON.stringify(dataObj))
    }
}

module.exports = { WebSocketClient };
