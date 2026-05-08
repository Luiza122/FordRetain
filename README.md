# FordRetain

## Objetivo
O **FordRetain** é uma aplicação acadêmica para apoiar concessionárias Ford na retenção de clientes no pós-venda, com foco em redução de evasão após o período de garantia.

## Problema resolvido
Quando o cliente deixa de realizar revisões na rede oficial, o **VIN Share** da concessionária cai. O projeto estrutura uma abordagem preditiva para identificar risco de evasão e orientar ações preventivas antes da perda.

## Três etapas analíticas
1. **Clustering de perfis**
   - Identifica comportamentos naturais: **Cliente Fiel**, **Cliente em Risco**, **Cliente Esquecido** e **Cliente Econômico**.
2. **Classificação de risco**
   - Estima risco com variáveis como:
     - tempo desde a última revisão
     - idade do veículo
     - status da garantia
     - histórico de manutenção
     - frequência de visitas
     - valor gasto em serviços
     - distância da concessionária
     - perfil do cliente
3. **Ação de retenção**
   - Recomenda ações direcionadas, como cupom de revisão, contato preventivo, pacote de manutenção, campanha personalizada, lembrete de revisão e prioridade de atendimento.

## Tecnologias utilizadas
- React Native
- Expo
- React Navigation
- JavaScript (ES6+)

## Estrutura de pastas
```text
FordRetain/
├── App.js
├── src/
│   ├── components/
│   ├── data/
│   ├── navigation/
│   ├── screens/
│   ├── styles/
│   └── utils/
└── assets/
```

## Como instalar
1. Entre na pasta do app:
   ```bash
   cd FordRetain
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Como rodar
```bash
npx expo start -c
```

## Funcionalidades
- Tela inicial com contexto do problema e proposta do FordRetain.
- Dashboard com indicadores principais de retenção.
- Tela de clientes com risco ordenado e perfil comportamental.
- Tela de detalhes por cliente com variáveis de classificação.
- Tela de recomendações com campanhas de retenção.
- Tela de classificação demonstrativa para simulação de risco.
- Tela de clustering com descrição dos quatro perfis.

## Exemplos de uso
- Um gerente de pós-venda abre o dashboard para acompanhar volume de clientes em risco e garantia vencida.
- O consultor acessa a lista de clientes para priorizar contatos.
- Em detalhes do cliente, a equipe executa a ação recomendada conforme perfil.
- A liderança usa recomendações para estruturar campanhas de retenção mensais.

## Autores
- Luiza Macena Dantas - RM556237
