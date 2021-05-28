import config from 'config';
import { GatewayBotRequest } from './discord/requests/gateway-bot';
import { WebSocketClient } from './websocket/websocket-client';

export interface DiscordClientConfig {
    baseUrl: string;
    apiUrl: string;
    token: string;
};

/**
 * Discord Client
 */
export class DiscordClient {

    private config: DiscordClientConfig;
    
    private websocket: WebSocketClient;

    /**
     * Constructor
     * @param token The discord bot's token
     */
    constructor(token: string) {
        this.config = {
            baseUrl: config.get('discord.baseUrl'),
            apiUrl: config.get('discord.apiUrl'),
            token: token
        };

        this.websocket = new WebSocketClient();
    }

    /**
     * Connects to the Discord Gateway as a bot
     */
    async connect(): Promise<void> {
        const gbRequest: GatewayBotRequest = new GatewayBotRequest(this.config);
        const gbResponse = await gbRequest.send();
        this.websocket.connect(gbResponse.url, this.config.token);
    }

    /**
     * Disconnects from the Discord Gaterway
     */
    async disconnect(): Promise<void> {

    }
}