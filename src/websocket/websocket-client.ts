import WebSocket from 'ws';
import { DiscordClientConfig } from '../discord-client';
import { buildHeartbeatRequest } from '../discord/commands/heartbeat';
import { IHelloResponse } from '../discord/commands/hello';
import { buildIdentifyRequest } from '../discord/commands/identify';
import logger from '../logger/logger';
import {Intents} from './intent';
import {Opcodes} from './opcode';

/**
 * Base response for websocket
 */
interface IWebSocketData {
    op: number;
}

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
    private config: DiscordClientConfig;

    /*
     * Last sequence number received by client
     */
    private s: number | null = null;

    /**
     * Hearbeat interval
     */
    private heartbeat: NodeJS.Timer | undefined = undefined;

    /**
     * Constructor
     * @param config The discord config
     */
    constructor(config: DiscordClientConfig) {
        this.config = config;
    }

    /**
     * Connects the websocket
     * @param config The discord configuration
     */
    public connect(wsPath: string): void {

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
        // TODO dwb-6: dynamic intents
        let intents: number = 0;
        intents |= Intents.Guilds;
        intents |= Intents.GuildMessage;
        const identify = buildIdentifyRequest(this.config.token, intents, "DeadweightBot");

        /*

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
        */
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
                const interval = (dataObj as IHelloResponse).d.heartbeat_interval;
                this.startHeartbeat(interval);
                this.identify();
                break;
            case Opcodes.HeartbeatAck:
                logger.info("Received heartbeat ack");
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

    private sendHeartbeat(): void {
        logger.info("Sending heartbeat");
        const heartbeat = buildHeartbeatRequest(this.s);
        this.ws?.send(JSON.stringify(heartbeat));
    }
}

module.exports = { WebSocketClient };
