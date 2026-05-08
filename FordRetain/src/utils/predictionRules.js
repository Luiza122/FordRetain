export function predictCustomerProfile(formData) {
  const tempo = Number(formData.tempoUltimaRevisaoMeses || 0);
  const idadeVeiculo = Number(formData.idadeVeiculoAnos || 0);
  const distancia = Number(formData.distanciaConcessionariaKm || 0);
  const frequencia = Number(formData.frequenciaVisitasAno || 0);
  const garantiaVencida = formData.garantiaStatus === 'Vencida';

  let score = 0;
  if (tempo >= 9) score += 25;
  if (idadeVeiculo >= 6) score += 10;
  if (distancia >= 20) score += 15;
  if (frequencia <= 1) score += 20;
  if (garantiaVencida) score += 20;
  if (formData.perfilBase === 'Cliente Econômico') score += 10;

  const probabilidade = Math.min(95, Math.max(15, score));

  if (probabilidade >= 75) return { perfil: 'Cliente em Risco', probabilidade, nivelRisco: 'Alto', acaoRecomendada: 'Contato preventivo imediato com proposta personalizada.', explicacao: 'Sinais combinados de baixa recorrência, distância e pós-garantia elevam risco de evasão.' };
  if (probabilidade >= 50) return { perfil: 'Cliente Esquecido', probabilidade, nivelRisco: 'Médio', acaoRecomendada: 'Lembretes multicanais e facilidade de agendamento.', explicacao: 'Risco moderado por intervalo de revisão e baixa frequência, com potencial de recuperação.' };
  return { perfil: 'Cliente Fiel', probabilidade, nivelRisco: 'Baixo', acaoRecomendada: 'Manter relacionamento com benefícios de fidelização.', explicacao: 'Cliente com indícios de vínculo recorrente à rede autorizada.' };
}
