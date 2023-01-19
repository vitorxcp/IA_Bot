module.exports = async (bot, interaction) => {
    if (!bot.commandsExecutes) bot.commandsExecutes = 0
    if (interaction.isCommand()) { //caso não seja um slashcommand, ele apenas ira ignorar
        const slashCommand = bot.slashCommandsPublic.get(interaction.commandName) //ok, se for ele ira pesquisa o comando
        if (!slashCommand) return //caso o comando não exista
        try {
            bot.commandsExecutes = (bot.commandsExecutes + 1)
            await slashCommand.execute(bot, interaction) //ok, se der tudo certo ele ira executar o comando
        } catch (err) { //caso de erro no comando, ele ira executar o code abaixo.
            if (err) console.error(err);
            await interaction.reply({ content: 'Ops, ocorreu um erro ao executar o comando: **' + err.name + '** ( \`' + err + '\` )', ephemeral: true })
        }
    }
}