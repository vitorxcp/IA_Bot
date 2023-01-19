const Discord = require("discord.js")
const bot = new Discord.Client({ intents: 32767 })
const fetch = require("node-fetch")

bot.on("ready", () => {
    bot.user.setActivity(`Rebooting...`)
    console.log("bot online.")
    setTimeout(() => {
        bot.user.setActivity(`Ready!`)
    }, 8000);
    setInterval(async () => {
        bot.user.setActivity(`/quest <question> | ${bot.guilds.cache.size} servers.`)
    }, 10000)
    require("./events/slashCommands")(bot)
})

bot.on("interactionCreate", async (integration) => {
    require("./events/interactionCreate")(bot, integration)
})

bot.on("messageCreate", async message => {
    require("./events/messageCreate")(bot, message)
})

bot.login("MTA2NDUyNjY4MjkzMDgxNTA0Ng.G9I1yh.Lpp40LzFUcvuRBEw5mGSyqDdwdraKy-cokRr0g")


