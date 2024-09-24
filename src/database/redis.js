import redis from 'redis';

const client= redis.createClient({
    host:'localhost',
    port:6379
});

async function conectar(){
    await client.connect();
    client.on('error',err =>{
        console.log('Erro: '+err);
    });
    console.log('Conectado com o Redis');
}

conectar();

export default client;