const Discord =require('discord.js');

const bot = new Discord.Client();
const low = require(`lowdb`)
const FileSync = require('lowdb/adapters/FileSync')
var token = process.env.TOKEN
const adapter = new FileSync('database.json');
const storeadapter = new FileSync('store.json');
const db = low(adapter);
const storedb = low(storeadapter);
const os = require('os');

var prefix = ("*");
var randnum = 0
var botenabled = true;
var storynumber = db.get('histoires').map('story_value').value();
var dispatcher;
bot.on('ready', () => {
    console.log(`${bot.user.username}  starting.`);
    console.log(`Serving ${bot.guilds.size} guilds.`);

    bot.user.setActivity("Être dev par frost#1246 [*help]");

});
db.defaults({ histoires: [], xp: []}).write()

bot.login(token);

bot.on('message', message => {
    
    var msgauthor = message.author.id;
	
    if(message.author.bot)return;
    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp);
        console.log(`Nombre d'xp : ${userxp[1]}`)
    }


    if (message.content === prefix + "ping") {
    var startTime = Date.now();
  message.channel.send("Calcul en cours...").then((message) => {
    var endTime = Date.now();
     message.edit("Bot : " + Math.round(endTime - startTime) + " ms\nAPI : "+Math.round(bot.ping)+" ms");
	  console.log("test")
    })
}


    if (message.content === prefix + "image") {
        number = 6;
        imageNumber = Math.floor (Math.random() * (number - 1 + 1)) + 1;
        message.channel.send ( {files: ["./images/" + imageNumber + ".png" ]} )
    }
    if (message.content === "*debug") {
	    let upTime = Math.round(os.uptime());
 let upTime1 = Math.round(process.uptime());
    console.log(upTime);
     let upTimeSeconds2 = upTime1;
        let upTimeOutput2 = "";
        if (upTime<60) {
            upTimeOutput2 = `${upTime1}s`;
        } else if (upTime1<3600) {
            upTimeOutput2 = `${Math.floor(upTime1/60)}m ${upTime1%60}s`;
        } else if (upTime1<86400) {
            upTimeOutput2 = `${Math.floor(upTime1/3600)}h ${Math.floor(upTime1%3600/60)}m ${upTime1%3600%60}s`;
        } else if (upTime1<604800) {
            upTimeOutput2 = `${Math.floor(upTime1/86400)}d ${Math.floor(upTime1%86400/3600)}h ${Math.floor(upTime1%86400%3600/60)}m ${upTime%86400%3600%60}s`;
        }
         let upTimeSeconds = upTime;
        let upTimeOutput = "";

        if (upTime<60) {
            upTimeOutput = `${upTime}s`;
        } else if (upTime<3600) {
            upTimeOutput = `${Math.floor(upTime/60)}m ${upTime%60}s`;
        } else if (upTime<86400) {
            upTimeOutput = `${Math.floor(upTime/3600)}h ${Math.floor(upTime%3600/60)}m ${upTime%3600%60}s`;
        } else if (upTime<604800) {
            upTimeOutput = `${Math.floor(upTime/86400)}d ${Math.floor(upTime%86400/3600)}h ${Math.floor(upTime%86400%3600/60)}m ${upTime%86400%3600%60}s`;
        }
let embed_fields = [{
                name: "Info système:",
                value: `${process.platform}-${process.arch} avec le module ${process.release.name} version ${process.version.slice(1)}`,
                inline: true
            },
            {
                name: "Info processeur: PID",
                value: `${process.pid}`,
                inline: true
            },
            {
                name: "Utilisation de la mémoire:",
                value: `${Math.ceil(process.memoryUsage().heapTotal / 1000000)} MB`,
                inline: true
            },
            {
                name: "Utilisation de la mémoire système:",
                value: `${Math.ceil((os.totalmem() - os.freemem()) / 1000000)} of ${Math.ceil(os.totalmem() / 1000000)} MB`,
                inline: true
            },

            {
                name: "Allumé depuis:",
                value: `:clock1230: ${upTimeOutput2}`,
                inline: true
            },{
                name: 'License:',
                value: `**Discord.js**`
            }
        ];

        message.channel.send({
            embed: {
                author: {
                    name: `Jojo le bot`,
                    icon_url: `https://cdn.discordapp.com/attachments/378626295808131072/500098599166672897/1150945-free-download-ban-nanatsu-no-taizai-wallpaper-2560x1440-images.jpg`,
                    url:'http://google.fr'
                },
                color: 0x00FF00,
                fields: embed_fields
            }
        });
}

    if (message.content === "bonjour") { 
        message.channel.send ("yo mamene");
        console.log('le bot dit bonjour')
    }
    if (message.content === "salut") {
        message.channel.send ("Wesh la famille");
        console.log(`wlh lui c'est le sang`)
    }
    if(message.content === prefix + "xpstat"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setColor('#F72BB0')
            .setTitle(`Xp de ${message.author.username}`)
            .setDescription("Voilà toute l'xp accumulée !")
            .addField("XP :", `${xpfinal[1]} xp`)
        message.channel.send({embed: xp_embed});
    
    
    }

    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#5A01F4')
            .setThumbnail("http://www.davnet.be/Files/Image/Help.jpg")
            .setImage("https://media.giphy.com/media/phJ6eMRFYI6CQ/giphy.gif")
            .addField("Commandes du bot ! Tout fonctionne avec le préfixe *", " -help: Affiche les commandes du bot\n-ban + @utilisateur: pour ban un membre\n-ping: le bot vous répond\n-xpstat: Affiche l'xp que vous avez accumulé (En fonction du nombre de messages écris.(Commande légèrement buguée (Database qui me gonfle.)))\n-image: Vous donne une image aléatoire\n-salut (sans le *): le bot vous réponds\n-bonjour (toujours sans le *) le bot réponds encore")
            .setFooter("D'autres commandes sont à venir, soit patient jeune Padawan")
        message.channel.sendEmbed(help_embed);
        console.log("Commande help demandée !")



    
    if (message.content === prefix + "ban") {

        if (!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
            message.reply("De 1, j'ai la flèmme, de 2 t'as pas les perms et de 3 t'es un fdp à vouloir ban https://media.tenor.com/images/af630f8d408127ba0a0e96a62bfb4e4c/tenor.gif")
        }else{
            var banmember = message.mentions.members.first();
            if(!banmember){
                message.reply("Y'as pas de gars avec ce nom là sur le serv t'es con ou quoi ?");
            }else{
                banmember.ban().then((member) => {
                message.channel.send(`${member.displayName} à été ban ! En même temps, il était pas trés utile.. https://i.imgur.com/O3DHIA5.gif`);
            }).catch(() => {
                message.channel.send("De 1, j'ai la flèmme, de 2 t'as pas les perms et de 3 t'es un fdp à vouloir ban https://media.tenor.com/images/af630f8d408127ba0a0e96a62bfb4e4c/tenor.gif ")
            })
        }
        }
    }}})
