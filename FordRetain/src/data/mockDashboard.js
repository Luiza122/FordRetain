const mockDashboard = {
  vinShareGeral: '71.4%',
  clientesMonitorados: 1240,
  clientesAltoRisco: 186,
  agendamentosRecomendados: 94,
  vinSharePorRegiao: [
    { regiao: 'Sudeste', valor: '74%' },
    { regiao: 'Sul', valor: '72%' },
    { regiao: 'Centro-Oeste', valor: '70%' },
    { regiao: 'Nordeste', valor: '66%' },
    { regiao: 'Norte', valor: '64%' },
  ],
  vinSharePorModelo: [
    { modelo: 'Ranger', valor: '79%' },
    { modelo: 'Territory', valor: '73%' },
    { modelo: 'Maverick', valor: '69%' },
    { modelo: 'Ka', valor: '61%' },
  ],
  alertas: [
    'Sudeste concentra maior volume absoluto de clientes em alto risco.',
    'Modelo Ka apresentou queda de 4 p.p. no VIN Share em 60 dias.',
    'Clientes com financiamento longo têm maior propensão ao perfil econômico.',
  ],
};

export default mockDashboard;
