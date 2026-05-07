export function predictCustomerProfile(formData) {
  const { idade, regiao, formaPagamento, canalCompra, historicoMarca } = formData;

  if (historicoMarca === 'Já era cliente Ford' && canalCompra === 'Concessionária') {
    return {
      perfil: 'Cliente Fiel',
      probabilidade: 86,
      acaoRecomendada: 'Oferecer pacote premium anual com benefícios exclusivos de conveniência.',
      explicacao: 'Histórico anterior com Ford e compra em concessionária indicam forte vínculo com a rede oficial.',
    };
  }

  if (canalCompra === 'Promoção' || formaPagamento === 'Financiamento longo') {
    return {
      perfil: 'Cliente Econômico',
      probabilidade: 78,
      acaoRecomendada: 'Enviar pacote de revisão com desconto progressivo e parcelamento facilitado.',
      explicacao: 'Comportamento orientado a preço e prazo financeiro estendido aumenta sensibilidade a custo.',
    };
  }

  if (historicoMarca === 'Primeiro Ford' && Number(idade || 0) <= 35) {
    return {
      perfil: 'Cliente de Abandono',
      probabilidade: 82,
      acaoRecomendada: 'Executar onboarding pós-venda com contato consultivo e benefício de primeira revisão.',
      explicacao: 'Primeiro contato com a marca e baixo histórico elevam o risco de evasão no ciclo inicial.',
    };
  }

  if (['Norte', 'Centro-Oeste'].includes(regiao) || historicoMarca === 'Baixa frequência') {
    return {
      perfil: 'Cliente Esquecido',
      probabilidade: 74,
      acaoRecomendada: 'Disparar lembretes automatizados e facilitar agendamento por canal digital.',
      explicacao: 'Sinais de esquecimento e baixa recorrência sugerem necessidade de estímulo ativo de retorno.',
    };
  }

  return {
    perfil: 'Cliente Econômico',
    probabilidade: 67,
    acaoRecomendada: 'Enviar proposta de manutenção preventiva com valor previsível.',
    explicacao: 'Cenário neutro sem sinais fortes de fidelidade, abandono ou esquecimento.',
  };
}
