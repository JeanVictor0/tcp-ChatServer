// TCP, um protocolo de controle de transmissao. Um dos protocolos de rede de computadores. Para teste usaremos telnet. Tem no linux, windows e mac os. Pesquise como instalar. E no node usaremos modelo net

const net = require('net')

// Aqui comecaremos, criando uma servidor
const ChatServer = net.createServer()

// Lista de client, que sera quem conectou
const clienteList = []

// broadcast sera transmissao das menssagens. Sera enviado para os usuarios
const broadcast = (message,client) => {
    clienteList
    .filter(item => item !== client )
    .forEach(item => item.write(message))
}

// Aqui sera para definir regras de quando comeca, acaba e dar erro na conversa
ChatServer.on('connection', (client) => {
    // Quando alguem entrar
    client.write('Hi guest' + '!/n')
    clienteList.push(client)

    // Quando acabar conversa, sera retirado da lista e nao sera mais enviado menssagem para ele
    client.on('end', (client) => {
        console.log('Client end', clienteList.indexOf(client))
        clienteList.splice(clienteList.indexOf(client),1)
    })
    
    // Sera para quando algum usuario mandar mensagem. Todos irao receber
    client.on('data',(data) => broadcast(data,client))

    // Quando dar erro, aparecera o erro no terminal
    client.on('error',(err) => console.log(err))
})

// Para teste, utilize telnet localhost:9000 que sera usado listen para estar ouvindo
ChatServer.listen(9000)