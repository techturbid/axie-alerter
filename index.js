const fetch = require("node-fetch");

const fn = async (callback) => {
const response = await fetch("https://axieinfinity.com/graphql-server-v2/graphql", {
    "headers": {
      "content-type": "application/json",
    },
    "body": "{\"operationName\":\"GetAxieBriefList\",\"query\":\"query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\\naxies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {\\n  total\\n  results {\\n    ...AxieBrief\\n    __typename\\n  }\\n  __typename\\n}\\n      }\\n\\n      fragment AxieBrief on Axie {\\nid\\nname\\nstage\\nclass\\nbreedCount\\nimage\\ntitle\\ngenes\\nbattleInfo {\\n  banned\\n  __typename\\n}\\nauction {\\n  currentPrice\\n  currentPriceUSD\\n  __typename\\n}\\nstats {\\n  ...AxieStats\\n  __typename\\n}\\nparts {\\n  id\\n  name\\n  class\\n  type\\n  specialGenes\\n  __typename\\n}\\n__typename\\n      }\\n    \\n      fragment AxieStats on AxieStats {\\n       hp\\n       speed\\n       skill\\n       morale\\n__typename\\n      }\",\"variables\":{\"auctionType\":\"Sale\",\"criteria\":{\"classes\":[],\"parts\":[\"mouth-piranha\",\"mouth-geisha\",\"horn-shoal-star\",\"horn-5h04l-5t4r\",\"back-sponge\",\"tail-nimo\"],\"hp\":null,\"speed\":null,\"skill\":null,\"morale\":null,\"breedCount\":null,\"pureness\":[],\"numMystic\":[],\"title\":null,\"region\":null,\"stages\":[3,4]},\"from\":0,\"size\":12,\"sort\":\"PriceAsc\",\"owner\":null}}",
    "method": "POST"
  });
const data = await response.json();

const list = data.data.axies.results.map(result => {
    return {
        link: `https://marketplace.axieinfinity.com/axie/${result.id}`,
        price: result.auction.currentPriceUSD
    }
});

if (callback)
    callback(list)

}



const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);
const prefix = '%'


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('%help',({type: "LISTENING"}))
});

client.on('message', message => {
const args = message.content.slice(prefix.length).trim().split(/ +/);
    
    switch(args[0]) {
        case 'rnd':
            rndmessage(message);
            function rndmessage(message) {
                var messages = ['this is one random message', 'this is another random message', 'this is the third random message', 'and so on'];
                var rnd = Math.floor(Math.random() * message.length);

                message.channel.send(messages[rnd]);
            }
        break;
        case 'test':
            message.channel.send('test')
            console.log('test')
        break;
        case 'axie-test':
            fn(list => {
                list.forEach(element => {
                    if (element.price < 1000) 
                        message.channel.send(`Link: ${element.link} - Price: $${element.price}`)
                });
            })
        break;    


    }

})

// client.on('message', msg => {
// const channel01 = client.channels.cache.find(channel => channel.id === '736378011624145007');
// channel01.send('test');  
// });

// client.on('message', msg => {
//   if (msg.content === 'ping') {
//     msg.reply('pong');
//   }
// });


