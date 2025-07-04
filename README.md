# 🔐 Sistema de Login com Controle Administrativo

Um sistema de login moderno e responsivo com funcionalidades de registro, recuperação de senha e sistema de controle administrativo integrado.

## 📋 Índice

- [Características](#-características)
- [Screenshots](#-screenshots)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Como Usar](#-como-usar)
- [Sistema de Controle](#-sistema-de-controle)
- [Configuração EmailJS](#-configuração-emailjs)
- [Funcionalidades](#-funcionalidades)
- [Responsividade](#-responsividade)
- [Debug e Desenvolvimento](#-debug-e-desenvolvimento)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## ✨ Características

- 🎨 **Interface Moderna**: Design clean com gradientes e animações suaves
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🔒 **Sistema de Login**: Validação completa de credenciais
- 👤 **Registro de Usuário**: Criação de conta com validação de dados
- 🔑 **Recuperação de Senha**: Modal para solicitação de nova senha
- 📧 **Controle Administrativo**: Notificações automáticas para administrador
- ⚡ **Validação em Tempo Real**: Feedback imediato para o usuário
- 💾 **Backup Local**: Sistema de backup das notificações
- 🎭 **Animações CSS**: Transições suaves e efeitos visuais

## 📸 Screenshots

### Tela de Login
<!-- Adicione aqui um print da tela de login -->
![image](https://github.com/user-attachments/assets/85ff12db-7efe-4a99-8692-361c2d0e5af3)

*Descrição: Interface principal de login com campos de email e senha, além do link "Esqueci minha senha"*

### Tela de Registro
<!-- Adicione aqui um print da tela de registro -->
![image](https://github.com/user-attachments/assets/027a7424-8550-4fb5-b1cb-2b02ef8254e4)

*Descrição: Formulário de criação de conta com validação de todos os campos obrigatórios*

### Modal de Recuperação de Senha
<!-- Adicione aqui um print do modal de recuperação -->
![image](https://github.com/user-attachments/assets/6e94cd27-22b6-49aa-a892-af13a290f3aa)

*Descrição: Modal popup para solicitação de recuperação de senha*

### Versão Mobile
<!-- Adicione aqui um print da versão mobile -->
![image](https://github.com/user-attachments/assets/8620aaea-5a08-40b5-8f85-4d64c6c06f34)

*Descrição: Layout responsivo otimizado para dispositivos móveis*

### Mensagens de Feedback
<!-- Adicione aqui um print das mensagens de sucesso/erro -->
![image](https://github.com/user-attachments/assets/87d0d9b0-5184-477d-9ac8-f299a24bfffe)

*Descrição: Sistema de mensagens para feedback do usuário (sucesso e erro)*

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com flexbox, gradientes e animações
- **JavaScript ES6+**: Lógica interativa e validações
- **EmailJS**: Serviço para envio de emails via JavaScript
- **LocalStorage**: Armazenamento local para backup de notificações

## 📁 Estrutura do Projeto

```
Página de login/
├── login.html              # Página principal
├── style.css               # Estilos CSS
├── script.js               # Lógica JavaScript
├── emailjs-config.js       # Configuração do EmailJS
├── README.md               # Documentação
└── screenshots/            # Pasta para imagens do README
    ├── login-screen.png
    ├── register-screen.png
    ├── forgot-password-modal.png
    ├── mobile-version.png
    └── feedback-messages.png
```

## 🚀 Instalação e Configuração

### 1. Clone ou Baixe o Projeto
```bash
git clone [url-do-repositorio]
cd "Página de login"
```

### 2. Configure o EmailJS (Opcional)
1. Acesse [EmailJS.com](https://emailjs.com)
2. Crie uma conta gratuita
3. Configure um serviço de email (Gmail recomendado)
4. Crie um template com os parâmetros necessários
5. Edite o arquivo `emailjs-config.js` com suas credenciais

### 3. Abra o Projeto
Simplesmente abra o arquivo `login.html` em seu navegador favorito.

## 💻 Como Usar

### Para Usuários

1. **Login**: 
   - Insira email e senha válidos
   - Clique em "Entrar"

2. **Criar Conta**:
   - Clique na aba "Criar Conta"
   - Preencha todos os campos obrigatórios
   - Confirme a senha
   - Clique em "Criar Conta"

3. **Recuperar Senha**:
   - Na tela de login, clique em "Esqueci minha senha"
   - Insira seu email no modal
   - Clique em "Enviar"

### Para Desenvolvedores

O sistema possui funções de debug acessíveis via console:

```javascript
// Ver notificações armazenadas localmente
window.debugFunctions.viewNotifications();

// Limpar notificações locais
window.debugFunctions.clearNotifications();

// Enviar notificação de teste
window.debugFunctions.sendTestNotification();
```

## 🔧 Sistema de Controle

O sistema inclui controle administrativo automático que envia notificações para o email configurado (`yandasilvapires@gmail.com`) sempre que:

- ✅ Alguém faz login no sistema
- ✅ Uma nova conta é criada
- ✅ Uma recuperação de senha é solicitada

### Informações Capturadas:
- 📧 Email do usuário
- 🕒 Data e hora da ação
- 🌐 Endereço IP do usuário
- 🖥️ Informações do navegador
- 👤 Nome de usuário (no caso de registro)

## 📧 Configuração EmailJS

Para configurar o envio automático de emails:

### 1. Configuração da Conta
```javascript
const EMAILJS_CONFIG = {
    SERVICE_ID: 'seu_service_id',
    TEMPLATE_ID: 'seu_template_id', 
    PUBLIC_KEY: 'sua_public_key'
};
```

### 2. Template Sugerido
```
Assunto: {{subject}}

{{message}}

---
Enviado por: {{from_name}}
Sistema de Login
```

### 3. Parâmetros do Template
- `to_email`: Email do destinatário
- `subject`: Assunto do email
- `message`: Corpo da mensagem
- `from_name`: Nome do remetente

## ⚙️ Funcionalidades

### Validações Implementadas
- ✅ **Email**: Formato válido usando regex
- ✅ **Senha**: Mínimo de 6 caracteres
- ✅ **Nome de usuário**: Mínimo de 3 caracteres
- ✅ **Confirmação de senha**: Deve coincidir com a senha original
- ✅ **Campos obrigatórios**: Todos os campos devem ser preenchidos

### Recursos de UX
- 🎯 **Feedback Visual**: Mensagens de sucesso e erro
- ⏱️ **Loading States**: Botões mostram estado de carregamento
- 🎨 **Animações**: Transições suaves entre elementos
- 🔄 **Auto-switch**: Após registro, usuário é direcionado para login
- 💾 **Persistência**: Modal de senha lembra email digitado

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a:

- 🖥️ **Desktop**: Layout completo com duas colunas
- 📱 **Tablet**: Layout adaptado com espaçamentos otimizados  
- 📱 **Mobile**: Layout de coluna única, otimizado para toque

### Breakpoints:
- **Mobile**: até 480px
- **Tablet**: 481px - 768px
- **Desktop**: acima de 768px

## 🔍 Debug e Desenvolvimento

### Console Logs
O sistema fornece logs detalhados no console do navegador:

```javascript
// Inicialização
🔐 Sistema de Controle de Login Ativo
📧 Email do administrador: yandasilvapires@gmail.com
🛠️ Funções de debug disponíveis em window.debugFunctions
💡 Para configurar EmailJS, veja o arquivo emailjs-config.js
```

### Armazenamento Local
As notificações são salvas localmente como backup em caso de falha no envio de email.

### Estrutura das Notificações
```javascript
{
    type: 'login|register|forgot_password',
    data: { email, username },
    timestamp: '04/07/2025 14:30:15',
    userIP: '192.168.1.1',
    browser: 'Mozilla/5.0...'
}
```

## 🤝 Contribuição

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Diretrizes de Contribuição
- 📝 Use comentários claros no código
- ✅ Teste todas as funcionalidades
- 📱 Mantenha a responsividade
- 🎨 Siga o padrão de design existente

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 📞 Contato

Para dúvidas ou sugestões, entre em contato:

- 📧 **Email**: yandasilvapires@gmail.com
- 🌐 **GitHub**: [Seu GitHub]
- 💼 **LinkedIn**: [Seu LinkedIn]

---

## 📝 Changelog

### Versão 1.0.0 (04/07/2025)
- ✅ Sistema de login e registro implementado
- ✅ Modal de recuperação de senha
- ✅ Sistema de controle administrativo
- ✅ Integração com EmailJS
- ✅ Design responsivo completo
- ✅ Validações e feedback ao usuário

---

**Desenvolvido com ❤️ por Yan da Silva Pires**
