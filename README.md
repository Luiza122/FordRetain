# FordRetain

## Objetivo
Plataforma acadêmica de retenção preditiva para concessionárias Ford, com foco em reduzir evasão de clientes no pós-venda e elevar o VIN Share.

## Problema resolvido
Após o fim da garantia, parte dos clientes deixa a rede oficial para oficinas independentes, reduzindo receita, recorrência e vínculo com a marca.

## O que é VIN Share
VIN Share é a participação da concessionária nas manutenções possíveis da sua base de veículos (por VIN). Quanto maior o VIN Share, maior retenção, receita de serviços e fidelização.

## Etapas do sistema
1. Clustering de perfis (Fiel, Econômico, Esquecido, em Risco).
2. Classificação de risco de evasão.
3. Recomendações de retenção personalizadas.

## Tecnologias utilizadas
- React Native
- Expo
- React Navigation
- JavaScript

## Estrutura de pastas
```text
FordRetain/
├── App.js
├── app.json
├── src/
│   ├── components/
│   ├── data/
│   ├── navigation/
│   ├── screens/
│   ├── styles/
│   └── utils/
└── assets/
```

## Funcionalidades
- Login mockado e cadastro funcional.
- Home explicativa do problema e valor de negócio.
- Dashboard com indicadores e resumo executivo.
- Clientes priorizados por risco de evasão.
- Detalhes completos e ações simuladas.
- Recomendações com campanhas executáveis (simulação).
- Classificação acadêmica com resultado de perfil/risco.
- Clustering com 4 perfis e estratégias.

## Login de teste
- E-mail: `gerente@fordretain.com`
- Senha: `123456`

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
- Clientes
- Detalhes do Cliente
- Recomendações
- Classificação (Prediction)
- Clustering (Profiles)

## Autores
Fernanda Rocha Menon- RM554673
Luiza Macena Dantas-RM556237
Luan Ramos Garcia de Souza – RM 558537
Matheus Ricciotti – RM 556930
Matheus Bortolotto – RM 555189
