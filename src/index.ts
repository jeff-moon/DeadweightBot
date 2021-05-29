import dotenv from 'dotenv';
import { DiscordClient } from './discord-client';
import logger from './logger/logger';

function getToken(): string {
    if (process.env.DISCORD_TOKEN) {
        return process.env.DISCORD_TOKEN;
    }

    throw new Error("MISSING TOKEN");
}

dotenv.config();
const token: string = getToken();
const client: DiscordClient = new DiscordClient(token);

(async () => {
    await client.connect();
})();