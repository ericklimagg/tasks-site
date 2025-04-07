# Projeto-Front-End-2025
# Tasks - Sistema de Gerenciamento de Tarefas com Temporizador Pomodoro

Um aplicativo web para gerenciamento de tarefas com temporizador integrado, desenvolvido para melhorar a produtividade e organização de atividades diárias.

## Visão Geral

O projeto **Tasks** é um sistema de gerenciamento de tarefas que combina um temporizador Pomodoro com um organizador de tarefas. O aplicativo permite que os usuários criem, acompanhem e gerenciem suas tarefas, enquanto utilizam a técnica Pomodoro para melhorar a concentração e o foco.

## Funcionalidades

### Temporizador Pomodoro
- Configuração personalizada de tempo (por padrão, 25 minutos)
- Controles intuitivos para ajustar, iniciar, pausar e parar o temporizador
- Sistema de pausa automática de 5 minutos após cada sessão de trabalho

### Gerenciamento de Tarefas
- Criação de novas tarefas com nome, descrição e data limite
- Organização automática das tarefas por prazo:
  - Tarefas expiradas
  - Próximos 6 dias
  - Próximos 30 dias
  - Mais de 30 dias
- Marcação de tarefas como concluídas
- Exclusão de tarefas

### Interface
- Design responsivo e intuitivo
- Código de cores para identificação rápida de prazos
- Feedbacks visuais para interações do usuário

## Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (Vanilla)

- **Armazenamento de Dados:**
  - LocalStorage (armazenamento no navegador)

## Estrutura do Projeto

```
tasks/
├── css/
│   ├── alarme.css         # Estilização do temporizador/alarme
│   ├── footer.css         # Estilização do rodapé
│   ├── header.css         # Estilização do cabeçalho
│   ├── main.css           # Estilização principal
│   ├── newtask.css        # Estilização do formulário de nova tarefa
│   ├── pausa.css          # Estilização do modo de pausa
│   ├── style.css          # Estilização global
│   ├── taskdeadline.css   # Estilização dos containers de prazos
│   └── taskdisplay.css    # Estilização da exibição das tarefas
├── js/
│   ├── alarm.js           # Lógica do temporizador/alarme
│   ├── newtask.js         # Lógica de criação de novas tarefas
│   ├── pausa.js           # Lógica do sistema de pausa
│   ├── taskdisplay.js     # Lógica de exibição das tarefas
│   └── taskstorage.js     # Lógica de armazenamento das tarefas
└── index.html             # Arquivo principal HTML
```

## Como Usar

1. Clone este repositório para sua máquina local:
   ```
   git clone https://github.com/seu-usuario/tasks.git
   ```

2. Abra o arquivo `index.html` em seu navegador preferido.

3. Para criar uma nova tarefa:
   - Clique no botão "Nova Task"
   - Preencha o nome, descrição e data limite
   - Clique em "Salvar Task"

4. Para usar o temporizador:
   - Ajuste o tempo desejado usando as setas
   - Clique em "Ativar Alarme" para iniciar
   - Use "Pausar" para alternar para o modo de pausa de 5 minutos

5. Para gerenciar tarefas:
   - Clique em uma tarefa para marcá-la como concluída
   - Clique no ícone de lixeira para excluir uma tarefa

## Desenvolvedores

- **Erick Lima**
  - [LinkedIn](https://www.linkedin.com/in/erick-lima-0ab586283/)
  - [GitHub](https://github.com/ericklimagg)

- **Felipe**
  - [LinkedIn](https://linkedin.com/in/parceiro)
  - [GitHub](https://github.com/lipino2005)

## Considerações Finais

Este projeto foi desenvolvido como parte de um trabalho acadêmico para demonstrar conhecimentos em desenvolvimento web front-end, utilizando HTML, CSS e JavaScript. O sistema utiliza armazenamento local (localStorage) para persistência de dados, sem necessidade de banco de dados ou backend.
