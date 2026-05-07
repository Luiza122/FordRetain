# FordRetain

Aplicativo mobile (Expo/React Native) para apoio à retenção de clientes, com foco em **sinalização precoce de risco de churn** e priorização de ações de relacionamento.

## 1) Visão do FordRetain

O FordRetain organiza um fluxo simples para times de negócio:

- autenticar operador;
- visualizar clientes e indicadores principais;
- classificar risco de evasão com regras de predição transparentes;
- apoiar decisão de contato/ação de retenção.

O objetivo é reduzir churn com uma experiência rápida, rastreável e preparada para evolução gradual para IA/ML real.

## 2) Problema de negócio

Empresas com carteira recorrente costumam sofrer com:

- perda de receita por cancelamentos evitáveis;
- reação tardia (ação só depois do cliente já estar perdido);
- pouca padronização na priorização de clientes de maior risco;
- dificuldade de explicar por que um cliente foi marcado como crítico.

O FordRetain resolve isso com uma camada operacional que funciona no dia a dia, começando por regras claras e evoluindo para modelos preditivos mais robustos.

## 3) Execução local

Pré-requisitos:

- Node.js 18+;
- npm 9+ (ou compatível);
- Expo CLI via `npx`.

Passo a passo (app mobile):

```bash
cd FordRetain
npm install
npx expo start
```

Depois de iniciar o Metro Bundler, abra no:

- Expo Go (Android/iOS) via QR code;
- emulador Android/iOS;
- navegador (tecla `w`) para versão web.

## 4) Login de teste

Para validação rápida da experiência, use credenciais de demonstração (mock):

- **Usuário:** `teste@fordretain.local`
- **Senha:** `123456`

> Observação: caso a tela de login esteja parametrizada com outro mock local, mantenha o fluxo offline padrão e ajuste apenas os dados de demonstração no código.

## 5) Funcionamento offline (fluxo principal)

O aplicativo foi desenhado para funcionar **offline com dados mockados** como fluxo principal de desenvolvimento e demonstração.

- Não depende de API externa para executar as telas principais.
- Não depende de Firebase para autenticação/persistência no fluxo base.
- API própria e Firebase são **opcionais** e entram apenas como extensões de ambiente (integração futura ou cenários específicos).

Isso permite:

- previsibilidade em demos;
- menor acoplamento com infraestrutura externa;
- desenvolvimento iterativo sem bloqueio por backend.

## 6) Estrutura de pastas (visão prática)

Estrutura atual observável no repositório:

```text
.
├─ FordRetain/          # App Expo (mobile/web)
│  ├─ App.js            # Composição principal de telas/fluxo
│  ├─ index.js          # Entry point React Native
│  ├─ app.json          # Configuração Expo
│  └─ package.json      # Dependências e scripts do app
├─ api/                 # Backend opcional (fora do fluxo principal offline)
│  ├─ server.js
│  └─ package.json
└─ README.md
```

## 7) Telas do aplicativo (alto nível)

Fluxo funcional esperado:

1. **Login**
   - entrada de credenciais de teste;
   - validação local/mock;
2. **Dashboard/Lista de clientes**
   - visão consolidada de carteira;
   - destaque para clientes com maior risco;
3. **Detalhe do cliente**
   - sinais de risco e score;
   - recomendação de ação de retenção;
4. **(Opcional) Captura/apoio operacional**
   - recursos de dispositivo (ex.: câmera) quando aplicável ao processo.

## 8) Regras de predição (baseline explicável)

Enquanto não houver modelo de ML em produção, a predição pode seguir um score por regras (heurística), por exemplo:

- +30 pontos se atraso de pagamento > 30 dias;
- +20 pontos se queda de uso/consumo no último período;
- +20 pontos se múltiplas reclamações recentes;
- +15 pontos se NPS muito baixo;
- +15 pontos se sem interação positiva recente.

Classificação sugerida:

- **0–29:** baixo risco;
- **30–59:** médio risco;
- **60–100:** alto risco.

Vantagens dessa abordagem:

- explicabilidade imediata para negócio;
- implantação rápida;
- boa base para gerar dataset supervisionado futuro.

## 9) Prevenção de data leakage

Para evitar leakage (vazamento de informação futura no treino/inferência), adotar as regras abaixo desde já:

- separar dados de treino/validação/teste por tempo (time-based split);
- não usar variáveis que só existem após o evento de churn;
- congelar janelas de observação (ex.: features até D-30);
- versionar features e datasets;
- aplicar exatamente o mesmo pipeline de transformação em treino e produção;
- monitorar drift e revisar periodicamente sinais que possam carregar informação indevida.

## 10) Roadmap IA/ML real

Evolução recomendada em fases:

1. **Fase 0 — Operação offline com mock (atual)**
   - fluxo completo de telas;
   - regras heurísticas explicáveis;
2. **Fase 1 — Instrumentação de dados**
   - eventos de uso e outcomes de retenção;
   - dicionário de dados e qualidade;
3. **Fase 2 — Modelo baseline supervisionado**
   - regressão logística/árvore com validação temporal;
   - métricas: AUC, recall em alto risco, lift por decil;
4. **Fase 3 — MLOps mínimo**
   - pipeline de treino reprodutível;
   - registro de modelos e versionamento;
   - deploy de inferência (batch ou API);
5. **Fase 4 — Otimização de decisão**
   - recomendação de próxima melhor ação (NBA);
   - teste A/B de estratégias de retenção;
   - medição de ROI por segmento.

## 11) Integrações opcionais (fora do fluxo principal)

- **API (`/api`)**: pode centralizar regras, persistência e integrações.
- **Firebase**: pode ser usado para auth, banco e analytics.

Ambas são opcionais e não devem bloquear execução local do app no modo padrão offline.

---

Se quiser, a próxima etapa pode ser transformar as regras de predição em um módulo isolado (com testes) para facilitar futura substituição por modelo de ML.
