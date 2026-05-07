export function predictCustomerProfile(formData = {}) {
  const {
    formaPagamento,
    jaClienteFord,
    promocaoAtiva,
    prazoFinanciamentoMeses,
    idade,
    possuiHistoricoCompras,
    baixaFrequenciaRegional,
    baixaFrequenciaComportamental,
  } = formData;

  // Regra 1: pagamento à vista + já cliente Ford indica maior chance de perfil Fiel.
  if (formaPagamento === 'a_vista' && jaClienteFord === true) {
    return {
      perfil: 'Fiel',
      probabilidade: 0.9,
      acaoRecomendada: 'Oferecer upgrade de linha com benefícios de fidelidade.',
      explicacao: 'Cliente recorrente com pagamento à vista demonstra alta confiança e poder de decisão.',
    };
  }

  // Regra 2: interesse em promoção ou financiamento longo tende ao perfil Econômico.
  if (promocaoAtiva === true || Number(prazoFinanciamentoMeses) >= 48) {
    return {
      perfil: 'Econômico',
      probabilidade: 0.78,
      acaoRecomendada: 'Priorizar proposta com custo-benefício e condições competitivas.',
      explicacao: 'Sensibilidade a preço e parcelamento estendido sugere foco em economia.',
    };
  }

  // Regra 3: cliente jovem e sem histórico aponta risco de perfil Abandono.
  if (Number(idade) <= 25 && possuiHistoricoCompras === false) {
    return {
      perfil: 'Abandono',
      probabilidade: 0.72,
      acaoRecomendada: 'Executar fluxo de nutrição com contato rápido e ofertas de entrada.',
      explicacao: 'Faixa etária jovem sem vínculo prévio pode indicar baixa permanência no funil.',
    };
  }

  // Regra 4: baixa frequência regional ou comportamental sugere perfil Esquecido.
  if (baixaFrequenciaRegional === true || baixaFrequenciaComportamental === true) {
    return {
      perfil: 'Esquecido',
      probabilidade: 0.69,
      acaoRecomendada: 'Disparar campanha de reativação com lembretes e incentivo de retorno.',
      explicacao: 'Sinais de pouca recorrência sugerem perda de lembrança e engajamento.',
    };
  }

  // Fallback padrão: cenário não mapeado pelas regras principais.
  return {
    perfil: 'Neutro',
    probabilidade: 0.5,
    acaoRecomendada: 'Manter acompanhamento consultivo para coletar mais sinais de perfil.',
    explicacao: 'Os dados atuais não ativaram regras específicas de classificação.',
  };
}
