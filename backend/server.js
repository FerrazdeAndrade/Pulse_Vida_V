const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- BANCOS DE DADOS TEMPORÁRIOS EM MEMÓRIA ---
let bancoDeDadosAgendamentos = [];
let bancoDeDadosPesquisas = []; // Movido para cima para garantir o escopo correto

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
    
    const existe = bancoDeDadosUsuarios.find(u => u.usuario === novoUsuario.usuario);
    if (existe) {
        return res.status(400).json({ sucesso: false, mensagem: "Usuário já cadastrado!" });
    }

    bancoDeDadosUsuarios.push(novoUsuario);
    res.status(201).json({ sucesso: true, mensagem: "Usuário cadastrado com sucesso!", usuario: novoUsuario });
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
    const index = bancoDeDadosAgendamentos.findIndex(item => String(item.id) === String(idParam));

    if (index === -1) {
        return res.status(404).json({ mensagem: "Agendamento não encontrado." });
    }

    bancoDeDadosAgendamentos.splice(index, 1);
    res.json({ mensagem: "Agendamento excluído com sucesso!" });
});

// --- ROTA EXCLUSIVA DO PAINEL DO ADMINISTRADOR ---
app.get('/api/admin/estatisticas', (req, res) => {
    res.json({
        totalAgendamentos: bancoDeDadosAgendamentos.length,
        totalUsuarios: bancoDeDadosUsuarios.length,
        totalPesquisas: bancoDeDadosPesquisas.length,
        statusSistema: "Operacional"
    });
});

// --- ROTAS DE PESQUISAS / FEEDBACKS DOS USUÁRIOS ---

// Salvar novo feedback
app.post('/api/pesquisas', (req, res) => {
    const novoFeedback = {
        id: Date.now(),
        ...req.body
    };
    bancoDeDadosPesquisas.push(novoFeedback);
    
    res.status(201).json({ 
        sucesso: true, 
        mensagem: "Feedback salvo com sucesso no servidor!", 
        feedback: novoFeedback 
    });
});

// Visualizar todos os dados das pesquisas em formato JSON
app.get('/api/pesquisas', (req, res) => {
    res.json(bancoDeDadosPesquisas);
});

// BÔNUS: Rota para baixar os dados das pesquisas diretamente em CSV (para abrir no Excel)
app.get('/api/pesquisas/csv', (req, res) => {
    if (bancoDeDadosPesquisas.length === 0) {
        return res.status(404).send("Nenhum dado de pesquisa registrado ainda.");
    }

    let csv = "ID,Data,Nome,Positivo,Negativo,Sugestoes\n";
    bancoDeDadosPesquisas.forEach(p => {
        const dataFormatada = new Date(p.data).toLocaleString();
        // Remove quebras de linha e vírgulas para não quebrar o formato CSV
        const pos = (p.positivo || "").replace(/[\n\r]+/g, " ").replace(/,/g, ";");
        const neg = (p.negativo || "").replace(/[\n\r]+/g, " ").replace(/,/g, ";");
        const sug = (p.sugestoes || "").replace(/[\n\r]+/g, " ").replace(/,/g, ";");
        
        csv += `${p.id},"${dataFormatada}","${p.nome}","${pos}","${neg}","${sug}"\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('relatorio_feedbacks.csv');
    res.send(csv);
});

// --- INICIALIZAÇÃO DO SERVIDOR (DEVE SER SEMPRE A ÚLTIMA LINHA) ---
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});