import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Menu } from '../../components/Menu';

import { Container, ConteudoTitulo, Titulo, BotaoAcao, ButtonPrimary, ButtonInfo, Form, Label, Input, Hr, ButtonWarning, AlertSuccess, AlertDanger } from '../../styles/custom_adm';

import api from '../../config/configApi';

export const Editar = (props) => {

    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState("");
    const [preco_compra, setPrecoCompra] = useState("");
    const [preco_venda, setPrecoVenda] = useState("");
    const [quantidade, setQuantidade] = useState("");

    const [precoCompraTarget, setPrecoCompraTarget] = useState();
    const [precoVendaTarget, setPrecoVendaTarget] = useState();

    const [status, setStatus] = useState({
        type: "",
        mensagem: ""
    });

    const editProduto = async e => {
        e.preventDefault();
        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/edit-produto", {id, nome, preco_compra, preco_venda, quantidade}, headers)
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

    useEffect(() => {

        const getProduto = async () => {

            const headers = {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/view-produto/" + id, headers)
                .then((response) => {
                    //setData(response.data.produto);
                    setNome(response.data.produto.nome);

                    setPrecoCompra(response.data.produto.preco_compra);
                    setPrecoCompraTarget(new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2, currency: 'BRL'}).format(response.data.produto.preco_compra));


                    setPrecoVenda(response.data.produto.preco_venda);
                    setPrecoVendaTarget(new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2, currency: 'BRL'}).format(response.data.produto.preco_venda));

                    setQuantidade(response.data.produto.quantidade);
                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: "redErro",
                            mensagem: err.response.data.mensagem
                        });
                    } else {
                        setStatus({
                            type: "redErro",
                            mensagem: "Erro: Tente mais tarde!"
                        });
                    }
                });
        }

        getProduto();
    }, [id]);  

    const valuePrecoCompra = async (valorPrecoCompraInput) => {
        var valorPrecoCompraConvert = valorPrecoCompraInput.toString().replace(/\D/g, "");
        valorPrecoCompraConvert = valorPrecoCompraConvert.replace(/(\d)(\d{2})$/, "$1,$2");
        valorPrecoCompraConvert = valorPrecoCompraConvert.replace(/(?=(\d{3})+(\D))\B/g, ".");
        setPrecoCompraTarget(valorPrecoCompraConvert);        

        var precoCompraSalvar = await valorPrecoCompraConvert.replace(".", "");
        precoCompraSalvar = await precoCompraSalvar.replace(",", ".");
        setPrecoCompra(precoCompraSalvar);
    }  

    const valuePrecoVenda = async (valorPrecoVendaInput) => {
        var valorPrecoVendaConvert = valorPrecoVendaInput.toString().replace(/\D/g, "");
        valorPrecoVendaConvert = valorPrecoVendaConvert.replace(/(\d)(\d{2})$/, "$1,$2");
        valorPrecoVendaConvert = valorPrecoVendaConvert.replace(/(?=(\d{3})+(\D))\B/g, ".");
        setPrecoVendaTarget(valorPrecoVendaConvert);        

        var precoVendaSalvar = await valorPrecoVendaConvert.replace(".", "");
        precoVendaSalvar = await precoVendaSalvar.replace(",", ".");
        setPrecoVenda(precoVendaSalvar);
    }

    return (
        <Container>
            <Menu />
            <ConteudoTitulo>
                <Titulo>Editar</Titulo>
                <BotaoAcao>
                    <Link to="/listar">
                        <ButtonInfo type="button">Listar</ButtonInfo>
                    </Link>{" "}
                    <Link to={"/visualizar/" + id}>
                        <ButtonPrimary type="button">Visualizar</ButtonPrimary>
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

            <Form onSubmit={editProduto}>
                <Label>Nome: </Label>
                <Input type="text" name="nome" placeholder="Nome do produto" value={nome} onChange={e => setNome(e.target.value)} />

                <Label>Preço de Compra: </Label>
                <Input type="text" name="precoCompraTarget" placeholder="Preço de compra" value={precoCompraTarget} onChange={e => valuePrecoCompra(e.target.value)} />

                <Label>Preço de Venda: </Label>
                <Input type="text" name="precoVendaTarget" placeholder="Preço de venda" value={precoVendaTarget} onChange={e => valuePrecoVenda(e.target.value)} />

                <Label>Quantidade: </Label>
                <Input type="number" name="quantidade" placeholder="Quantidade do produto" value={quantidade} onChange={e => setQuantidade(e.target.value)} />

                <ButtonWarning type="submit">Salvar</ButtonWarning>
            </Form>
        </Container>
    );
}