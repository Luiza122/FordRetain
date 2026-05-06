# FordRetain – Plataforma de Retenção Preditiva

## Introdução

O **VIN Share** é o indicador que mede a proporção de veículos Ford que continuam utilizando a rede oficial de concessionárias para revisões e serviços. Mantê‑lo elevado é essencial para a sustentabilidade financeira da marca e para a satisfação do cliente. O desafio proposto pela Ford para a disciplina de **Mobile Development & IoT** consiste em criar uma solução que contribua para impulsionar o VIN Share na América do Sul, identificando clientes com risco de evasão no pós‑venda e oferecendo ações preventivas personalizadas. A sprint exige o desenvolvimento de um **aplicativo móvel multiplataforma** (iOS e Android) em React Native, com interface clara, navegação intuitiva e integração via API a uma fonte de dados externa, demonstrando domínio de componentes React Native, gerenciamento de estado, navegação e consumo de APIs assíncronas.

## Código base fornecido

Como ponto de partida, foi disponibilizado um repositório chamado **Cp2‑MobileDev** contendo uma aplicação exemplo em React Native e material de apoio. O documento de aula apresenta a estrutura básica do app: telas de **Login**, **Cadastro**, **Recuperação de senha** e **Home** com navegação entre elas. O objetivo da aula é ensinar a organização de pastas, criação das telas e a navegação utilizando React Navigation【370585390863888†L0-L23】. O roteiro orienta a criação de um projeto Expo, instalação das bibliotecas de navegação e estruturação da pasta `src/` com `navigation/`, `screens/` e `components/`【370585390863888†L24-L54】. No passo 5 o arquivo `App.js` passa a importar um `AppNavigator` que configura as rotas e telas【370585390863888†L56-L90】. Em resumo, o código base oferece um esqueleto de autenticação simples sobre o qual se pode construir funcionalidades mais complexas.

## Adaptação para a plataforma FordRetain

O projeto **FordRetain** propõe uma solução preditiva em três etapas:

1. **Descoberta de perfis de clientes:** utiliza‑se a Base 1 (histórico completo de clientes, fornecida em dados sintéticos) para agrupar comportamentos com um algoritmo de clustering. O **K‑Means** é um método de agrupamento que divide as amostras em `n` grupos de igual variância, minimizando a soma interna de quadrados (inércia)【222964639166967†L303-L318】. O algoritmo exige que o número de clusters seja especificado, particionando o conjunto de dados em subconjuntos disjuntos descritos pela média (centroides)【222964639166967†L303-L314】. Aplicado ao histórico de revisões e gastos, o K‑Means pode revelar perfis naturais, como **Cliente Fiel**, **Cliente de Abandono**, **Cliente Esquecido** e **Cliente Econômico**, que servem como variável‑alvo para a etapa seguinte.

2. **Classificação de novos clientes:** com os perfis descobertos, treina‑se um modelo supervisionado usando apenas dados disponíveis no momento da compra (idade, região, modelo, forma de pagamento, histórico com a marca etc.) para prever o perfil de um novo cliente. Dois algoritmos são sugeridos:
   * **Random Forest:** trata‑se de um meta‑estimador que ajusta vários classificadores de árvores de decisão em subconjuntos aleatórios do conjunto de dados e usa a média para melhorar a precisão preditiva e controlar o overfitting【644392798792069†L693-L699】. É robusto, lida bem com variáveis categóricas e proporciona importância de atributos.
   * **XGBoost:** sigla de *Extreme Gradient Boosting*, uma implementação eficiente de árvores de decisão em gradiente. O algoritmo segue o framework de *gradient boosting* e combina diversos modelos fracos em um modelo forte; o nome deriva da técnica de *boosting* baseada no gradiente【237120248609080†L60-L69】. É conhecido pelo desempenho superior em competições de machine learning, mas exige mais cuidados de regularização e ajuste de hiperparâmetros.

   **Atenção ao *data leakage*:** na etapa de classificação é proibido utilizar qualquer informação que só esteja disponível após a compra, como o número de revisões realizadas, gastos ou indicadores pós‑venda. Incluir dados posteriores ao momento da previsão causaria vazamento de informação, inflando artificialmente as métricas de avaliação e tornando o modelo inaplicável na prática.

