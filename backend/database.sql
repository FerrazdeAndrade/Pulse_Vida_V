-- Criação da tabela de usuários / pacientes
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(50) DEFAULT 'paciente', -- paciente, medico, gestor
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de registros de métricas relacionais
CREATE TABLE IF NOT EXISTS metricas_usuario (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    status VARCHAR(50),
    batimento VARCHAR(20),
    pressao VARCHAR(20),
    registrado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de um usuário de teste inicial
INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario) 
VALUES ('João da Silva', 'joao@email.com', 'hash_exemplo_123', 'paciente')
ON CONFLICT (email) DO NOTHING;