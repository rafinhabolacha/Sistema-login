import React, { useState } from 'react';
import {Menu} from '../../components/Menu';
import {Link, Redirect} from 'react-router-dom';

import { Container, ConteudoTitulo, Titulo, BotaoAcao, ButtonSuccess, ButtonInfo, Form, Label, Input, Hr, AlertDanger, AlertSuccess} from '../../styles/custom_adm';

import api from '../../config/configApi';

export const Cadastrar = () => {

    const [produto, setProduto] = useState({
        nome: '',
        preco_compra: '',
        preco_venda: '',
        quantidade: ''
    });

    const [precoCompraTarget, setPrecoCompraTarget] = useState();
    const [precoVendaTarget, setPrecoVendaTarget] = useState();


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setProduto({ ...produto, [e.target.name]: e.target.value});

    const addProduto = async e => {
        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.post("/cad-produto", produto, headers)
        .then((response) => {
            setStatus({
                type: 'redSuccess',
                mensagem: response.data.mensagem
            });
        }).catch((err) => {
            if(err.response){
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem
                });
            }else{
                setStatus({
                    type: 'error',
                    mensagem: "Erro: Tente mais tarde!"
                });
            }
        });
    }

    const valuePrecoCompra = async e => {
        var valorPrecoCompraInput = e.target.value;

        valorPrecoCompraInput = valorPrecoCompraInput.replace(/\D/g, "");
        valorPrecoCompraInput = valorPrecoCompraInput.replace(/(\d)(\d{2})$/, "$1,$2");
        valorPrecoCompraInput = valorPrecoCompraInput.replace(/(?=(\d{3})+(\D))\B/g, ".");
        //9.725,82 - 9725.82
        setPrecoCompraTarget(valorPrecoCompraInput);

        var precoCompraSalvar = await valorPrecoCompraInput.replace(".", "");
        precoCompraSalvar = await precoCompraSalvar.replace(",", ".");

        setProduto({ ...produto, preco_compra: precoCompraSalvar});
    }

    const valuePrecoVenda = async e => {
        var precoVendaInput = e.target.value;

        precoVendaInput = precoVendaInput.replace(/\D/g, "");
        precoVendaInput = precoVendaInput.replace(/(\d)(\d{2})$/, "$1,$2");
        precoVendaInput = precoVendaInput.replace(/(?=(\d{3})+(\D))\B/g, ".");
        //9.725,82 - 9725.82
        setPrecoVendaTarget(precoVendaInput);

        var precoVendaSalvar = await precoVendaInput.replace(".", "");
        precoVendaSalvar = await precoVendaSalvar.replace(",", ".");

        setProduto({ ...produto, preco_venda: precoVendaSalvar});
    }

    return(
        <Container>
            <Menu />
            <ConteudoTitulo>
                <Titulo>Cadastrar</Titulo>
                <BotaoAcao>
                    <Link to="/listar">
                        <ButtonInfo type="button">Listar</ButtonInfo>
                    </Link>{" "}
                </BotaoAcao>
            </ConteudoTitulo>

            {status.type === 'error' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
            {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
            {status.type === 'redSuccess' ? <Redirect to={{
                pathname: "/listar",
                state: {
                    type: "success",
                    mensagem: status.mensagem
                }
            }} /> : ""}

            <Hr />

            <Form onSubmit={addProduto}>
                <Label>Nome: </Label>
                <Input type="text" name="nome" placeholder="Nome do produto" onChange={valueInput} />
                
                <Label>Preço de Compra: </Label>
                <Input type="text" name="precoCompraTarget" placeholder="Preço de compra" value={precoCompraTarget} onChange={valuePrecoCompra} />
                
                <Label>Preço de venda: </Label>
                <Input type="text" name="precoVendaTarget" placeholder="Preço de venda" value={precoVendaTarget} onChange={valuePrecoVenda} />
                
                <Label>Quantidade: </Label>
                <Input type="number" name="quantidade" placeholder="Quantidade do produto" onChange={valueInput} />

                <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
            </Form>
        </Container>
    );
}