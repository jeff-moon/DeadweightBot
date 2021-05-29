import { Opcodes } from "../../websocket/opcode";
import os from 'os';

/**
 * The Identify request
 */
export interface IIdentifyRequest {
    op: number;
    d: {
        token: string;
        intents: number;
        properties: {
            $os: string;
            $browser: string;
            $device: string;
        };
    };
};

/**
 * 
 * @param token The discord bot token
 * @param intents The list of intents
 * @param botname The name of the bot
 * @returns The Identify request
 */
export function buildIdentifyRequest(token: string, intents: number, botname: string): IIdentifyRequest {
    return {
        op: Opcodes.Identify,
        d: {
            token: token,
            intents: intents,
            properties: {
                $os: os.platform(),
                $browser: botname,
                $device: botname
            }
        }
    }
}