// Elementos do DOM
const tabs = document.querySelectorAll('.tab');
const formContainers = document.querySelectorAll('.form-container');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const closeModal = document.querySelector('.close');

// Configuração do sistema de controle de emails
const ADMIN_EMAIL = 'yandasilvapires@gmail.com';

// Função para enviar notificação ao administrador
async function sendAdminNotification(type, data) {
    const timestamp = new Date().toLocaleString('pt-BR');
    const userIP = await getUserIP();

    let subject = '';
    let message = '';

    switch (type) {
        case 'login':
            subject = '🔐 Nova Tentativa de Login - Sistema de Controle';
            message = `
                Uma nova tentativa de login foi realizada no sistema:
                
                📧 Email: ${data.email}
                🕒 Data/Hora: ${timestamp}
                🌐 IP: ${userIP}
                🖥️ Navegador: ${navigator.userAgent}
                
                Esta é uma notificação automática do sistema de controle.
            `;
            break;

        case 'register':
            subject = '👤 Novo Usuário Registrado - Sistema de Controle';
            message = `
                Um novo usuário foi registrado no sistema:
                
                👤 Nome de usuário: ${data.username}
                📧 Email: ${data.email}
                🕒 Data/Hora: ${timestamp}
                🌐 IP: ${userIP}
                🖥️ Navegador: ${navigator.userAgent}
                
                Esta é uma notificação automática do sistema de controle.
            `;
            break;

        case 'forgot_password':
            subject = '🔑 Solicitação de Recuperação de Senha - Sistema de Controle';
            message = `
                Uma solicitação de recuperação de senha foi feita:
                
                📧 Email: ${data.email}
                🕒 Data/Hora: ${timestamp}
                🌐 IP: ${userIP}
                🖥️ Navegador: ${navigator.userAgent}
                
                Esta é uma notificação automática do sistema de controle.
            `;
            break;
    }

    try {
        // Usando EmailJS para envio (você precisará configurar uma conta gratuita)
        // Alternativa: usar um serviço de backend próprio
        await sendEmailNotification(ADMIN_EMAIL, subject, message);
        console.log(`Notificação enviada para ${ADMIN_EMAIL}:`, type);
    } catch (error) {
        console.error('Erro ao enviar notificação:', error);
        // Salva localmente como backup
        saveNotificationLocally(type, data, timestamp, userIP);
    }
}

// Função para obter IP do usuário
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'IP não disponível';
    }
}

// Função para enviar email (usando mailto como fallback)
async function sendEmailNotification(to, subject, message) {
    // Para uma implementação real, você usaria um serviço como EmailJS, SendGrid, ou um backend próprio
    // Aqui vamos usar mailto como demonstração
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    // Cria um link temporário e clica nele para abrir o cliente de email
    const tempLink = document.createElement('a');
    tempLink.href = mailtoLink;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    // Para implementação real com EmailJS:
    /*
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: to,
        subject: subject,
        message: message,
        from_name: 'Sistema de Login'
    });
    */
}

// Função para salvar notificação localmente como backup
function saveNotificationLocally(type, data, timestamp, userIP) {
    const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    notifications.push({
        type,
        data,
        timestamp,
        userIP,
        browser: navigator.userAgent
    });
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
    console.log('Notificação salva localmente como backup');
}

// Função para alternar entre as abas
function switchTab(tabName) {
    // Remove a classe active de todas as abas e containers
    tabs.forEach(tab => tab.classList.remove('active'));
    formContainers.forEach(container => container.classList.remove('active'));

    // Adiciona a classe active na aba e container correspondentes
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Event listeners para as abas
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        switchTab(tabName);
    });
});

