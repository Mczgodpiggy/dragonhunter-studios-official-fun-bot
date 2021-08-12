const Discord = require("discord.js");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const config = require("./config.js");
const uptime = require("./247.js")
const prefix = require('discord-prefix');
require('discord-reply');
require("better-sqlite3")
const client = new Discord.Client();
const disbut = require ("discord-buttons")
disbut(client)
const fetch = require("node-fetch")
client.on('ready', () => console.log(`Logged in as ${client.user.tag}.`));
client.on('ready', () => hook.send('@everyone I am now alive!'))
client.on("ready", () => {
  client.user.setPresence({
  activity:{
    name:"d!help to start using me",
    type: "PLAYING"
  },
  status:'dnd'
  })
})
const hook = new Discord.WebhookClient('865906807867703317', process.env.Webhooktoken);
let defaultPrefix = 'd!';

client.on("message", message => {
  if (message.author.bot) return
  if (message.content.startsWith(config.prefix + "setstatus")) {
    if (message.guild.id !== config.mainserverid && message.author.id !== config.ownerid) return message.reply("this command can only be used at out HQ server and the bot owner")
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const status = args.slice(1).join(" ")
    client.user.setActivity(status)
    .then(
      message.reply("done!!")
    )
  }
})
client.on("message", async message => {
let guildPrefix = prefix.getPrefix(message.guild.id)
if (!guildPrefix) guildPrefix = defaultPrefix;
  if (message.content.startsWith(guildPrefix + "help")) {
    let option = new disbut.MessageMenuOption()
    .setLabel('help page 1 full command list')
    .setEmoji('📰')
    .setValue('help1')
    .setDescription("see the full command list")
    let option2 = new disbut.MessageMenuOption()
    .setLabel('help page 2 fun commands')
    .setEmoji('🤣')
    .setValue('help2')
    .setDescription('see the fun commands list!')
    let option3 = new disbut.MessageMenuOption()
    .setLabel('help page 3 admin commands')
    .setEmoji('⚒️')
    .setValue('help3')
    .setDescription("see the admin commands list!")
    let option4 = new disbut.MessageMenuOption()
    .setLabel('help page 4 unity commands')
    .setEmoji('🔧')
    .setValue('help4')
    let option5 = new disbut.MessageMenuOption()
    .setLabel('help page 5 support commands')
    .setEmoji('🆘')
    .setValue('help5')
    .setDescription('see the admin commands list!')
    let helpselect = new disbut.MessageMenu()
      .setID('help')
      .setPlaceholder('select a page')
      .setMaxValues(1)
      .setMinValues(1)
      .addOption(option)
      .addOption(option2)
      .addOption(option3)
      .addOption(option4)
      .addOption(option5)
    const helpembed = new Discord.MessageEmbed()
    .setTitle("help menu")
    .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true}))
    .setDescription(`the prefix for this server is:` + "`" + guildPrefix + "`\n" + `OWNER&HQ SERVER ONLY COMMANDS\n ${config.prefix}setstatus` + " `setstatus of the bot`" + "\nunity commands\n" + `${guildPrefix}avatar/${guildPrefix}av` + " `see a user's avatar`" + `\n${guildPrefix}bot-info` + " `see this bot's info`" + `\n${guildPrefix}panik ` + "`<first panik> <kalm> <2nd panik>`" + `\n${guildPrefix}reverse ` + "`<the text you want to reverse>`" + `\nserver admin commands\n${guildPrefix}setprefix` + " `<new-prefix>`" + "\nsupport commands" + "\n" + guildPrefix + "vote" + " `vote for " + client.user.tag + "`")
    .setFooter("page 1/5")
    message.channel.send(helpembed, helpselect)
  } else if (message.content.startsWith(guildPrefix + "avatar" ) || message.content.startsWith(guildPrefix + "av")) {
    const mentionuser = message.mentions.users.first() || message.author
    const avatarembed = new Discord.MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true}))
    .setImage(mentionuser.displayAvatarURL({ dynamic: true}))
    .setTitle(mentionuser.username + "'s avatar")
    message.channel.send(avatarembed)
  } else if (message.content === guildPrefix + "bot-info") {
    message.channel.send(`${client.user.tag} bot info\nprefix: ${guildPrefix}\ndeveloped by: ${config.developedby}\nOWNER: ${config.ownername} check out he's profile at https://discord.com/users/${config.ownerid}`)
  } else if (message.content.startsWith(guildPrefix + "panik")) {
    let args = message.content.slice(guildPrefix.length).trim().split(/ +/g);
    let panik1 = args.slice(1,2).join(' ');
    let kalm = args.slice(2,3).join(' ');
    let panik2 = args.slice(3,4).join(' ');
    if (!panik1) return message.reply("type what you want in panik")
    if (!kalm) return message.reply("type what you want in kalm") 
    if (!panik2) return message.reply("type what you want in panik")
    const panikembed = new Discord.MessageEmbed()
    .setTitle("panik")
    .setImage(`https://api.devs-hub.xyz/panik?panik=${encodeURIComponent(panik1)}` + `&kalm=${encodeURIComponent(kalm)}` + `&panik2=${encodeURIComponent(panik2)}`)
    message.channel.send(panikembed)
  } else if (message.content.startsWith(guildPrefix + "reverse")) {
    let args = message.content.slice(guildPrefix.length).trim().split(/ +/g);
    let reversetext = args.slice(1).join(' ');
    if (!reversetext) return message.lineReply("please enter sonme thing to reverse")
    fetch(`https://api.monkedev.com/fun/reverse?content=${encodeURIComponent(reversetext)}&key=jsjP3M1Q1Fkbuv9CgWxav1jPL`)
    .then(res => res.json())
    .then(data => {
        message.lineReply(`${data.result}`);
    }).catch(err => console.log(err))
  } else if (message.content.startsWith(guildPrefix + "rip")) {
     
      const ripembed = new Discord.MessageEmbed()
    .setTitle(`R.I.P ${message.author.tag}`)
    .setImage(`https://dinosaur.ml/overlay/rip/?image=${message.author.displayAvatarURL()}?size=2048`)
    message.channel.send(ripembed)
    
  } else if (message.content.startsWith(guildPrefix + "setprefix")) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply('you don\'t have admin perm to use this command');
    let guildPrefix = prefix.getPrefix(message.guild.id);
    if (!guildPrefix) guildPrefix = defaultPrefix;
    const args = message.content.slice(guildPrefix.length).split(' ');
    let newprefix = args.slice(1,2).join(" ")
    if (!newprefix) return message.lineReply("please give a prefix")
    prefix.setPrefix(newprefix, message.guild.id)
    await message.lineReply("done now prefix for this guild is " + "`" + newprefix + "`")
  } else if (message.content.startsWith(guildPrefix + "check-prefix") || message.content.startsWith(guildPrefix + "checkprefix") || message.content.startsWith("<@!" + client.user.id + ">" || message.content.startsWith("<@" + client.user.id + ">"))) {
    message.lineReply(`the prefix for this guild is ${guildPrefix}`)
  } else if (message.content.startsWith(guildPrefix + "testing")) {
  let option = new disbut.MessageMenuOption()
  .setLabel('🍔')
  .setEmoji('🍔')
  .setValue('menuid')
  .setDescription('🍔!')
  let option2 = new disbut.MessageMenuOption()
  .setLabel('check')
  .setEmoji('850724870282674189')
  .setValue('nothing')
  .setDescription('check!')
    
  let select = new disbut.MessageMenu()
      .setID('customid')
      .setPlaceholder('Click me! :D')
      .setMaxValues(1)
      .setMinValues(1)
      .addOption(option)
      .addOption(option2)

  message.channel.send('Text with menu!', select);

  } else if (message.content.startsWith(guildPrefix + "vote")) {
    const voteembed = new Discord.MessageEmbed()
    .setTitle("vote for " + client.user.tag)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .addField("vote for me here", `vote for ${client.user.tag} on top.gg\n[click here](https://top.gg/bot/${client.user.id}/vote)`)
    message.lineReply(voteembed)
  }
})

