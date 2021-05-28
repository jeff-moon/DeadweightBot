import { DiscordClientConfig } from "../../discord-client";
import { GetRequest } from "../../http/get-request";

/**
 * Response of Bot Gateway command
 */
export interface IGatewayBot {
    url: string;
    shards: number;
    session_start_limit: {
        total: number;
        remaining: number;
        reset_after: number;
        max_concurrency: number;
    };
}

/**
 * Bot gateway command
 */
export class GatewayBotRequest {
    
    /**
     * Underlying GET request object
     */
    private request: GetRequest<IGatewayBot>;

    /**
     * Constructor
     * @param token The Discord token
     */
    constructor(config: DiscordClientConfig) {
        this.request = new GetRequest<IGatewayBot>(
            config.baseUrl,
            config.apiUrl,
            '/gateway/bot',
            config.token
        );
    }

    /**
     * Sends the bot gateway request
     * @returns The gateway bot response
     */
    public async send(): Promise<IGatewayBot> {
        return this.request.send();
    }
}