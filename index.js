const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;

(async () => {
    // Require do banco e do arquivo que monta/verifica a tabela
    const database = require('./db');
    const Leito = require('./leito');

    // Require de API do telegram e declaração de constantes necessárias pra tratá-la (token do bot e id's dos chats)
    const TelegramBot = require('node-telegram-bot-api');
    const token = '5239101477:AAGfrXzFkOHhiJ8mwXjkd-e_DaaDnCddSKs';
    const idGrupo= -652233248
    const idUsuario = 5065086202

    const bot = new TelegramBot(token, { polling: true}) // polling true verifica se há novas mensagens
    await database.sync(); // sync vai verificar se esse modelo 
                            // está igual as tabelas do banco, caso não 
                            // elas são criadas, caso sim, a execução não ocorrerá novamente.

    
    // Contagem do leitos a partir do ID
    const quantidade = await Leito.count({
        where: {
            id: {
                [Op.gte]: 1
            }
        }
    })

    // Contagem de total de leitos com estado 'livre' 
    const total = await Leito.count({
        where:  {
            ocupacao: {
                [Op.eq]: 'ocupado'
            }
        }
    })

    // Passagem da informação de leitos livres para %
    um = quantidade/100
    porcetagem = total/um
    console.log(`${porcetagem}% do total de leitos estão ocupados`)

    // Função de envio de mensagem ao grupo, será repetida com uso do setInterval()
    function atualizacaoInfo() {

        bot.sendMessage(idGrupo, `${porcetagem}% do total de leitos estão ocupados.`);

        // bot.on('text', (msg)=> {
            
        //     if (msg.text === '1') {
        //         bot.sendMessage( idGrupo, `${porcetagem}% do total de leitos está livre.`);
        //     } 
        //     else if (msg.text === '2') {
        //         bot.sendMessage( idUsuario, `${porcetagem}% do total de leitos está livre.`);
        //     }
        //     else if (msg.text != '1' && msg.text != '2') {
        //         bot.sendMessage(idUsuario, 'Comando não reconhecido. Digite "1" para enviar as informações ao grupo ou "2" Para recebê-las');
        //     }
        // })
        console.log('enviado')
    }
    
    setInterval(atualizacaoInfo, 7000) 

    // Método on permite acessar alguns eventos. O evento 'text' diz que algo será executado após recebimento de uma mensagem, 
    // o segundo parâmetro é uma função callback que será executada após recebimento da mensagem.
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



