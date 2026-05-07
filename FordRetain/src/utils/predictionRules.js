export function predictCustomerProfile(formData) {
  const { idade, regiao, formaPagamento, canalCompra, historicoMarca } = formData;

  // Regra 1: à vista + já era cliente Ford = tendência de fidelidade.
  if (formaPagamento === 'À vista' && historicoMarca === 'Já era cliente Ford') {
    return {
      perfil: 'Cliente Fiel',
      probabilidade: 84,
      acaoRecomendada: 'Convidar para programa premium de revisões e benefícios de fidelidade.',
      explicacao: 'Pagamento à vista com histórico positivo indica alto vínculo com a marca.',
    };
  }

  // Regra 2: promoção ou financiamento longo = sensível a preço.
  if (canalCompra === 'Promoção' || formaPagamento === 'Financiamento longo') {
    return {
      perfil: 'Cliente Econômico',
      probabilidade: 78,
      acaoRecomendada: 'Enviar pacote de revisão com desconto e condições facilitadas.',
      explicacao: 'Sinais de decisão orientada a preço e oportunidade comercial.',
    };
  }

  // Regra 3: cliente jovem sem histórico com a marca = risco de abandono.
  if (Number(idade) < 30 && historicoMarca === 'Primeiro Ford') {
    return {
      perfil: 'Cliente de Abandono',
      probabilidade: 81,
      acaoRecomendada: 'Criar jornada de onboarding pós-venda com contato consultivo em 30 dias.',
      explicacao: 'Perfil inicial com baixo vínculo histórico aumenta risco de evasão após a primeira revisão.',
    };
  }

  // Regra 4: regiões com menor frequência tendem ao perfil esquecido.
  if (['Norte', 'Centro-Oeste'].includes(regiao)) {
    return {
      perfil: 'Cliente Esquecido',
      probabilidade: 74,
      acaoRecomendada: 'Disparar lembretes inteligentes de revisão e facilitar agendamento digital.',
      explicacao: 'Padrões regionais de menor recorrência exigem estímulo ativo para retorno.',
    };
  }

  return {
    perfil: 'Cliente Econômico',
    probabilidade: 65,
    acaoRecomendada: 'Oferecer proposta de manutenção preventiva com valor previsível.',
    explicacao: 'Cenário intermediário sem sinais extremos de fidelidade ou abandono.',
  };
}
