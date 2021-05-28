const {DiscordClient} = require('./DiscordClient');

(async () => {
    const client = new DiscordClient();
    client.connect(process.env.DISCORD_TOKEN);
})()
