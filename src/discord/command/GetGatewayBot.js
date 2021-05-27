const httpsClient = require("../util/HttpsClient");

/**
 * Gets gateway configuration
 * @param {object} config The https config object
 * @returns A promise that will resolve with gateway
 */
async function getGatewayBot(config) {
    return httpsClient.get(config, "/gateway/bot");
}

module.exports = { getGatewayBot };
