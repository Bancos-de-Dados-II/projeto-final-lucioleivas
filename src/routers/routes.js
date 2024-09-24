import {Router} from 'express'
import PedidoController from '../controllers/PedidoController.js'


const router = Router()

router.get('/pedidos', PedidoController.list)
router.post('/pedidos', PedidoController.add)
router.get('/pedidos/:cpf', PedidoController.find)
router.put('/pedidos/:id', PedidoController.update)
router.delete('/pedidos/:id', PedidoController.delete)


export default router