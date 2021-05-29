import { DiscordClientConfig } from "../../discord-client";
import { HttpsRequestOptions } from "../../https-client";

/**
 * Response of Bot Gateway command
 */
export interface IGatewayBotResponse {
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
export function buildGatewayBotRequest(config: DiscordClientConfig): HttpsRequestOptions<void> {
    const options: HttpsRequestOptions<void> = {
        hostname: config.baseUrl,
        endpoint: `${config.apiUrl}/gateway/bot`,
    };

    return options;
}