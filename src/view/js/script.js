import {lat,lng} from './map.js';

function fetchData(){
    fetch("http://localhost:3000/pedidos")
    .then(response => response.json()) 
    .then(e=>{
        if (Array.isArray(e)) {
            displayData(e);
        } else {
            displayData([e]);
        }
        })
    .catch(e => console.log(e));
}

function displayData(data){
    const dados = document.getElementById('dados');
    dados.innerHTML = '';

    data.forEach(i => {
        const tr = document.createElement('tr');
        
        const id = document.createElement('td');
        const restaurante = document.createElement('td');
        const cliente = document.createElement('td');
        const cpf = document.createElement('td');
        const descricaoPedido=document.createElement('td');
        const latitude = document.createElement('td');
        const longitude = document.createElement('td');
        const apagar = document.createElement('td');
        const buttonApagar = document.createElement('button');
        const imgApagar = document.createElement('img');
        const atualizar=document.createElement('td')
        const buttonAtualizar = document.createElement('button');
        const link=document.createElement('a');
        const imgAtualizar = document.createElement('img');

        link.href=`./editar.html?id=${i._id}&cpf=${i.cpf}`;

        imgApagar.classList.add('img');
        imgApagar.id='img-apagar';
        imgApagar.src = './imagens/54324.png';

        imgAtualizar.classList.add('img');
        imgAtualizar._id='img-atualizar';
        imgAtualizar.src = './imagens/lapis.png';
        
        id.textContent = i._id;
        restaurante.textContent = i.restaurante;
        cliente.textContent = i.cliente;
        cpf.textContent = i.cpf;
        descricaoPedido.textContent=i.descricaoPedido
        latitude.textContent = i.localizacao.coordinates[1];
        longitude.textContent = i.localizacao.coordinates[0];
        
        buttonApagar.appendChild(imgApagar);
        buttonApagar.dataset.id = i._id;
        apagar.appendChild(buttonApagar);

        link.appendChild(imgAtualizar)
        buttonAtualizar.appendChild(link);
        atualizar.appendChild(buttonAtualizar);

        tr.appendChild(id);
        tr.appendChild(restaurante);
        tr.appendChild(cliente);
        tr.appendChild(cpf);
        tr.appendChild(descricaoPedido);
        tr.appendChild(latitude);
        tr.appendChild(longitude);
        tr.appendChild(apagar);
        tr.appendChild(atualizar);

        dados.appendChild(tr);
    })
}


const button = document.getElementById('button');
button.addEventListener('click',()=>{
    const restaurante=document.getElementById('restaurante').value;
    const cliente=document.getElementById('cliente').value;
    const cpf=document.getElementById('cpf').value;
    const descricaoPedido=document.getElementById('pedido').value;
    const coordinates=[lat,lng];

    const Pedido={
        restaurante,
        cliente,
        cpf,
        descricaoPedido,
        "localizacao":{
            "type":"Point",
            coordinates
        }
    }

    fetch("http://localhost:3000/pedidos",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Pedido)
    })
    .then(data=> {
        const msg=document.getElementById('msg');
        if(data.status===400){
            msg.style.color='#ff0000';
            msg.textContent='Já existe um usuario com esse CPF';
        }else{
        msg.style.color='#057708';
        msg.textContent='Pedido criado com sucesso';
        }
    })
    .then(()=>{fetchData()})
    .catch(error => {
        console.error('Erro na requisição:', error);
    });

});

const buttonPesquisar=document.getElementById('btn-enviar');
buttonPesquisar.addEventListener('click', () => {
    const search = document.getElementById('search').value;

    fetch(`http://localhost:3000/search?search=${search}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Erro na requisição: ${res.status}`);
            }
            return res.json();
        })
        .then(res => {displayData(res)})
        .catch(error => {
            console.error('Erro ao buscar o Pedido:', error);
        });
});

document.getElementById('dados').addEventListener('click',(event)=>{
    if(event.target.tagName === 'IMG' && event.target.id==='img-apagar') {
        const button = event.target.closest('button');
        const id = button.dataset.id;
        fetch(`http://localhost:3000/pedidos/${id}`,{
            method: 'DELETE'
        }).then(e=>fetchData());
    }
})

fetchData()