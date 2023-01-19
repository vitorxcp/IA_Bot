const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const fetch = require("node-fetch")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('aboutme')
        .setDescription("See my information.")
        .setDescriptionLocalization("pt-BR", "Veja as minhas informações."),
    async execute(bot, interaction) {

        var api = {
            version: null,
            latency: 0
        }
        var time = Date.now()
        fetch("https://api.openai.com/v1/completions").then(e => {
            var api = {
                version: "OpenAI's GPT-3.5",
                latency: Date.now() - time
            }
            interaction.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("BLUE")
                        .setTitle("My informations:")
                        .setThumbnail(bot.user.avatarURL())
                        .setFields([
                            { name: "API Version:", value: `${api.version}`, inline: true },
                            { name: "Latency API:", value: `${api.latency}ms`, inline: true },
                            { name: "Latency BOT:", value: `${bot.ws.ping}ms`, inline: true },
                            { name: "ServersCount", value: `${bot.guilds.cache.size}`, inline: true },
                            { name: "UsersCount", value: `${bot.users.cache.size}`, inline: true },
                            { name: "Commands Executes:", value: `${bot.commandsExecutes}`, inline: true }
                        ])
                ]
            })
        }).catch(e => {
            interaction.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("BLUE")
                        .setTitle("My informations:")
                        .setThumbnail(bot.user.avatarURL())
                        .setFields([
                            { name: "API Version:", value: `${api.version}`, inline: true },
                            { name: "Latency API:", value: `${api.latency}ms`, inline: true },
                            { name: "Latency BOT:", value: `${bot.ws.ping}ms`, inline: true },
                            { name: "ServersCount", value: `${bot.guilds.cache.size}`, inline: true },
                            { name: "UsersCount", value: `${bot.users.cache.size}`, inline: true },
                            { name: "Commands Executes:", value: `${bot.commandsExecutes}`, inline: true }
                        ])
                ]
            })
        })
    }
}