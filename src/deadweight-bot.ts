import {Channel, Client, Message} from 'discord.js'
import dotenv from 'dotenv'
import { MessageHandler } from './message-handler';
import logger from './logger/logger';

// Load environment
dotenv.config();

export class DeadweightBot {
    private discord: Client;
    private messageHandler: MessageHandler;

    constructor() {
        this.discord = new Client();
        this.messageHandler = new MessageHandler();
    }

    public connect(): void {
        if (!process.env.DISCORD_TOKEN) {
            throw new Error("Missing DISCORD_TOKEN in .env");
        }

        this.registerForEvents();
        const token: string = process.env.DISCORD_TOKEN;

        this.discord.login(token);
    }

    private registerForEvents(): void {
        this.discord.on('message', (msg: Message) => {
            this.messageHandler.process(msg);
        });

        this.discord.on('ready', () => logger.info("Ready"));

        this.messageHandler.on('message', (msg: Message, content: string) => {
            msg.channel.send(content);
        });
    }
}