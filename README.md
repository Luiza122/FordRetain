# FordRetain

## Objetivo
Plataforma acadêmica de retenção preditiva para concessionárias Ford, com foco em reduzir evasão de clientes no pós-venda e elevar o VIN Share.

## Problema resolvido
Após o fim da garantia, parte dos clientes deixa a rede oficial para oficinas independentes, reduzindo receita, recorrência e vínculo com a marca. O FordRetain ajuda o gerente da concessionária a identificar clientes com maior risco de evasão e agir antes que o cliente abandone a rede oficial.

## O que é VIN Share
VIN Share é a participação da concessionária nas manutenções possíveis da sua base de veículos, considerando cada VIN. Quanto maior o VIN Share, maior retenção, receita de serviços e fidelização.

## Etapas do sistema
1. **Clustering de perfis com a Base 1:** segmentação dos clientes em Cliente Fiel, Cliente Econômico, Cliente Esquecido e Cliente de Abandono.
2. **Classificação preditiva com a Base 2:** simulação de previsão do perfil usando apenas dados disponíveis no momento da compra.
3. **App mobile da concessionária:** dashboard, leads priorizados, detalhes do cliente, recomendações e simulação de campanhas.

## Regra crítica: sem data leakage
A classificação preditiva não usa dados pós-compra, como revisões feitas, gastos em serviços, frequência de visitas, garantia vencida ou tempo desde a última revisão.

Na tela de classificação são usados somente dados conhecidos no momento da compra:
- Idade
- Região
- Modelo do veículo
- Forma de pagamento
- Canal de compra
- Histórico com a marca

## Tecnologias utilizadas
- React Native
- Expo
- Expo Router
- JavaScript
- Hooks: `useState`, `useEffect` e `useMemo`
- API simulada local com Promises e carregamento assíncrono
- Controle de acesso por perfil de usuário

## Estrutura de pastas
```text
FordRetain/
├── app/
│   ├── _layout.js
│   ├── index.js
│   ├── home.js
│   ├── dashboard.js
│   ├── clients.js
│   ├── client-details.js
│   ├── prediction.js
│   ├── profiles.js
│   └── recommendations.js
├── app.json
├── package.json
├── src/
│   ├── components/
│   │   └── RoleGuard.js
│   ├── data/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   │   └── api.js
│   └── styles/
└── assets/
```

## Funcionalidades
- Login por conta cadastrada no próprio app.
- Cadastro funcional de usuário com perfil Gerente ou Atendente.
- Navegação com Expo Router.
- Home personalizada conforme o perfil do usuário.
- Dashboard com indicadores, resumo executivo e gráficos visuais simples.
- Consumo assíncrono de dados por API simulada.
- Clientes priorizados por risco de evasão.
- Filtros de risco alto, médio e baixo.
- Detalhes completos do cliente e ações simuladas.
- Recomendações com campanhas executáveis.
- Classificação acadêmica via endpoint simulado `POST /predict`.
- Clustering com 4 perfis e estratégias.
- Simulação de diferencial mobile com alerta/campanha para clientes críticos.

## Diferença entre perfis

### Gerente
O perfil Gerente possui acesso completo às telas estratégicas:
- Dashboard Executivo;
- Classificação Preditiva;
- Clustering de Perfis;
- Clientes em risco;
- Detalhes dos clientes;
- Recomendações.

### Atendente
O perfil Atendente possui acesso operacional:
- Clientes em risco;
- Detalhes dos clientes;
- Registro de contato;
- Aplicação de recomendações;
- Recomendações de retenção.

O Atendente não acessa Dashboard Executivo, Classificação Preditiva nem Clustering, pois essas telas possuem informações estratégicas da gestão.

## Endpoints simulados
A integração com API foi simulada em `src/services/api.js`, demonstrando carregamento assíncrono com `Promise`:

- `GET /dashboard` — retorna métricas agregadas de VIN Share, risco e perfis.
- `GET /leads` — lista clientes em risco ordenados por prioridade.
- `POST /predict` — recebe dados de compra e retorna perfil previsto, probabilidade, nível de risco e ação recomendada.

## Acesso ao aplicativo
Não há login de teste fixo. Para acessar, crie uma conta na tela de cadastro e entre com o e-mail e senha cadastrados.

## Como instalar
```bash
cd FordRetain
npm install
```

## Como rodar
```bash
npx expo start -c
```

## Principais telas
- Login
- Cadastro
- Home
- Dashboard
- Clientes em risco
- Detalhes do Cliente
- Recomendações
- Classificação Preditiva
- Clustering de Perfis

## Checklist de aderência à Sprint
- [x] Aplicativo mobile em React Native com Expo.
- [x] Navegação intuitiva com Expo Router.
- [x] Interface clara e visual para apresentação.
- [x] Gerenciamento de estado com hooks.
- [x] Consumo assíncrono de dados por API simulada.
- [x] Dashboard com métricas de VIN Share e risco.
- [x] Lista de clientes priorizados.
- [x] Tela de detalhes com recomendação personalizada.
- [x] Classificação preditiva sem data leakage.
- [x] Clustering com quatro perfis esperados.
- [x] Controle de acesso por perfil.
- [x] README com instalação, execução, acesso e escopo.

## Como apresentar
O FordRetain é um app mobile de retenção preditiva para concessionárias Ford. Ele apoia o gerente na identificação de clientes com risco de evasão após a compra, mostra dashboards de VIN Share e recomenda ações personalizadas para aumentar a retenção. A classificação evita data leakage porque utiliza apenas informações disponíveis no momento da compra. O sistema também diferencia os perfis Gerente e Atendente, criando um fluxo estratégico para gestores e um fluxo operacional para atendimento.

## Autores
- Fernanda Rocha Menon — RM554673
- Luiza Macena Dantas — RM556237
- Luan Ramos Garcia de Souza — RM558537
- Matheus Ricciotti — RM556930
- Matheus Bortolotto — RM555189
