const { getGatewayBot } = require("./discord/command/GetGatewayBot");
const { WebsocketClient } = require("./discord/websocket/websocket");

const {logger} = require('./util/Logger');

logger.info("Hello");
logger.debug("HOWDY");
logger.error("YIKES");

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
