import mongoose from "../database/mongoDb.js";
import { Schema } from "mongoose";
import {v4 as uuid} from "uuid"

const pedidoSchema=new Schema({
    _id:{
        type:String,
        default:()=>uuid()
    },
    restaurante:{
        type:String,
        required:true
    },
    cliente:{
        type:String,
        required:true
    },
    cpf:{
        type:String,
        unique:true,
        required:true
    },
    descricaoPedido: {
        type:String
    },
    localizacao: {
        type:{
            type:String,
            enum:['Point'],
            required: true
        },
        coordinates: {
        type: [Number],
        required: true,
        }
    }
})

pedidoSchema.index({restaurante:'text',cliente:'text'},{default_language:'pt',weights:{restaurante:2,cliente:1}})

const Pedido=mongoose.model('Pedido',pedidoSchema);

export default Pedido;