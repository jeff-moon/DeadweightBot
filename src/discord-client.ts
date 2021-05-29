import config from 'config';
import { buildGatewayBotRequest, IGatewayBotResponse } from './discord/commands/gateway-bot';
import { HttpsClient, HttpsRequestOptions } from './https-client';
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
    
    private https: HttpsClient;

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

        this.websocket = new WebSocketClient(this.config);
        this.https = new HttpsClient();
    }

    /**
     * Connects to the Discord Gateway as a bot
     */
    async connect(): Promise<void> {
        const gbRequest = buildGatewayBotRequest(this.config);
        const gbResponse = await this.https.get<IGatewayBotResponse>(this.config.token, gbRequest);
        this.websocket.connect(gbResponse.url);
    }

    /**
     * Disconnects from the Discord Gaterway
     */
    async disconnect(): Promise<void> {

    }
}