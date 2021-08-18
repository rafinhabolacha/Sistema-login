const express = require('express');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { eAdmin } = require('./middlewares/auth');
require('dotenv').config();

const app = express();

const Produto = require('./models/Produto');
const User = require('./models/User');

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

app.get("/list-produto", eAdmin, async (req, res) => {
    await Produto.findAll({
        attributes: ['id', 'nome', 'preco_venda', 'quantidade'],
        order: [['id', 'DESC']]
    })
        .then((produtos) => {
            return res.json({
                erro: false,
                produtos
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum produto encontrado!"
            });
        });
});

app.get("/view-produto/:id", eAdmin, async (req, res) => {
    const { id } = req.params;
    await Produto.findByPk(id)
        .then((produto) => {
            return res.json({
                erro: false,
                produto
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum produto encontrado!"
            });
        });
});

app.post("/cad-produto", eAdmin, async (req, res) => {
    await Produto.create(req.body)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Produto cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Produto não cadastrado com sucesso!"
            });
        });
});

app.put('/edit-produto', eAdmin, async (req, res) => {
    const { id } = req.body;
    await Produto.update(req.body, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Produto editado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Produto não editado com sucesso!"
            });
        });
});

app.delete('/delete-produto/:id', eAdmin, async (req, res) => {
    const { id } = req.params;

    await Produto.destroy({ where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Produto apagado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Produto não apagado com sucesso!"
            });
        });
});

app.get("/list-user", eAdmin, async (req, res) => {
    await User.findAll({
        attributes: ['id', 'name', 'email'],
        order: [['id', 'DESC']]
    })
        .then((users) => {
            return res.json({
                erro: false,
                users
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum usuário encontrado!"
            });
        });
});



app.get("/view-user/:id", eAdmin, async (req, res) => {
    const { id } = req.params;
    await User.findByPk(id)
        .then((user) => {
            return res.json({
                erro: false,
                user
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum usuário encontrado!"
            });
        });
});

app.post("/add-user", eAdmin, async (req, res) => {
    var dados = req.body;

    dados.password = await bcrypt.hash(dados.password, 8);

    await User.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não cadastrado com sucesso!"
            });
        });
});

app.put('/edit-user', eAdmin, async (req, res) => {
    const { id } = req.body;
    const dados = req.body;

    dados.password = await bcrypt.hash(dados.password, 8);

    await User.update(dados, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário editado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não editado com sucesso!"
            });
        });
});

app.delete('/delete-user/:id', eAdmin, async (req, res) => {
    const { id } = req.params;

    await User.destroy({ where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário apagado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não apagado com sucesso!"
            });
        });
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({
        attributes: ['id', 'email', 'email', 'password'],
        where: {
            email: req.body.email
        }
    });

    if (user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!"
        });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!"
        });
    }

    var token = jwt.sign({ id: user.id }, process.env.SECRET, {
        //expiresIn: 600 
        expiresIn: '7d',
    });


    return res.json({
        erro: false,
        token
    })
});

app.get("/val-token", eAdmin , async (req, res) => {
    await User.findByPk(req.userId, {attributes: ['id', 'name', 'email']})
    .then((user) => {
        return res.json({
            erro: false,
            user
        });
    }).catch(()=> {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Necessário realizar o login para acessar a página!"
        });
    });
});


app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});