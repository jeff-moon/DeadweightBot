import { Message } from "discord.js";
import EventEmitter from "events";
import logger from "./logger/logger";

export class MessageHandler extends EventEmitter {
    public process(msg: Message): void {
        if (this.isCommand(msg)) {
            this.handleCommand(msg);
        }
    }

    private isCommand(msg: Message) {
        return msg.content.startsWith('!');
    }

    private handleCommand(msg: Message) {
        logger.info(`Prcessing message: ${msg.content}`);
        const command = msg.content.substr(1);

        switch (command.toUpperCase()) {
            case "ECHO":
                this.emit('message', msg, 'Hello world');
                break;
            case "JEFF":
                this.emit('message', msg, 'Rules');
                break;
        }
    }
}