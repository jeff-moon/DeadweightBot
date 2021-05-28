require('dotenv').config();
const config = require('config');
const {WebSocketClient} = require('./discord/websocket/WebSocketClient');
const {logger} = require('./util/Logger');
const Discord = require('./discord/command/DiscordCommands');

class DiscordClient {
    constructor() {
        this.ws = new WebSocketClient();
    }

    async connect(token) {
        logger.info("Beginning Websocket connection sequence");
        logger.info("Requesting Bot Gateway");

        const botGatewayOptions = {
            baseUrl: config.get('discord.baseUrl'),
            apiUrl: config.get('discord.apiUrl'),
            token: token
        };

        logger.debug(`botGatewayOptions: ${JSON.stringify(botGatewayOptions)}`);
        const botGateway = await Discord.getGatewayBot(botGatewayOptions);

        this.ws.connect(token, botGateway.url);
        console.log(botGateway);
    }

    async sendChannelMessage(channelId, message) {
        logger.info(`Sending message to channel ${channel}`);
    }
}

module.exports = {DiscordClient};