const { Client, GatewayIntentBits, Events, Collection } = require("discord.js");
const { token } = require('./config.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection()
client.commands.set('ping', require('./commands/ping.js'))

client.once(Events.ClientReady, c => {
    console.log("Ready! Logged in as " + c.user.tag);
})

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

	if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
})

client.login(token);