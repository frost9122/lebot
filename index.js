const Discord =require('discord.js');

const bot = new Discord.Client();
const low = require(`lowdb`)
const FileSync = require('lowdb/adapters/FileSync')
var token = process.env.TOKEN
const adapter = new FileSync('database.json');
const storeadapter = new FileSync('store.json');
const db = low(adapter);
const storedb = low(storeadapter);

var bot = new Discord.Client();
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

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
    }





    if (message.content === prefix + "image") {
        number = 6;
        imageNumber = Math.floor (Math.random() * (number - 1 + 1)) + 1;
        message.channel.send ( {files: ["./images/" + imageNumber + ".png" ]} )
    }
    

    if (message.content === "bonjour") { 
        message.channel.send ("yo mamene");
        console.log('le bot dit bonjour')
    }
    if (message.content === "salut") {
        message.channel.send ("Wesh la famille");
        console.log(`wlh lui c'est le sang`)
    }
    if (message.content === "*ping"){
        message.channel.send("PONG TA MÈRE");
        console.log("c'est un ouf lui")
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
            .addField("Commandes du bot ! Tout fonctionne avec le préfixe *", " -help: Affiche les commandes du bot\n-ban + @utilisateur: pour ban un membre\n-ping: le bot vous répond\n-xpstat: Affiche l'xp que vous avez accumulé (En fonction du nombre de messages écris.)\n-image: Vous donne une image aléatoire\n-salut (sans le *): le bot vous réponds\n-bonjour (toujours sans le *) le bot réponds encore")
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
