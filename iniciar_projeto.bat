@echo off
echo ===================================================
echo Iniciando o Servidor Backend do PulseVida (Porta 3000)...
echo ===================================================

REM Entra explicitamente na pasta backend onde está o server.js
cd /d "%~dp0\backend"

REM Inicia o servidor com nodemon (ele vai reiniciar sozinho se você salvar qualquer alteração no server.js)
start cmd /k "npx nodemon server.js"

echo Aguardando o servidor iniciar completamente...
timeout /t 3 /nobreak > nul

echo Abrindo o sistema no navegador...
REM Abre a página inicial no Live Server (porta 5500)
start http://127.0.0.1:5500/frontend/index.html

echo ===================================================
echo Projeto iniciado com sucesso para a apresentação!
echo ===================================================