3. **Aplicativo na concessionária:** a partir do modelo treinado, desenvolve‑se um app que lista os clientes com maior risco de evasão, informando a probabilidade de cada perfil e sugerindo ações personalizadas (cupons de desconto para clientes econômicos, lembretes automáticos para esquecidos, pacotes promocionais para os que tendem ao abandono, etc.). O app também apresenta um **dashboard** com métricas de VIN Share por região e modelo. O código base do repositório pode ser adaptado para implementar essa interface; em vez de produtos, a tela **Home** pode listar clientes com indicadores de risco e ações recomendadas, enquanto a navegação e a autenticação aproveitam os componentes existentes.

### Avaliação e métricas

Para avaliar a qualidade do classificador, utilizam‑se métricas como **acurácia**, **precision**, **recall** e **F1‑score**. A pontuação F1, por exemplo, é a média harmônica de precision e recall e é preferível quando há desequilíbrio entre classes; matematicamente, é definida como \(\text{F1}=2\frac{\text{precision}\cdot\text{recall}}{\text{precision}+\text{recall}}\)【730145790625915†L433-L444】. Além disso, a matriz de confusão e a curva ROC ajudam a identificar se o modelo é útil para distinguir clientes fiéis de clientes com risco de evasão.

## Arquitetura proposta

1. **Dados e ML:**
   * **Base 1:** conjunto histórico com registros de revisões, valores e retornos dos clientes. Aplicar K‑Means (ou DBSCAN, se houver ruído significativo) para descobrir perfis de comportamento.
   * **Base 2:** dados disponíveis no momento da venda (demográficos, modelo do veículo, canal de compra). Treinar Random Forest ou XGBoost para prever o perfil. Aplicar validação cruzada, reportar métricas (acurácia, F1) e gerar a matriz de confusão.
   * **Persistência:** salvar o modelo treinado em formato serializado (Pickle ou joblib) para ser carregado pela API.

2. **API REST:**
   * Desenvolver um serviço em **Node.js (Express)** ou **Python Flask** com três endpoints:
     - `POST /predict`: recebe o JSON com dados de um cliente (idade, região, modelo etc.), carrega o modelo e retorna o perfil previsto com a probabilidade.
     - `GET /dashboard`: agrega dados no banco para calcular métricas de VIN Share por região, período e modelo, retornando no formato consumido pelo app.
     - `GET /leads`: lista clientes classificados com alto risco de evasão, ordenados por probabilidade, incluindo sugestão de ação.
   * Implementar autenticação e autorização (Token JWT) para proteger os endpoints e registrar logs de acesso.

3. **Aplicativo móvel:**
   * Usar **React Native com Expo**, aproveitando a estrutura do repositório fornecido. A navegação já está implementada com React Navigation【370585390863888†L56-L90】, bastando alterar as telas para refletir os requisitos do negócio.
   * Criar telas de **Dashboard** (gráficos de VIN Share) e **Clientes em risco** (lista com badges de cor indicando o perfil e a probabilidade). A tela de detalhes de cada cliente deve apresentar dados básicos e uma ação recomendada.
   * Consumir a API por meio de `fetch` ou `axios`, exibindo mensagens de erro amigáveis em caso de falhas.
   * Implementar notificações push usando Expo Notifications para alertar o gerente quando um cliente de alto risco for identificado.

4. **Segurança e privacidade:**
   * Armazenar dados sensíveis de clientes criptografados em repouso no banco de dados.
   * Anonimizar nomes e informações pessoais nos dashboards, exibindo apenas dados agregados.
   * Implementar **controle de acesso baseado em papéis (RBAC)**: gerentes podem ver todos os clientes da concessionária; atendentes veem apenas seus clientes. Registrar auditoria das consultas.

5. **Qualidade e testes:**
   * Elaborar **testes unitários** para funções de negócio e **testes de integração** para o API. No app, utilizar Jest e React Testing Library para validar componentes de UI.
   * Monitorar o impacto do sistema no VIN Share usando métricas de negócio: aumento de agendamentos, redução da evasão e melhora no NPS.

## Considerações finais

O projeto **FordRetain** integra várias disciplinas em uma solução prática e de alto impacto. A partir de um código base simples que já implementa autenticação e navegação, é possível evoluir para um aplicativo completo de retenção preditiva. A aplicação dos algoritmos de clustering (K‑Means) e classificação (Random Forest ou XGBoost) deve seguir boas práticas de ciência de dados, evitando *data leakage* e medindo o desempenho por métricas adequadas. A API REST serve de ponte entre o modelo preditivo e o aplicativo, enquanto preocupações com segurança e testes garantem confiabilidade. Com essa arquitetura, as concessionárias podem agir proativamente para manter seus clientes na rede oficial, aumentando o VIN Share e a rentabilidade do negócio.