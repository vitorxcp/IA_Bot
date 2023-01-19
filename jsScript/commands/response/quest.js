const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('quest')
        .setDescription("Ask me any questions.")
        .setDescriptionLocalization("pt-BR", "Faça-me alguma pergunta.")
        .addStringOption(opString =>
            opString.setName("question")
                .setDescription("Ask me any questions.")
                .setDescriptionLocalization("pt-BR", "Faça-me algumas perguntas.")
                .setRequired(true)
        ),
    async execute(bot, interaction) {
        await interaction.deferReply()
        try {
            var options = interaction.options
            var _string = options.getString("question")
            fetch("https://api.openai.com/v1/completions", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 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"
                },
                body: JSON.stringify({
                    prompt: _string,
                    model: 'text-davinci-003',
                    max_tokens: 1900,
                })
            }).then(async e => {
                res = await e.json()
                if (!res.choices) return interaction.editReply("Oops I think there was an error in my API, and to prevent it from working I ended up not executing the command, I hope you try again!")
                const splitDescription = splitMessage(res.choices[0].text)
                if (splitDescription[0]) await interaction.editReply(splitDescription[0]).catch(e => { return interaction.editReply("Oops I think there was an error in my API, and to prevent it from working I ended up not executing the command, I hope you try again!") })
                if (splitDescription[1]) await interaction.followUp(splitDescription[1]).catch(e => { return; })
                if (splitDescription[2]) await interaction.followUp(splitDescription[2]).catch(e => { return; })
                if (splitDescription[3]) await interaction.followUp(splitDescription[3]).catch(e => { return; })
                function resolveString(data) {
                    if (typeof data === 'string') return data;
                    if (Array.isArray(data)) return data.join('\n');
                    return String(data);
                };
                function splitMessage(text, { maxLength = 1900, char = '\n', prepend = '', append = '' } = {}) {
                    text = resolveString(text);
                    if (text.length <= maxLength) return [text];
                    const splitText = text.split(char);
                    if (splitText.some(chunk => chunk.length > maxLength)) throw new RangeError('SPLIT_MAX_LEN');
                    const messages = [];
                    let msg = '';
                    for (const chunk of splitText) {
                        if (msg && (msg + char + chunk + append).length > maxLength) {
                            messages.push(msg + append);
                            msg = prepend;
                        }
                        msg += (msg && msg !== prepend ? char : '') + chunk;
                    }
                    return messages.concat(msg).filter(m => m);
                };
            })
        } catch (e) {
            return interaction.editReply("Oops I think there was an error in my API, and to prevent it from working I ended up not executing the command, I hope you try again!")
        }
    }
}