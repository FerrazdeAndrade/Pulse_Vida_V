const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- BANCOS DE DADOS TEMPORÁRIOS EM MEMÓRIA ---
let bancoDeDadosAgendamentos = [];

// Usuários iniciais do sistema (Paciente, Médico e Administrador)
let bancoDeDadosUsuarios = [
    { id: 1, usuario: "admin", senha: "123", tipo: "administrador" },
    { id: 2, usuario: "medico", senha: "123", tipo: "medico" },
    { id: 3, usuario: "paciente", senha: "123", tipo: "paciente" }
];

// --- ROTAS DE AUTENTICAÇÃO E LOGIN ---
app.post('/api/login', (req, res) => {
    const { usuario, senha } = req.body;
    const user = bancoDeDadosUsuarios.find(u => u.usuario === usuario && u.senha === senha);

    if (user) {
        res.json({ 
            sucesso: true, 
            mensagem: "Login realizado com sucesso!", 
            tipo: user.tipo,
            usuario: user.usuario 
        });
    } else {
        res.status(401).json({ sucesso: false, mensagem: "Usuário ou senha inválidos!" });
    }
});

// Rota para cadastrar novos usuários (Cadastro)
app.post('/api/usuarios', (req, res) => {
    const novoUsuario = req.body;
    bancoDeDadosUsuarios.push(novoUsuario);
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!", usuario: novoUsuario });
});

// --- ROTAS DE AGENDAMENTOS ---
app.post('/api/agendamentos', (req, res) => {
    const novoAgendamento = {
        id: Date.now(),
        ...req.body,
        status: "Confirmado (Pendente Sincronização Google Calendar)"
    };
    bancoDeDadosAgendamentos.push(novoAgendamento);
    
    res.status(201).json({ 
        mensagem: "Agendamento salvo com sucesso no servidor!", 
        agendamento: novoAgendamento 
    });
});

app.get('/api/agendamentos', (req, res) => {
    res.json(bancoDeDadosAgendamentos);
});

// --- ROTA PARA EXCLUIR AGENDAMENTO ---
app.delete('/api/agendamentos/:id', (req, res) => {
    const idParam = req.params.id;
    console.log("Tentando excluir o ID recebido da URL:", idParam);
    console.log("IDs atuais no banco:", bancoDeDadosAgendamentos.map(i => i.id));

    const index = bancoDeDadosAgendamentos.findIndex(item => String(item.id) === String(idParam));

    if (index === -1) {
        console.log("Erro: Item não encontrado no array!");
        return res.status(404).json({ mensagem: "Agendamento não encontrado." });
    }

    bancoDeDadosAgendamentos.splice(index, 1);
    console.log("Sucesso! Item excluído.");
    res.json({ mensagem: "Agendamento excluído com sucesso!" });
});

// --- ROTA EXCLUSIVA DO PAINEL DO ADMINISTRADOR ---
app.get('/api/admin/estatisticas', (req, res) => {
    res.json({
        totalAgendamentos: bancoDeDadosAgendamentos.length,
        totalUsuarios: bancoDeDadosUsuarios.length,
        statusSistema: "Operacional"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});