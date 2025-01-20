# Gerenciamento de Tarefas - Front-End

## Descrição
Este projeto é a interface de um sistema de gerenciamento de tarefas desenvolvido com React e Styled Components. O objetivo é permitir que usuários autenticados criem, visualizem, editem, filtrem e excluam tarefas.

## Funcionalidades Principais
1. **Autenticação de Usuário:**
   - Página de login e cadastro com validação de credenciais.
   - Armazenamento seguro do token JWT no localStorage.

2. **Gerenciamento de Tarefas:**
   - Exibição de todas as tarefas em uma tabela.
   - Colunas incluem: Título, Descrição, Status, Prioridade, Data do Fim e Ações.

3. **Criação de Tarefas:**
   - Modal para adicionar novas tarefas com campos como título, descrição, status, prioridade e data do fim.

4. **Edição de Tarefas:**
   - Modal específico para editar tarefas existentes.

5. **Exclusão de Tarefas:**
   - Ação rápida para excluir uma tarefa.

6. **Filtros Avançados:**
   - Filtro por status: pendente, em progresso ou finalizada.
   - Filtro por prioridade: baixa, média ou alta.
   - Combinação de filtros aplicada dinamicamente à tabela.

7. **Feedback ao Usuário:**
   - Notificações visuais com a biblioteca `react-hot-toast` para sucesso ou erros nas ações.

## Tecnologias Utilizadas
- **React**: Biblioteca para construção da interface do usuário.
- **Styled Components**: Estilização baseada em componentes.
- **Phosphor Icons**: Ícones modernos e customizáveis.
- **React Hot Toast**: Biblioteca para notificações.
