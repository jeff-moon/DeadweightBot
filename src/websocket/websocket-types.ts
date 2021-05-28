/**
 * Base websocket data
 */
export interface IWebSocketData {
    op: number;
}

export interface IWebSocketIdentify extends IWebSocketData {
    d: {
        token: string;
        intents: number;
        properties: {
            [prop: string]: string;
        }
    }
}

export interface IWebSocketHeartbeat extends IWebSocketData {
    d: number | null;
}

export interface IWebSocketHello extends IWebSocketData {
    d: {
        heartbeat_interval: number;
        _trace: string[];
    }
}

/**
 * List of opcodes
 */
export enum Opcodes {
    Dispatch = 0,
    Heartbeat = 1,
    Identify = 2,
    PresenceUpdate = 3,
    VoiceStateUpdate = 4,
    Resume = 6,
    Reconnect = 7,
    RequestGuildMembers = 8,
    InvalidSession = 9,
    Hello = 10,
    HeartbeatAck = 11
}

/**
 *  Bit masks for intents
 */
export enum Intents {
    Guilds = 1 << 0,
    GuildMembers = 1 << 1,
    GuildBans = 1 << 2,
    GuildEmojis = 1 << 3,
    GuildIntegrations = 1 << 4,
    GuildWebhoooks = 1 << 5,
    GuildInvites = 1 << 6,
    GuildVoiceStates = 1 << 7,
    GuildPresences = 1 << 8,
    GuildMessage = 1 << 9,
    GuildMessageReactions = 1 << 10,
    GuildMessageTyping = 1 << 11,
    DirectMessages = 1 << 12,
    DirectMessageReactions = 1 << 13,
    DirectMessageTyping = 1 << 14
};