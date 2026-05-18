# FordRetain — Plataforma Mobile de Retenção Preditiva

## 1. Introdução

O FordRetain é uma solução mobile desenvolvida para o desafio da Ford na disciplina de Mobile Development and IoT. O objetivo do aplicativo é apoiar concessionárias na retenção de clientes após a compra do veículo, especialmente no período em que muitos consumidores deixam de realizar revisões e serviços na rede oficial.

A proposta está conectada ao indicador VIN Share, que representa a participação da concessionária nas manutenções realizadas pela base de veículos Ford. Quando clientes migram para oficinas independentes, o VIN Share cai, reduzindo receita de pós-venda, fidelização e relacionamento com a marca.

## 2. Problema de negócio

A Ford possui uma base relevante de veículos em circulação, mas parte dos clientes deixa de retornar à concessionária oficial após o período de garantia. Esse comportamento reduz a recorrência de serviços e dificulta ações preventivas por parte dos gerentes.

O FordRetain resolve esse problema ao identificar clientes com maior risco de evasão, priorizar leads para contato e sugerir ações personalizadas de retenção.

## 3. Solução proposta

O aplicativo foi estruturado em três etapas principais:

1. **Clustering de perfis:** segmentação comportamental dos clientes em quatro grupos: Cliente Fiel, Cliente Econômico, Cliente Esquecido e Cliente de Abandono.
2. **Classificação preditiva:** previsão do perfil de um novo cliente usando apenas dados disponíveis no momento da compra.
3. **Aplicativo mobile:** painel para o gerente visualizar indicadores, clientes em risco, detalhes do cliente e recomendações de ação.

## 4. Regra anti data leakage

A classificação preditiva do FordRetain evita data leakage. Isso significa que a previsão não utiliza dados que só existiriam após a compra, como revisões feitas, valor gasto em serviços, frequência de visitas, garantia vencida ou tempo desde a última revisão.

A tela de classificação usa somente dados conhecidos no momento da compra:

- idade;
- região;
- modelo do veículo;
- forma de pagamento;
- canal de compra;
- histórico com a marca.

Essa separação deixa o modelo mais coerente com a realidade, pois a concessionária conseguiria prever o perfil do cliente logo após a venda.

## 5. Funcionalidades implementadas

O aplicativo possui as seguintes telas e funcionalidades:

- Login mockado com credenciais de teste;
- Cadastro funcional de usuário;
- Home explicativa sobre o problema, VIN Share e funcionamento da solução;
- Dashboard executivo com indicadores e gráficos visuais simples;
- Consumo assíncrono de dados por API simulada;
- Lista de clientes priorizados por risco;
- Filtros de risco alto, médio e baixo;
- Tela de detalhes do cliente com perfil, probabilidade, risco e ação recomendada;
- Tela de classificação preditiva usando o endpoint simulado `POST /predict`;
- Tela de clustering com explicação dos quatro perfis;
- Tela de recomendações com campanhas para cada perfil;
- Simulação de campanha/alerta como diferencial mobile.

## 6. Integração com API

Para demonstrar domínio de consumo assíncrono, o projeto possui uma API simulada em `src/services/api.js`, com Promises e tempo de carregamento. Os endpoints simulados são:

- `GET /dashboard`: retorna métricas agregadas de VIN Share, risco e perfis;
- `GET /leads`: retorna clientes em risco ordenados por prioridade;
- `POST /predict`: recebe dados de compra e retorna perfil previsto, probabilidade, nível de risco e ação recomendada.

## 7. Tecnologias utilizadas

- React Native;
- Expo;
- Expo Router;
- JavaScript;
- Componentes funcionais;
- Hooks `useState`, `useEffect` e `useMemo`;
- Estilização com `StyleSheet`;
- API simulada com Promises.

## 8. Conclusão

O FordRetain entrega uma solução mobile coerente com o desafio da Ford, com foco em retenção, aumento de VIN Share e apoio à tomada de decisão do gerente da concessionária. O app demonstra navegação entre telas, componentes reutilizáveis, gerenciamento de estado, consumo assíncrono de dados e uma narrativa clara de negócio.

A principal contribuição da solução é transformar dados de clientes em ações práticas, permitindo que a concessionária atue preventivamente antes que o cliente abandone a rede oficial.