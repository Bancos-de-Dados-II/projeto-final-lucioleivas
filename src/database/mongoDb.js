import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const mongoUri=process.env.mongoUrl;

async function conectar() {
    await mongoose.connect(mongoUri)
    .then(() => console.log('Conectado ao MongoDB com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
}

conectar();

export default mongoose;