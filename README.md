# FORDRETAIN — Plataforma de Retenção Preditiva

O **FordRetain** é um app mobile desenvolvido em React Native + Expo para apoiar gerentes de concessionária na retenção de clientes de pós-venda Ford, com foco em aumento de **VIN Share**.

## Problema de negócio
Após o período de garantia, parte dos clientes deixa de fazer revisões na rede autorizada. Isso reduz o VIN Share e impacta receita de serviços. O FordRetain identifica clientes com risco de evasão e sugere ações personalizadas.

## Como rodar
```bash
cd FordRetain
npm install
npx expo start
```

## Login de teste
- E-mail: `gerente@fordretain.com`
- Senha: `123456`

## Estrutura principal
```text
src/
  data/
    mockAuth.js
    mockClients.js
    mockDashboard.js
  navigation/
    AppNavigator.js
  screens/
    LoginScreen.js
    DashboardScreen.js
    RiskClientsScreen.js
    LeadDetailsScreen.js
    PredictionScreen.js
    ProfilesScreen.js
    SecurityScreen.js
    AboutScreen.js
  components/
    MetricCard.js
    ClientCard.js
    ProfileBadge.js
    PrimaryButton.js
  styles/
    colors.js
    globalStyles.js
  utils/
    predictionRules.js
```

## Telas disponíveis
1. **Login** (mockado)
2. **Dashboard** com KPI de VIN Share e atalhos
3. **Clientes em Risco** ordenados por maior risco
4. **Detalhes do Cliente** com ação planejada
5. **Predição de Cliente** com regras simuladas
6. **Perfis de Comportamento**
7. **Segurança e Privacidade**
8. **Sobre o Projeto**

## Lógica de predição (mock)
Arquivo: `src/utils/predictionRules.js`.

Regras simples:
- À vista + já cliente Ford → maior chance de **Cliente Fiel**.
- Promoção ou financiamento longo → maior chance de **Cliente Econômico**.
- Cliente jovem sem histórico → maior chance de **Cliente de Abandono**.
- Regiões com menor frequência → maior chance de **Cliente Esquecido**.

Retorno da função:
```js
{
  perfil,
  probabilidade,
  acaoRecomendada,
  explicacao
}
```

## Como o projeto evita data leakage
- Usa dados mock locais para demonstração sem uso de dados reais de produção.
- Predição é declaradamente demonstrativa e baseada em sinais de entrada do momento da compra.
- Não há treino de modelo com variáveis futuras no app mobile.

## Evolução futura com IA/ML real
- API de classificação com modelo supervisionado versionado.
- Feature store e validação temporal.
- Monitoramento de drift e performance de retenção.

## Tecnologias
- React Native
- Expo
- JavaScript
- React Navigation
