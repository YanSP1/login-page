// Configuração do EmailJS para envio de emails
// Para usar o EmailJS, siga estes passos:

/*
1. Acesse https://www.emailjs.com e crie uma conta gratuita
2. Configure um serviço de email (Gmail, Outlook, etc.)
3. Crie um template de email
4. Substitua as configurações abaixo pelos seus dados

CONFIGURAÇÃO NECESSÁRIA:
*/

const EMAILJS_CONFIG = {
    SERVICE_ID: 'YOUR_SERVICE_ID',  // Substitua pelo seu Service ID
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // Substitua pelo seu Template ID
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY'    // Substitua pela sua Public Key
};

// Inicialização do EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('EmailJS inicializado com sucesso');
    } else {
        console.warn('EmailJS não carregado. Usando fallback mailto.');
    }
}

// Função aprimorada para envio de email usando EmailJS
async function sendEmailWithEmailJS(to, subject, message) {
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS não está disponível');
    }

    const templateParams = {
        to_email: to,
        subject: subject,
        message: message,
        from_name: 'Sistema de Login',
        reply_to: 'noreply@sistema.com'
    };

    try {
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        );
        console.log('Email enviado com sucesso:', response);
        return response;
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        throw error;
    }
}

// Template do email para EmailJS
const EMAIL_TEMPLATE = `
Para configurar o EmailJS:

1. Acesse https://emailjs.com
2. Crie uma conta gratuita
3. Adicione um serviço de email (Gmail recomendado)
4. Crie um template com os seguintes parâmetros:
   - to_email
   - subject  
   - message
   - from_name
   - reply_to

5. Substitua as configurações em EMAILJS_CONFIG no arquivo emailjs-config.js

Template sugerido para EmailJS:
---
Assunto: {{subject}}

{{message}}

---
Enviado por: {{from_name}}
Para responder: {{reply_to}}
---

6. Atualize o script.js para usar sendEmailWithEmailJS ao invés de sendEmailNotification
`;

console.log(EMAIL_TEMPLATE);
