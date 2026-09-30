from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI(title="Pulse Vida API", version="1.0")

# --- MODELOS DE DADOS ---

class AtendimentoSchema(BaseModel):
    medico: str
    especialidade: Optional[str] = None
    data: str  # Ex: "2026-10-05"
    hora: str  # Ex: "14:30"
    local: str
    cidade: str
    estado: str
    municipio: str

class PacienteCompletoSchema(BaseModel):
    nome_paciente: str
    email: str
    telefone: str
    atendimento: AtendimentoSchema

# Simulação de banco de dados em memória (dicionário)
pacientes_db = {}


# --- ROTAS EXISTENTES ---

@app.get("/")
def read_root():
    return {"message": "API do Pulse Vida rodando com sucesso!"}

@app.get("/api/metricas")
def get_metricas():
    return {
        "status": "Estável",
        "batimento": "75 bpm",
        "pressao": "118/78 mmHg"
    }


# --- NOVAS ROTAS (CRUD DE PACIENTES) ---

@app.get("/api/pacientes", response_model=dict)
def listar_pacientes():
    """Retorna todos os pacientes cadastrados."""
    return {"pacientes": pacientes_db}


@app.post("/api/pacientes/{paciente_id}", status_code=201)
def criar_paciente(paciente_id: int, dados: PacienteCompletoSchema):
    """Cadastra um novo paciente com os dados de atendimento (POST)."""
    if paciente_id in pacientes_db:
        raise HTTPException(status_code=400, detail="Paciente já cadastrado com este ID.")
    
    pacientes_db[paciente_id] = dados.dict()
    return {
        "mensagem": "Paciente cadastrado com sucesso!",
        "id": paciente_id,
        "dados": dados
    }


@app.put("/api/pacientes/{paciente_id}")
def atualizar_paciente(paciente_id: int, dados: PacienteCompletoSchema):
    """Atualiza por completo os dados do paciente e atendimento (PUT)."""
    if paciente_id not in pacientes_db:
        raise HTTPException(status_code=404, detail="Paciente não encontrado para atualização.")
    
    pacientes_db[paciente_id] = dados.dict()
    return {
        "mensagem": f"Dados do paciente {paciente_id} atualizados com sucesso!",
        "dados_atualizados": dados
    }


@app.delete("/api/pacientes/{paciente_id}")
def deletar_paciente(paciente_id: int):
    """Remove um paciente do sistema (DELETE)."""
    if paciente_id not in pacientes_db:
        raise HTTPException(status_code=404, detail="Paciente não encontrado.")
    
    del pacientes_db[paciente_id]
    return {"mensagem": f"Paciente {paciente_id} removido com sucesso!"}