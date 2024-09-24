import Pedido from "../model/Pedido.js";
import client from "../database/redis.js";

class PedidoRepository {
  
  // Busca todos os pedidos
  async getAllPedidos() {
    try {
      const cachedPedidos = await client.get("pedidos");
      if (cachedPedidos) {
        return { status: 200, pedidos: JSON.parse(cachedPedidos) };
      }

      const pedidos = await Pedido.find();
      if (!pedidos) {
        return { status: 404, message: 'Erro ao listar pedidos' };
      }

      await client.set("pedidos", JSON.stringify(pedidos));

      return { status: 200, pedidos };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Erro ao listar pedidos' };
    }
  }

  async getPedidoByCpfClient(cpf) {
    try {
      const pedido = await Pedido.findOne({ cpf }).exec();
      return pedido;
    } catch (error) {
      console.error('Erro ao buscar pedido do cliente por CPF', error);
      throw error;
    }
  }

  async createPedido(newPedidoData) {
    try {
      const pedido = await Pedido.create({
        restaurante: newPedidoData.restaurante,
        cliente: newPedidoData.cliente,
        cpf: newPedidoData.cpf,
        descricaoPedido: newPedidoData.descricaoPedido,
        localizacao: newPedidoData.localizacao
      });

      const cache = await Pedido.find();
      await client.set(`pedidos`, JSON.stringify(cache));

      return { pedido, status: 201 };
    } catch (error) {
      return { status: 500, error };
    }
  }

  async updatePedido(newPedidoData, id) {
    try {
      const updatedPedido = await Pedido.findByIdAndUpdate(id, {
        cliente: newPedidoData.cliente,
        restaurante: newPedidoData.restaurante,
        localizacao: newPedidoData.localizacao
      }, { new: true });

      if (!updatedPedido) {
        return { status: 404, message: "Pedido inexistente" };
      }

      const cache=await Pedido.find()
      await client.set(`pedidos`,JSON.stringify(cache));

      return { message: "Pedido atualizado com sucesso", status: 200 };
    } catch (error) {
      return { status: 500, message: error };
    }
  }

  // Deleta um pedido pelo ID
  async deletePedido(id) {
    try {
      const deleted = await Pedido.findByIdAndDelete(id);
      if (!deleted) {
        return { status: 404, message: "Pedido inexistente" };
      }

      const cache=await Pedido.find()
      await client.set(`pedidos`,JSON.stringify(cache));


      return { status: 200, message: "Pedido deletado com sucesso" };
    } catch (error) {
      return { status: 500, message: error };
    }
  }

  async searchPedido(search) {
    try {
      const pedidos = await Pedido.find({
        $or: [
          { cliente: { $regex: search, $options: 'i' } },
          { restaurante: { $regex: search, $options: 'i' } }
        ]
      });
  
      if (pedidos.length === 0) {
        return { status: 404, message: 'Nenhum pedido encontrado.' };
      }
      
      return { status: 200, pedidos };
  
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Erro ao procurar pedidos.' };
    }
  }

}

export default new PedidoRepository;
