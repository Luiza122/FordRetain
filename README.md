# FordRetain

O **FordRetain** é um app mobile em React Native/Expo para retenção preditiva em concessionárias Ford. O foco é apoiar o gerente no acompanhamento de **VIN Share**, identificação de clientes com risco de evasão no pós-venda e definição de ações recomendadas.

## Como rodar
```bash
cd FordRetain
npm install
npx expo start
```

## Login de teste
- E-mail: `gerente@fordretain.com`
- Senha: `123456`

## Telas do app
- LoginScreen
- DashboardScreen
- RiskClientsScreen
- ClientDetailsScreen
- PredictionScreen
- ProfilesScreen
- SecurityScreen
- AboutScreen

Fluxo: **Login → Dashboard → demais telas via Menu FordRetain**.

## Estrutura de pastas
```text
src/
  components/
    MetricCard.js
    ClientCard.js
    ProfileBadge.js
    PrimaryButton.js
  data/
    mockClients.js
    mockDashboard.js
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
A tela de predição usa `src/utils/predictionRules.js` e retorna:
- perfil
- probabilidade
- ação recomendada
- explicação da regra

Regras:
- Cliente já recorrente Ford + compra em concessionária ⇒ maior chance de **Cliente Fiel**.
- Compra por promoção ou financiamento longo ⇒ **Cliente Econômico**.
- Primeiro Ford com histórico baixo ⇒ **Cliente de Abandono**.
- Indícios de baixa frequência/esquecimento ⇒ **Cliente Esquecido**.

## IA/ML real (evolução)
Evolução proposta:
1. Instrumentação de eventos e outcomes de retenção.
2. Treino supervisionado com validação temporal.
3. Serviço de inferência (API) e monitoramento de drift.
4. Recomendação de próxima melhor ação por segmento.

## Prevenção de data leakage
- Split temporal de treino/validação/teste.
- Exclusão de variáveis que só surgem após churn.
- Janela fixa de observação de features.
- Mesmo pipeline de transformação entre treino e produção.

## Tecnologias usadas
- React Native
- Expo
- React Navigation
- JavaScript (ES6)

## Observação de arquitetura
O app funciona com **dados mockados locais** no fluxo principal (offline). API/Firebase são opcionais e não são exigidos para navegar e validar as telas principais.
