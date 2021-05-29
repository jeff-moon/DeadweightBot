import config from 'config';
import { channel } from 'diagnostic_channel';
import EventEmitter from 'events';
import { buildGatewayBotRequest, IGatewayBotResponse } from './discord/commands/gateway-bot';
import { buildChannelsRequest, IChannelsResponse } from './discord/commands/get-channels';
import { HttpsClient } from './https-client';
import logger from './logger/logger';
import { WebSocketClient } from './websocket/websocket-client';

export interface DiscordClientConfig {
    baseUrl: string;
    apiUrl: string;
    token: string;
};

/**
 * Discord Client
 */
export class DiscordClient extends EventEmitter {

    private config: DiscordClientConfig;
    
    private websocket: WebSocketClient;
    
    private https: HttpsClient;

    /**
     * Constructor
     * @param token The discord bot's token
     */
    constructor(token: string) {
        super();
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
        await this.websocket.connect(gbResponse.url);
        logger.info('Websocket connected');
    }

    /**
     * Disconnects from the Discord Gaterway
     */
    async disconnect(): Promise<void> {

    }

    async getChannels(guildId: number): Promise<void> {
        if (!this.websocket.connected) {
            logger.error('Cannot request channels while noto connected to gateway');
            return;
        }

        const channelsRequest = buildChannelsRequest(this.config, guildId);
        const response = await this.https.get<IChannelsResponse>(this.config.token, channelsRequest);
        console.log(response);
    }
}