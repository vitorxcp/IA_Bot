module.exports = async (bot, message) => {
    const args = message.content.slice("!").trim().split(/ +/g);
    commando = args.shift().toLowerCase()
    if (commando === "!ia" || commando === "!iaresponde" || commando === "!iaquest" || commando === "!iares") {
        text = args.join(" ")
        message.channel.sendTyping(true)
        fetch("https://api.openai.com/v1/completions", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify({
                prompt: text,
                model: 'text-davinci-003',
                max_tokens: 1900,
            })
        }).then(async e => {
            res = await e.json()

            const splitDescription = splitMessage(res.choices[0].text)

            {
                if (splitDescription[0]) await message.reply(splitDescription[0]).catch(e => { return; })
                if (splitDescription[1]) await message.channel.send(splitDescription[1]).catch(e => { return; })
                if (splitDescription[2]) await message.channel.send(splitDescription[2]).catch(e => { return; })
                if (splitDescription[3]) await message.channel.send(splitDescription[3]).catch(e => { return; })
                if (splitDescription[4]) await message.channel.send(splitDescription[4]).catch(e => { return; })
                if (splitDescription[5]) await message.channel.send(splitDescription[5]).catch(e => { return; })
                if (splitDescription[6]) await message.channel.send(splitDescription[6]).catch(e => { return; })
                if (splitDescription[7]) await message.channel.send(splitDescription[7]).catch(e => { return; })
                if (splitDescription[8]) await message.channel.send(splitDescription[8]).catch(e => { return; })
            }

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
            message.channel.sendTyping(false)
            message.channel.send("that uses the </quest:1064680719282094151> command, this command will be removed in the next update.")
        })
    }
}