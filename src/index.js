const { getGatewayBot } = require("./discord/command/GetGatewayBot");
const { WebsocketClient } = require("./discord/websocket/websocket");
require('dotenv').config();

const {logger} = require('./util/Logger');

/*
const httpsConfig = {
    baseUrl: "discordapp.com",
    apiUrl: "/api",
    token: "ODQ0NDAzNjcwODAzODA4Mjg3.YKR6Mw.yzAuO8UvbJ4o-w06Q9IcGbDiC2w",
};

(async () => {
    const response = await getGatewayBot(httpsConfig);
    const wsClient = new WebsocketClient(response.url);
})();
*/