// Função para mostrar mensagens
function showMessage(container, message, type = 'success') {
    // Remove mensagem anterior se existir
    const existingMessage = container.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Cria nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // Insere no início do container
    container.insertBefore(messageDiv, container.firstChild);

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para validar senha (mínimo 6 caracteres)
function isValidPassword(password) {
    return password.length >= 6;
}

// Handle do formulário de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Validações
    if (!email || !password) {
        showMessage(loginForm, 'Por favor, preencha todos os campos.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showMessage(loginForm, 'Por favor, insira um email válido.', 'error');
        return;
    }

    // Simulação de login (aqui você faria a chamada para sua API)
    console.log('Tentativa de login:', { email, password });

    // Notifica o administrador sobre a tentativa de login
    sendAdminNotification('login', { email });

    // Simula um delay de processamento
    const submitButton = loginForm.querySelector('.btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Entrando...';
    submitButton.disabled = true;

    setTimeout(() => {
        showMessage(loginForm, 'Login realizado com sucesso! Administrador foi notificado.', 'success');

        // Aqui você redirecionaria o usuário ou faria outras ações
        // window.location.href = '/dashboard';

        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Limpa o formulário
        loginForm.reset();
    }, 1500);
});

// Handle do formulário de registro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validações
    if (!username || !email || !password || !confirmPassword) {
        showMessage(registerForm, 'Por favor, preencha todos os campos.', 'error');
        return;
    }

    if (username.length < 3) {
        showMessage(registerForm, 'O nome de usuário deve ter pelo menos 3 caracteres.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showMessage(registerForm, 'Por favor, insira um email válido.', 'error');
        return;
    }

    if (!isValidPassword(password)) {
        showMessage(registerForm, 'A senha deve ter pelo menos 6 caracteres.', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage(registerForm, 'As senhas não coincidem.', 'error');
        return;
    }

    // Simulação de registro (aqui você faria a chamada para sua API)
    console.log('Tentativa de registro:', { username, email, password });

    // Notifica o administrador sobre o novo registro
    sendAdminNotification('register', { username, email });

    // Simula um delay de processamento
    const submitButton = registerForm.querySelector('.btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Criando conta...';
    submitButton.disabled = true;

    setTimeout(() => {
        showMessage(registerForm, 'Conta criada com sucesso! Administrador foi notificado. Faça login para continuar.', 'success');

        // Troca para a aba de login após criar a conta
        setTimeout(() => {
            switchTab('login');
        }, 2000);

        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Limpa o formulário
        registerForm.reset();
    }, 1500);
});

// Handle para o link "Esqueci minha senha"
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Pré-preenche o email do modal com o email do campo de login
    const loginEmail = document.getElementById('loginEmail').value;
    if (loginEmail) {
        document.getElementById('forgotEmail').value = loginEmail;
    }

    forgotPasswordModal.style.display = 'block';
});

// Handle do formulário de recuperação de senha
forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('forgotEmail').value.trim();

    if (!email) {
        showMessage(forgotPasswordForm, 'Por favor, insira seu email.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showMessage(forgotPasswordForm, 'Por favor, insira um email válido.', 'error');
        return;
    }

    // Simulação de envio de email (aqui você faria a chamada para sua API)
    console.log('Recuperação de senha para:', email);

    // Notifica o administrador sobre a solicitação de recuperação de senha
    sendAdminNotification('forgot_password', { email });

    const submitButton = forgotPasswordForm.querySelector('.btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    setTimeout(() => {
        showMessage(forgotPasswordForm, 'Solicitação enviada! Administrador foi notificado.', 'success');

        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Fecha o modal após alguns segundos
        setTimeout(() => {
            forgotPasswordModal.style.display = 'none';
            forgotPasswordForm.reset();
        }, 2000);
    }, 1500);
});

// Handle para fechar o modal
closeModal.addEventListener('click', () => {
    forgotPasswordModal.style.display = 'none';
    forgotPasswordForm.reset();
});

// Fecha o modal se clicar fora dele
window.addEventListener('click', (e) => {
    if (e.target === forgotPasswordModal) {
        forgotPasswordModal.style.display = 'none';
        forgotPasswordForm.reset();
    }
});

// Adiciona efeito de loading nos inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Prevenção de envio duplo de formulários
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function () {
        const submitButton = this.querySelector('button[type="submit"]');
        setTimeout(() => {
            submitButton.disabled = false;
        }, 2000);
    });
});

// Função para visualizar notificações salvas localmente (para debug/backup)
function viewLocalNotifications() {
    const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    console.table(notifications);
    return notifications;
}

// Função para limpar notificações locais
function clearLocalNotifications() {
    localStorage.removeItem('adminNotifications');
    console.log('Notificações locais removidas');
}

// Adiciona funções globais para debug (acessíveis no console do navegador)
window.debugFunctions = {
    viewNotifications: viewLocalNotifications,
    clearNotifications: clearLocalNotifications,
    sendTestNotification: () => sendAdminNotification('test', { message: 'Teste do sistema' })
};

console.log('Sistema de login inicializado com sucesso!');

// Inicializa o EmailJS quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initEmailJS === 'function') {
        initEmailJS();
    }

    console.log('🔐 Sistema de Controle de Login Ativo');
    console.log('📧 Email do administrador:', ADMIN_EMAIL);
    console.log('🛠️ Funções de debug disponíveis em window.debugFunctions');
    console.log('💡 Para configurar EmailJS, veja o arquivo emailjs-config.js');
});
