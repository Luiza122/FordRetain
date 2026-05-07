# FordRetain

Aplicativo mobile em React Native/Expo para retenção preditiva no pós-venda de concessionárias Ford.

## Objetivo
O FordRetain ajuda o gerente da concessionária a:
- acompanhar VIN Share;
- identificar clientes com maior risco de evasão;
- executar ações personalizadas de retenção.

## Como rodar
```bash
cd FordRetain
npm install
npx expo start
```

## Login de teste
- **E-mail:** `gerente@fordretain.com`
- **Senha:** `123456`

## Telas do app
1. LoginScreen
2. DashboardScreen
3. RiskClientsScreen
4. ClientDetailsScreen
5. PredictionScreen
6. ProfilesScreen
7. SecurityScreen
8. AboutScreen

## Estrutura principal
```text
FordRetain/
  App.js
  src/
    components/
      MetricCard.js
      ClientCard.js
      ProfileBadge.js
      PrimaryButton.js
    data/
      mockClients.js
      mockDashboard.js
      mockAuth.js
    navigation/
      AppNavigator.js
    screens/
      LoginScreen.js
      DashboardScreen.js
      RiskClientsScreen.js
      ClientDetailsScreen.js
      PredictionScreen.js
      ProfilesScreen.js
      SecurityScreen.js
      AboutScreen.js
    styles/
      colors.js
      globalStyles.js
    utils/
      predictionRules.js
```

## Predição mockada
A tela de predição usa `src/utils/predictionRules.js` com regras heurísticas:
- cliente Ford + compra em concessionária → maior chance de **Cliente Fiel**;
- promoção/financiamento longo → maior chance de **Cliente Econômico**;
- primeiro Ford + baixo vínculo inicial → maior chance de **Cliente de Abandono**;
- baixa frequência/esquecimento → maior chance de **Cliente Esquecido**.

Retorno da função:
- perfil;
- probabilidade;
- ação recomendada;
- explicação da regra.

## Evolução para IA/ML real
Em produção, as regras mockadas podem ser substituídas por API com modelo supervisionado treinado em histórico de revisões, recorrência e dados de relacionamento.

## Como evitamos data leakage
- separação temporal entre treino e validação;
- exclusão de variáveis que só existem após o evento de evasão;
- uso de features disponíveis apenas até o instante da decisão;
- auditoria de atributos e versionamento de datasets/modelos.

## Tecnologias
- React Native
- Expo
- React Navigation
- JavaScript (ES6)
