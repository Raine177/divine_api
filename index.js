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
            icon: it.iconURL(),
            in: it.members.cache.has(userid)
        };

        return test;
    });
    res.send(muturalGuilds);
});

app.get('/guild/:userid/roles', (req, res) => {
    const userid = req.params.userid;

    const roles = client.guilds.cache.map(it => {
        const role = {
            id: it.roles.cache.get('1145820337376854148').members.map(m => m.user.id)
        }        
        if (role.id == userid)
        {
            return {
                result: true
            }
        } else {
            return {
                result: false
            }
        }
    });

  
    res.send(roles)
});


app.listen(port, () => {
    console.log("We are live on " + port)
})

client.login(process.env.BOT_TOKEN);
