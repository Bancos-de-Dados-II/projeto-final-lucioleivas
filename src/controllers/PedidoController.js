import PedidoRepository from '../repositories/PedidoRepository.js';


class PedidoController {

    async list (req, res) {
        const data = await PedidoRepository.getAllPedidos()
        
        data.status===200
        ? res.status(200).json(data.pedidos)
        : res.status(data.status).json(data.message)
    }

    async find (req,res){
        const cpf = req.params.cpf;
        const data = await PedidoRepository.getPedidoByCpfClient(cpf)
        res.status(200).json(data)
    }

    async find (req,res){
        const cpf = req.params.cpf;
        const data = await PedidoRepository.getPedidoByCpfClient(cpf)
        res.status(200).json(data)
    }

    async add (req, res) {
            const newPedido = req.body;
            const data = await PedidoRepository.createPedido(newPedido);
            data.status===201
            ? res.status(201).json(data.pedido)
            : res.status(400).json(data.error)
    }

    async update (req,res) {
        const id = req.params.id;
        const pedido = req.body;
        const data = await PedidoRepository.updatePedido(pedido, id);
        data.status===200
        ? res.status(200).json(data.message)
        : res.status(data.status).json(data.message)
    }

    async delete (req,res) {
        const id = req.params.id;
        const data = await PedidoRepository.deletePedido(id);
        data.status===200
        ? res.status(200).json(data.message)
        : res.status(data.status).json(data.message)
    }

    async search(req, res) {
        const  {search}  = req.query;
        const data = await PedidoRepository.searchPedido(search);

        data.status===200
        ? res.status(200).json(data.pedidos)
        : res.status(data.status).json(data.message)
      }

}

export default new PedidoController