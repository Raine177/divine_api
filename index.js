const express = require('express');
const {
    Client, GatewayIntentBits
} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] });
const app = express();
const port = 8000;
require('dotenv').config()


client.on('ready', () => {
    client.user.setPresence(` over the lovely members of Divine `, { type: "WATCHING", status: 'dnd' })
});
    

app.get('/:userid/guilds', (req, res) => {
    const userid = req.params.userid;

    if (!userid) return;

    const muturalGuilds = client.guilds.cache.map(it => {
        const test = {
            id: it.id,
            name: it.name,
            icon: it.iconURL,
            in: it.members
        };

        if(test.in.guild.id = '1095826766658023424')
        {
            return {
                result: JSON.stringify(test.in.guild.members).includes(userid)
            }
        } else {
            return console.log('not in server');
        }



    });
    res.send(muturalGuilds);
});

app.get('/guild/:guildid/stats', (req, res) => {
    const id = req.params.guildid;

    client.guilds.get(req.param.guildid).members.map(it => {
        return {
            id: it.id,
            admin: it.hasPermission("ADMINISTRATOR")
        };
    });
});


app.listen(port, () => {
    console.log("We are live on " + port)
})

client.login(process.env.BOT_TOKEN);