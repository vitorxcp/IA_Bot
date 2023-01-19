const fs = require('fs')
const Discord = require("discord.js")
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
module.exports = (bot) => {
    const slashCommands = [];
    const slashCommandsPriv = [];
    bot.slashCommandsPublic = new Discord.Collection();
    bot.slashCommandsPrivate = new Discord.Collection();
    fs.readdirSync('./jsScript/commands').forEach(dir => {
        const slashCommandFiles = fs.readdirSync(`./jsScript/commands/${dir}`).filter(file => file.endsWith('.js'));
        for (const file of slashCommandFiles) {
            const slashCommand = require(`../commands/${dir}/${file}`);
            slashCommands.push(slashCommand.data.toJSON());
            if (slashCommand.data.name) {
                bot.slashCommandsPublic.set(slashCommand.data.name, slashCommand)
                console.log(file, '- Success ' + dir)
            } else {
                console.log(file, '- Error ' + dir)
            }
        }
    });
    var token = "MTA2NDUyNjY4MjkzMDgxNTA0Ng.G9I1yh.Lpp40LzFUcvuRBEw5mGSyqDdwdraKy-cokRr0g"
    const rest = new REST({ version: '9' }).setToken(token);
    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands("1064526682930815046"),
                { body: slashCommands }
            );
        } catch (err) {
            console.log(err);
        }
    })();
};