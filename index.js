const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

const CHANNEL_ID = process.env.CHANNEL_ID;

async function updateMemberCount() {
  client.guilds.cache.forEach(async guild => {
    const channel = guild.channels.cache.get(CHANNEL_ID);
    if (channel) {
      await channel.setName(`Members: ${guild.memberCount}`);
    }
  });
}

client.once('ready', () => {
  updateMemberCount();
  setInterval(updateMemberCount, 300000);
});

client.on('guildMemberAdd', updateMemberCount);
client.on('guildMemberRemove', updateMemberCount);

client.login(process.env.TOKEN);
