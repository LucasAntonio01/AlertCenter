const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;

(async () => {
    
    const database = require('./db');
    const Leito = require('./leito');

    const TelegramBot = require('node-telegram-bot-api');
    const token = '5035930269:AAHWXCXAvyT_DaR6FMO-s3oilLF1FD77m2k';
    //const idGrupo = -652233248
    const idGrupo = -741510522 
    const idUsuario = 5065086202
    const idUsuario2 = 2038575307

    const bot = new TelegramBot(token, { polling: true}) 
    await database.sync(); 

    // Contagem do leitos a partir do ID
    const quantidade = await Leito.count({
        where: {
            id: {
                [Op.gte]: 1
            }
        }
    })

    // Contagem de total de leitos com estado 'ocupado' 
    const total = await Leito.count({
        where:  {
            ocupacao: {
                [Op.eq]: 'ocupado'
            }
        }
    })

    // Passagem da informação de leitos ocupados para %
    umPorcento = quantidade/100
    porcetagem = total/umPorcento
    console.log(`${porcetagem}% do total de leitos estão ocupados`)

    // Função de envio de mensagem ao grupo, será repetida com uso do setInterval()
    function atualizacaoInfo() {

        bot.sendMessage(idGrupo, `${porcetagem}% do total de leitos estão ocupados.`);
        console.count('enviado. Contagem')
    }
    
    setInterval(atualizacaoInfo, 10000) 

    // O evento 'text' diz que algo será executado após recebimento de uma mensagem, 
    // o segundo parâmetro é uma função callback que será executada após recebimento da mesma.
    bot.on('text', (msg)=> {
        console.log(msg)
        if (msg.text === '1') {
            bot.sendMessage( idGrupo, `${porcetagem}% do total de leitos estão ocupados.`);
        } 
        else if (msg.text === '2') {
            bot.sendMessage( idUsuario, `${porcetagem}% do total de leitos estão ocupados.`);
        }
        else if (msg.text != '1' && msg.text != '2') {
            bot.sendMessage(idUsuario, 'Comando não reconhecido. Digite "1" para enviar as informações ao grupo ou "2" Para recebê-las.');
        }
    })
    
})();



