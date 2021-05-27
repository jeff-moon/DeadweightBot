const https = require("https");

/**
 *
 * @param {object} config Object containing discord request info
 * @param {string} config.baseUrl Discords base API url
 * @param {string} config.apiUrl Discords API url, typically just /api
 * @param {string} config.token The bot token
 * @param {string} endpoint Request endpoint
 * @returns
 */
async function get(config, endpoint) {
    // Async promise-based get request
    const promise = new Promise((resolve, reject) => {
        // Discord's authorization header
        const headers = {
            Authorization: `Bot ${config.token}`,
        };

        // Request options
        const options = {
            hostname: config.baseUrl,
            port: 443,
            path: `${config.apiUrl}${endpoint}`,
            method: "GET",
            headers: headers,
        };

        // The data string we're going to build
        let data = "";

        // Perform the request
        const request = https.request(options, (res) => {
            // Concat incoming data
            res.on("data", (d) => {
                data += d;
            });

            // Reject on error
            res.on("error", (e) => {
                reject(e);
            });

            // Resolve on complete
            res.on("end", () => {
                resolve(JSON.parse(data));
            });
        });

        // Send request
        request.end();
    });

    return promise;
}

module.exports = { get };
