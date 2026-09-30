

# ❤️ PulseVida
### Sistema Inteligente de Apoio e Monitoramento da Hipertensão

[![Licença](https://img.shields.io/badge/licenca-MIT-blue.svg)](#)
[![Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-success.svg)](#)
[![Plataforma](https://img.shields.io/badge/plataforma-Web%20%7C%20Mobile-red.svg)](#)

*Transformando o acompanhamento da saúde cardiovascular através da tecnologia, prevenção e integração médico-paciente.*

[Visão Geral](#-visão-geral) • [Problema](#-o-problema) • [Solução](#-a-solução) • [Funcionalidades](#-principais-funcionalidades) • [Arquitetura](#-arquitetura-e-tecnologias) • [Equipe](#-equipe-do-projeto)

</div>

---

## 📌 Visão Geral

O **PulseVida** é uma plataforma desenvolvida para revolucionar o monitoramento e a gestão contínua de pacientes hipertensos. O sistema conecta pacientes a profissionais de saúde e unidades de atendimento, permitindo análises em tempo real, triagem inteligente de riscos e recomendações personalizadas para evitar complicações graves.

---

## 🚨 O Problema

A hipertensão arterial é uma doença silenciosa que afeta milhões de pessoas. Sem o devido acompanhamento, a falta de controle gera consequências graves:

* 💔 **Doenças Cardíacas:** Esforço excessivo do coração, aumentando o risco de infarto e insuficiência cardíaca.
* 🧠 **Acidente Vascular Cerebral (AVC):** Rompimento ou entupimento de vasos cerebrais.
* 🏥 **Internações Frequentes:** Falta de monitoramento contínuo sobrecarrega o sistema de saúde público (SUS) e privado.
* ⚠️ **Risco de Morte:** Complicações fatais decorrentes do diagnóstico e intervenção tardios.

---

## 💡 A Solução

O **PulseVida** oferece uma abordagem preventiva e integrada para mitigar esses riscos:

* **Para o Paciente:** Registro simples de aferições, hábitos e alertas em momentos críticos.
* **Para a Rede de Saúde:** Digitalização de histórico, acompanhamento em tempo real e redução de atendimentos de emergência evitáveis.

---

## ✨ Principais Funcionalidades

| Funcionalidade | Descrição |
| :--- | :--- |
| 📊 **Registro de Sinais Vitais** | Monitoramento de Pressão Arterial (Sistólica/Diastólica) e Frequência Cardíaca (BPM). |
| 🚥 **Classificação de Risco** | Algoritmo que categoriza o estado de saúde (*Baixo, Médio, Alto, Crítico*). |
| 🍏 **Sugestão Inteligente de Hábitos** | Recomendações personalizadas de caminhadas, alimentação e hidratação com base no nível de risco do usuário. |
| 💊 **Gestão de Medicamentos** | Controle de dosagens e horários. |
| 🚨 **Alertas de Urgência & Encaminhamento** | Indicação imediata para busca de socorro médico em casos de picos de pressão. |
| 📅 **Agendamento de Consultas** | Integração direta com dados do paciente, cartão SUS e direcionamento para unidades de saúde (ex: UPA). |
| 👨‍⚕️ **Painel Médico** | Acompanhamento centralizado para profissionais de saúde. |

---

## 🎯 Diferenciais do Sistema

* **Integração Total:** Conecta o usuário final diretamente aos serviços de saúde.
* **Triagem Ativa:** Não funciona apenas como um "diário de anotações", mas analisa ativamente os sintomas informados.
* **Redução do Tempo de Resposta:** Encaminhamento ágil e direcionado para emergências.

---

## 🗺️ Roadmap de Investimento e Expansão

O plano de desenvolvimento do **PulseVida** inclui:

- [x] Protótipo do sistema Web/Mobile
- [x] Algoritmo de triagem e classificação de risco
- [ ] Implementação do aplicativo mobile nativo
- [ ] Integração com aparelhos de pressão via Bluetooth / IoT
- [ ] Módulo de Inteligência Artificial para previsões de picos de pressão
- [ ] Testes em ambientes de saúde reais

### 💰 Estimativa de Investimento
| Área | Investimento Estimado |
| :--- | :---: |
| Hospedagem e Servidor em Nuvem | R$ 2.500 |
| Desenvolvimento Mobile | R$ 8.000 |
| Segurança e Banco de Dados | R$ 3.000 |
| Integração com Dispositivos Médicos | R$ 5.000 |
| Divulgação e Marketing | R$ 2.000 |
| Testes e Manutenção | R$ 1.500 |

---

## 👥 Equipe do Projeto

Desenvolvido com empenho por:

* 👨‍💻 **Esequias Ferraz de Andrade**
* 👨‍💻 **Gabriel Macedo Guimarães**
* 👨‍💻 **Thiago Marsol Almeida Baiao**


---

<div align="center">

Desenvolvido para salvar vidas e melhorar a gestão da saúde pública e privada.  
*PulseVida - Conectando dados, cuidando de corações.* ❤️

</div>

====================================================================
🌐 Endereços Web (Acessos)
pgAdmin (Banco SQL Web): http://localhost:5050

FastAPI (Documentação do Backend): [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

💻 Comandos do Terminal
1. Banco de Dados (Docker / pgAdmin)
Subir o container do pgAdmin:

Bash
docker-compose up -d
Verificar containers ativos:

Bash
docker ps
2. Backend (FastAPI / Uvicorn)
Entrar na pasta do backend:

Bash
cd backend
Iniciar o servidor da API (com recarregamento automático):

Bash
uvicorn main:app --reload
