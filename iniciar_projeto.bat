@echo off
echo ===================================================
echo Iniciando o Servidor Backend do PulseVida (Porta 3000)...
echo ===================================================

REM Vai para a pasta backend e inicia o servidor em uma nova janela minimizada ou separada
cd /d "%~dp0\backend"
start cmd /k "node server.js"

echo Aguardando o servidor iniciar completamente...
timeout /t 3 /nobreak > nul

echo Abrindo o sistema no navegador...
REM Altere "login.html" para a página inicial correta do seu projeto se necessário
start http://127.0.0.1:5500/frontend/login.html

echo ===================================================
echo Projeto iniciado com sucesso!
echo ===================================================