const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Lista para armazenar os agendamentos temporariamente no servidor
let bancoDeDadosAgendamentos = [];

// Rota para cadastrar um novo agendamento (POST)
app.post('/api/agendamentos', (req, res) => {
    const novoAgendamento = req.body;
    bancoDeDadosAgendamentos.push(novoAgendamento);
    res.status(201).json({ 
        mensagem: "Agendamento salvo com sucesso no servidor!", 
        agendamento: novoAgendamento 
    });
});

// Rota para consultar todos os agendamentos marcados (GET)
app.get('/api/agendamentos', (req, res) => {
    res.json(bancoDeDadosAgendamentos);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});