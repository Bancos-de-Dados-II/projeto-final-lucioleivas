import {lat,lng} from './map.js'

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const cpf = urlParams.get('cpf');

    if (id) {
        fetch(`http://localhost:3000/pedidos/${cpf}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status}`);
                }
                return response.json();
            })
            .then(pedido => {
                if (pedido) {
                    document.getElementById('restaurante').value = pedido.restaurante;
                    document.getElementById('cliente').value = pedido.cliente;
                    document.getElementById('pedido').value = pedido.descricaoPedido;
                } else {
                    console.error('Pedido não encontrado');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o pedido:', error);
            });
    }

    // Evento para o botão de editar
    const btnEditar = document.getElementById('button-editar');
    btnEditar.addEventListener('click', () => {
        const restaurante = document.getElementById('restaurante').value;
        const cliente = document.getElementById('cliente').value;
        const descricaoPedido = document.getElementById('pedido').value;
        const coordinates = [lat, lng];

        const Pedido = {
            restaurante,
            cliente,
            descricaoPedido,
            "localizacao": {
                "type": "Point",
                coordinates
            }
        };

        fetch(`http://localhost:3000/pedidos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Pedido)
        })
        .then(data => {
            const msg = document.getElementById('msg');
            if (data.status === 200) {
                msg.style.color = '#057708';
                msg.textContent = 'Pedido editado com sucesso';
            } else {
                msg.style.color = '#ff0000';
                msg.textContent = 'Erro ao editar Pedido';
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
    });
});