client.on('clickMenu', async (menu) => {
  let guildPrefix = prefix.getPrefix(menu.guild.id)
if (!guildPrefix) guildPrefix = defaultPrefix;
  if (menu.id === "customid") {
  if (menu.values[0] === "nothing") {
    await menu.reply.send("✅checked✅", true)
  } else if (menu.values[0] === "menuid") {
    await menu.reply.send("🍔🍔🍔🍔🍔🍔🍔")
  }
  } else if (menu.id === "help") {
    if (menu.values[0] === "help1") {
      const helpembed = new Discord.MessageEmbed()
    .setTitle("help menu")
    .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true}))
    .setDescription(`the prefix for this server is:` + "`" + guildPrefix + "`\n" + `OWNER&HQ SERVER ONLY COMMANDS\n ${config.prefix}setstatus` + " `setstatus of the bot`" + "\nunity commands\n" + `${guildPrefix}avatar/${guildPrefix}av` + " `see a user's avatar`" + `\n${guildPrefix}bot-info` + " `see this bot's info`" + `\n${guildPrefix}panik ` + "`<first panik> <kalm> <2nd panik>`" + `\n${guildPrefix}reverse ` + "`<the text you want to reverse>`" + `\nserver admin commands\n${guildPrefix}setprefix` + " `<new-prefix>`" + "\nsupport commands" + "\n" + guildPrefix + "vote" + " `vote for " + client.user.tag + "`")
    .setFooter("page 1/5")
    await menu.reply.send("you selected page 1", true)
    await menu.message.edit(helpembed)
    } else if (menu.values[0] === "help2") {
      const helpembed = new Discord.MessageEmbed()
    .setTitle("help menu-fun commands")
    .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true}))
    .setDescription(`the prefix for this server is:` + "`" + guildPrefix + "`" + `\n${guildPrefix}panik ` + "`<first panik> <kalm> <2nd panik>`" + `\n${guildPrefix}reverse ` + "`<the text you want to reverse>`")
    .setFooter("page 2/5")
    await menu.reply.send("you selected page 2", true)
    await menu.message.edit(helpembed)
  } else if (menu.values[0] === "help3") {
    const helpembed = new Discord.MessageEmbed()
    .setTitle("help menu-admin commands")
    .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true}))
    .setDescription(`the prefix for this server is:` + "`" + guildPrefix + "`" + `\nserver admin commands\n${guildPrefix}setprefix` + " `<new-prefix>`")
    .setFooter("page 3/5")
    await menu.reply.send("you selected page 3", true)
    await menu.message.edit(helpembed)
  } else if (menu.values[0] === "help4") {
    const helpembed = new Discord.MessageEmbed()
    .setTitle("help menu-unity commands")
    .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true}))
    .setDescription(`the prefix for this server is:` + "`" + guildPrefix + "`" + "\nunity commands\n" + `${guildPrefix}avatar/${guildPrefix}av` + " `see a user's avatar`" + `\n${guildPrefix}bot-info` + " `see this bot's info`")
    .setFooter("page 4/5")
    await menu.reply.send("you selected page 4", true)
    await menu.message.edit(helpembed)
  } else if (menu.values[0] === "help5") {
    const helpembed = new Discord.MessageEmbed()
    .setTitle("help menu-support commands")
    .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true}))
    .setDescription(`the prefix for this server is:` + "`" + guildPrefix + "`\n" + "support commands" + "\n" + guildPrefix + "vote" + " `vote for " + client.user.tag + "`")
    .setFooter("page 5/5")
    await menu.reply.send("you selected page 5", true)
    await menu.message.edit(helpembed)
  }
  }
});
client.login(config.token);