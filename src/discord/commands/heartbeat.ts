import { Opcodes } from "../../websocket/opcode";

/**
 * Heartbeat request interface
 */
export interface IHeartbeatRequest {
    op: number;
    d: number | null;
}

/**
 * 
 * @param s The last received sequence
 * @returns The heartbeat request
 */
export function buildHeartbeatRequest(s: number | null): IHeartbeatRequest {
    return {
        op: Opcodes.Heartbeat,
        d: s
    };
}