# Bella Napoli ERP - Sistema Administrativo para Pizzaria

Sistema ERP moderno, limpo e profissional desenvolvido especificamente para gestão operacional de pizzarias e fornerias, integrando pedidos em tempo real, monitoramento de mesas com Three.js, controle de estoque crítico, reservas de espaços e automação de impressão de comandas térmicas.

## Tecnologias Utilizadas
- **React 18** + **Vite 5**
- **Tailwind CSS v3** com paleta especializada ERP (Verde primário `#15803d`, neutros slate `#0f172a`, alertas âmbar `#d97706`)
- **Lucide React** para iconografia técnica consistente
- **Three.js** para visualização procedural interativa 3D de ocupação do salão e mesas
- **Suporte nativo a impressão térmica 80mm** via CSS `@media print`

## Como Executar

No diretório do projeto:

```powershell
npm.cmd run dev
```

Acesse no navegador: `http://localhost:3000`

Para gerar build de produção:
```powershell
npm.cmd run build
```

## Módulos Implementados na Sidebar
1. **Dashboard**: Centro de controle operacional com 6 KPIs compactos, mapa 3D de mesas, curva horária de faturamento, painel de alertas com ação direta, tabela de pedidos recentes e tabela de reservas.
2. **Pedidos**: Visualização e controle de status (Preparo, Forno, Rota, Pronto, Entregue).
3. **Reservas**: Agendamento de mesas e eventos especiais.
4. **Mesas**: Controle de comandas e consumo do salão.
5. **Entregas**: Despacho e tempo de rota de pedidos.
6. **Entregadores**: Escala e monitoramento dos motoboys.
7. **Produtos**: Cardápio, bordas, adicionais e bebidas.
8. **Estoque**: Gestão de insumos críticos (farinha caputo, mussarela, embalagens).
9. **Lista de compras**: Geração rápida de pedidos para reposição de fornecedores.
10. **Clientes**: CRM com histórico e recorrência.
11. **WhatsApp IA**: Transcrição e atendimento de pedidos automáticos via IA.
12. **Financeiro**: DRE, faturamento diário, CMV de insumos e margem líquida.
13. **Relatórios**: Curva ABC e fechamento do turno.
14. **Configurações**: Impressoras ESC/POS 80mm, taxas e horários.
