const {logger} = require('../../util/Logger');

class Intents {
    GUILDS = 0;
    GUILD_MEMBERS = 1;
    GUILD_BANS = 2;
    GUILD_EMOJIS = 3;
    GUILD_INTEGRATIONS = 4;
    GUILD_WEBHOOKS = 5;
    GUILD_INVITES = 6;
    GUILD_VOICE_STATES = 7;
    GUILD_PRESENCES = 8;
    GUILD_MESSAGES = 9;
    GUILD_MESSAGE_REACTIONS = 10;
    GUILD_MESSAGE_TYPING = 11;
    DIRECT_MESSAGES = 12;
    DIRECT_MESSAGE_REACTIONS = 13;
    DIRECT_MESSAGE_TYPING = 14;

    constructor() {
        this.intents = 0;
    }

    addIntent(intent) {
        if (intent > this.DIRECT_MESSAGE_TYPING || intent < this.GUILDS)
        {
            logger.error(`Intent ${intent} out of range`);
            return;
        }

        this.intents |= intent;
    }

    removeIntent(intent) {
        if (intent > this.DIRECT_MESSAGE_TYPING || intent < this.GUILDS)
        {
            logger.error(`Intent ${intent} out of range`);
            return;
        }

        this.intents &= (~(1 << intent) & 0x7FFF);
    }

    getIntents() {
        return this.intents;
    }
}

module.exports = {Intents};