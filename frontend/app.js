// ==========================================
// CONFIGURAÇÃO DA API
// ==========================================
// Altere para a URL real do seu backend hospedado (ex: Render, Railway)
const API_URL = "https://pulse-vida-v-api.onrender.com";

// ==========================================
// 1. REGISTRO DO SERVICE WORKER E PUSH NOTIFICATIONS
// ==========================================

if ('serviceWorker' in navigator && 'PushManager' in window) {
  // Caminho corrigido para relativo para evitar erros de escopo e loops
  navigator.serviceWorker.register('sw.js')
    .then(reg => {
      console.log('Service Worker registrado com sucesso:', reg.scope);
      configurarBotao(reg);
    })
    .catch(err => console.error('Erro ao registrar o Service Worker:', err));
}

// Configura o botão de notificações (procura pelo ID btn-subscribe)
function configurarBotao(registration) {
  const btn = document.getElementById('btn-subscribe');

  if (!btn) return; // Evita erros se o botão não estiver presente na página atual

  btn.addEventListener('click', async () => {
    try {
      const permissao = await Notification.requestPermission();

      if (permissao === 'granted') {
        await inscreverUsuario(registration);
        btn.disabled = true;
        btn.textContent = 'Notificações Ativadas';
        btn.style.backgroundColor = '#28a745';
        btn.style.color = '#fff';
      } else {
        btn.textContent = 'Permissão Negada';
        btn.style.backgroundColor = '#dc3545';
        btn.style.color = '#fff';
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão de notificação:', error);
    }
  });
}

// Realiza a inscrição do usuário nas Push Notifications
async function inscreverUsuario(registration) {
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array('SUA_CHAVE_PUBLICA_VAPID')
  });

  console.log('Inscrição realizada:', JSON.stringify(subscription));
}

// Função utilitária para converter a chave VAPID
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const raw = atob(base64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}


// ==========================================
// 2. GERENCIAMENTO DE LOGIN E REDIRECIONAMENTO DE PERFIS
// ==========================================

function processarLogin(tipo, nomeDoMedico = "Dr(a). Responsável") {
  // Exemplo de como você faria uma chamada para a sua API hospedada:
  // fetch(`${API_URL}/api/login`, { method: 'POST', ... })

  // Validação do login do médico conforme solicitado
  if (tipo === "medico") {
    localStorage.setItem("logado", "true");
    localStorage.setItem("usuarioAtivo", "medico");
    localStorage.setItem("nomeMedico", nomeDoMedico);
    window.location.href = "painel_medico.html";
    return;
  }
  
  // Exemplo para Administrador ou Paciente
  if (tipo === "admin") {
    localStorage.setItem("logado", "true");
    localStorage.setItem("usuarioAtivo", "admin");
    window.location.href = "index.html";
    return;
  }

  // Padrão para Paciente
  localStorage.setItem("logado", "true");
  localStorage.setItem("usuarioAtivo", "paciente");
  window.location.href = "index.html";
}