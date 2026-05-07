export function predictClientProfile(data) {
  const historico = (data.historicoMarca || '').toLowerCase();
  const canal = (data.canalCompra || '').toLowerCase();
  const pagamento = (data.formaPagamento || '').toLowerCase();

  if (historico.includes('já') && canal.includes('concession')) {
    return { perfil: 'Cliente Fiel', probabilidade: 82, acaoRecomendada: 'Oferecer plano premium e relacionamento VIP.', explicacao: 'Cliente recorrente Ford com compra na rede oficial tende a manter fidelidade.' };
  }
  if (pagamento.includes('promo') || pagamento.includes('financiamento longo')) {
    return { perfil: 'Cliente Econômico', probabilidade: 76, acaoRecomendada: 'Priorizar ofertas financeiras e pacotes de revisão com desconto.', explicacao: 'Sensibilidade a preço e condição de pagamento aumenta resposta a benefício financeiro.' };
  }
  if (historico.includes('primeiro')) {
    return { perfil: 'Cliente de Abandono', probabilidade: 84, acaoRecomendada: 'Realizar contato consultivo e reforçar valor da rede oficial.', explicacao: 'Primeiro relacionamento com a marca, sem histórico consolidado, eleva risco de evasão.' };
  }
  return { perfil: 'Cliente Esquecido', probabilidade: 68, acaoRecomendada: 'Agendar lembretes automáticos e follow-up ativo no pós-venda.', explicacao: 'Indícios de baixa frequência sugerem evasão por esquecimento, não por rejeição direta.' };
}
