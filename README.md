# FordRetain

## Objetivo
Plataforma de retenção preditiva para concessionárias Ford, com foco em reduzir evasão no pós-garantia e elevar VIN Share.

## Problema resolvido
Após o término da garantia, parte dos clientes migra para oficinas independentes, reduzindo receita de pós-venda e vínculo com a rede autorizada.

## O que é VIN Share
VIN Share representa a parcela dos serviços de manutenção de veículos Ford realizados na rede oficial.

## Etapas do sistema
1. Clustering de perfis (Fiel, Econômico, Esquecido, em Risco).
2. Classificação de risco de evasão por variáveis de comportamento e uso.
3. Recomendação de ações preventivas para retenção.

## Tecnologias
- React Native
- Expo
- React Navigation
- JavaScript

## Estrutura
- `FordRetain/src/screens`: telas do app
- `FordRetain/src/components`: componentes reutilizáveis
- `FordRetain/src/data`: dados mockados
- `FordRetain/src/utils`: regras de classificação

## Funcionalidades
- Login e cadastro com autenticação mockada dinâmica.
- Dashboard com indicadores calculados da base.
- Priorização de clientes por risco com filtros.
- Detalhes completos com fatores de risco e ação recomendada.
- Campanhas de retenção com execução simulada.
- Simulador de classificação de risco.
- Tela de clustering dos quatro perfis.

## Login de teste
- E-mail: `gerente@fordretain.com`
- Senha: `123456`

## Como instalar e rodar
```bash
cd FordRetain
npm install
npx expo start -c
```

## Principais telas
- Login
- Cadastro
- Home
- Dashboard
- Clients
- ClientDetails
- Recommendations
- Prediction
- Profiles

## Autores
- Luiza Macena Dantas - RM556237
