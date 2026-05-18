import mockClients from '../data/mockClients';

const delay = (ms = 650) => new Promise((resolve) => setTimeout(resolve, ms));

function getRiskLevel(risco) {
  if (risco >= 75) return 'Alto';
  if (risco >= 50) return 'Médio';
  return 'Baixo';
}

function countByField(items, field) {
  return items.reduce((acc, item) => {
    const key = item[field] || 'Não informado';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function getRecommendationByProfile(perfil) {
  const actions = {
    'Cliente Fiel': 'Programa de fidelidade com benefícios e revisão premium.',
    'Cliente Econômico': 'Cupom de revisão, combo promocional e parcelamento sem juros.',
    'Cliente Esquecido': 'Lembrete automático com link de agendamento rápido.',
    'Cliente de Abandono': 'Contato consultivo imediato com pacote de recuperação.',
    'Cliente em Risco': 'Contato consultivo imediato com pacote de recuperação.',
  };

  return actions[perfil] || 'Contato preventivo do consultor de pós-venda.';
}

export async function getDashboard() {
  await delay();

  const total = mockClients.length;
  const riscoMedio = mockClients.reduce((acc, client) => acc + client.riscoEvasao, 0) / total;
  const vinShareEstimado = 100 - riscoMedio * 0.65;
  const highRisk = mockClients.filter((client) => client.riscoEvasao >= 75).length;
  const mediumRisk = mockClients.filter((client) => client.riscoEvasao >= 50 && client.riscoEvasao < 75).length;
  const lowRisk = mockClients.filter((client) => client.riscoEvasao < 50).length;
  const garantiaVencida = mockClients.filter((client) => client.garantiaStatus === 'Vencida').length;

  return {
    total,
    highRisk,
    mediumRisk,
    lowRisk,
    riscoMedio: Number(riscoMedio.toFixed(1)),
    vinShareEstimado: Number(vinShareEstimado.toFixed(1)),
    garantiaVencida,
    campanhasRecomendadas: 4,
    riscoPorNivel: [
      { label: 'Alto', value: highRisk },
      { label: 'Médio', value: mediumRisk },
      { label: 'Baixo', value: lowRisk },
    ],
    vinSharePorRegiao: Object.entries(countByField(mockClients, 'regiao')).map(([label, quantity]) => ({
      label,
      value: Number((82 - quantity * 4.5).toFixed(1)),
    })),
    clientesPorPerfil: Object.entries(countByField(mockClients, 'perfil')).map(([label, value]) => ({ label, value })),
  };
}

export async function getLeads() {
  await delay();

  return [...mockClients]
    .sort((a, b) => b.riscoEvasao - a.riscoEvasao)
    .map((client) => ({
      ...client,
      nivelRisco: getRiskLevel(client.riscoEvasao),
      prioridade: client.riscoEvasao >= 75 ? 'Contato em até 24h' : client.riscoEvasao >= 50 ? 'Acompanhar esta semana' : 'Manter relacionamento',
    }));
}

export async function predictClientProfile(purchaseData) {
  await delay();

  const idade = Number(purchaseData.idade || 0);
  let score = 35;

  if (purchaseData.historicoMarca === 'Primeiro Ford') score += 18;
  if (purchaseData.historicoMarca === 'Já teve Ford') score += 8;
  if (purchaseData.historicoMarca === 'Cliente fidelizado') score -= 18;

  if (purchaseData.formaPagamento === 'Financiamento') score += 12;
  if (purchaseData.formaPagamento === 'Consórcio') score += 8;
  if (purchaseData.formaPagamento === 'À vista') score -= 8;

  if (purchaseData.canalCompra === 'Online') score += 10;
  if (purchaseData.canalCompra === 'Marketplace parceiro') score += 15;
  if (purchaseData.canalCompra === 'Concessionária') score -= 4;

  if (['Ford Ka', 'Ford Fiesta', 'Ford Focus', 'Ford EcoSport'].includes(purchaseData.modelo)) score += 8;
  if (['Ford Ranger', 'Ford Maverick', 'Ford Territory', 'Ford Bronco Sport'].includes(purchaseData.modelo)) score -= 4;

  if (['Norte', 'Nordeste', 'Centro-Oeste'].includes(purchaseData.regiao)) score += 6;
  if (idade < 30) score += 6;
  if (idade > 45) score -= 6;

  const probabilidade = Math.max(12, Math.min(94, Math.round(score)));

  let perfil = 'Cliente Fiel';
  if (probabilidade >= 76) perfil = 'Cliente de Abandono';
  else if (probabilidade >= 61) perfil = 'Cliente Econômico';
  else if (probabilidade >= 46) perfil = 'Cliente Esquecido';

  const risco = getRiskLevel(probabilidade);

  return {
    perfil,
    probabilidade,
    risco,
    acaoRecomendada: getRecommendationByProfile(perfil),
    explicacao:
      'Previsão acadêmica calculada somente com dados disponíveis no momento da compra, evitando data leakage.',
    variaveisUtilizadas: ['idade', 'regiao', 'modelo', 'formaPagamento', 'canalCompra', 'historicoMarca'],
  };
}

export async function getApiHealth() {
  await delay(300);
  return {
    status: 'online',
    endpoints: ['GET /dashboard', 'GET /leads', 'POST /predict'],
    message: 'API simulada localmente para demonstrar consumo assíncrono no app mobile.',
  };
}
