const mockClients = [
  {
    id: 1,
    nome: 'Mariana Souza',
    modelo: 'Ford Ranger',
    ano: 2021,
    regiao: 'Sudeste',
    canalCompra: 'Concessionária',
    formaPagamento: 'Financiamento',
    historicoMarca: '3º Ford na família',
    perfil: 'Fiel',
    probabilidadeEvasao: 0.25,
    motivo: 'Busca por melhor taxa de financiamento',
    acaoRecomendada: 'Oferecer refinanciamento com taxa reduzida e bônus de revisão',
  },
  { id: 2, nome: 'Carlos Lima', modelo: 'Ford Ka', ano: 2019, regiao: 'Nordeste', canalCompra: 'Marketplace', formaPagamento: 'À vista', historicoMarca: 'Primeiro Ford', perfil: 'Econômico', probabilidadeEvasao: 0.82, motivo: 'Sensível ao custo de manutenção', acaoRecomendada: 'Enviar pacote econômico de manutenção com desconto progressivo' },
  { id: 3, nome: 'Fernanda Alves', modelo: 'Ford Territory', ano: 2023, regiao: 'Sul', canalCompra: 'Concessionária', formaPagamento: 'Assinatura', historicoMarca: 'Cliente de outra marca', perfil: 'Abandono', probabilidadeEvasao: 0.91, motivo: 'Insatisfação com tempo de atendimento', acaoRecomendada: 'Contato imediato com gerente e proposta de upgrade de atendimento premium' },
  { id: 4, nome: 'João Pedro Martins', modelo: 'Ford EcoSport', ano: 2018, regiao: 'Centro-Oeste', canalCompra: 'Seminovos', formaPagamento: 'Financiamento', historicoMarca: 'Segundo Ford', perfil: 'Esquecido', probabilidadeEvasao: 0.67, motivo: 'Baixo engajamento com pós-venda', acaoRecomendada: 'Campanha de reativação com check-up gratuito e lembrete de revisão' },
  { id: 5, nome: 'Priscila Nunes', modelo: 'Ford Maverick', ano: 2024, regiao: 'Sudeste', canalCompra: 'Site oficial', formaPagamento: 'Consórcio', historicoMarca: 'Primeiro Ford', perfil: 'Econômico', probabilidadeEvasao: 0.74, motivo: 'Comparação de preços com concorrentes', acaoRecomendada: 'Oferta personalizada de benefícios exclusivos FordPass' },
  { id: 6, nome: 'Ricardo Melo', modelo: 'Ford Fusion', ano: 2017, regiao: 'Sul', canalCompra: 'Concessionária', formaPagamento: 'À vista', historicoMarca: '4º Ford', perfil: 'Fiel', probabilidadeEvasao: 0.31, motivo: 'Interesse em migração para SUV premium', acaoRecomendada: 'Agendar test drive dirigido com condição especial de troca' },
  { id: 7, nome: 'Aline Castro', modelo: 'Ford Fiesta', ano: 2016, regiao: 'Norte', canalCompra: 'Seminovos', formaPagamento: 'Financiamento', historicoMarca: 'Cliente antiga Ford', perfil: 'Abandono', probabilidadeEvasao: 0.88, motivo: 'Percepção de alto custo de peças', acaoRecomendada: 'Conceder voucher de peças e plano de manutenção fidelidade' },
  { id: 8, nome: 'Eduardo Ramos', modelo: 'Ford Transit', ano: 2022, regiao: 'Nordeste', canalCompra: 'Frota corporativa', formaPagamento: 'Leasing', historicoMarca: 'Frota multimarcas', perfil: 'Esquecido', probabilidadeEvasao: 0.63, motivo: 'Falta de contato consultivo', acaoRecomendada: 'Executivo de contas dedicado com revisão trimestral de desempenho' },
  { id: 9, nome: 'Tatiane Rocha', modelo: 'Ford Bronco Sport', ano: 2023, regiao: 'Sudeste', canalCompra: 'Concessionária', formaPagamento: 'Financiamento', historicoMarca: 'Segundo Ford', perfil: 'Fiel', probabilidadeEvasao: 0.4, motivo: 'Desejo por mais benefícios digitais', acaoRecomendada: 'Habilitar pacote conectado e treinamento de recursos no app' },
  { id: 10, nome: 'Gustavo Pires', modelo: 'Ford Focus', ano: 2015, regiao: 'Centro-Oeste', canalCompra: 'Marketplace', formaPagamento: 'À vista', historicoMarca: 'Primeiro Ford', perfil: 'Abandono', probabilidadeEvasao: 0.95, motivo: 'Intenção declarada de trocar de marca', acaoRecomendada: 'Oferta agressiva de trade-in com bônus de permanência imediato' },
  { id: 11, nome: 'Luciana Freitas', modelo: 'Ford Ka Sedan', ano: 2020, regiao: 'Sul', canalCompra: 'Site oficial', formaPagamento: 'Financiamento', historicoMarca: 'Primeiro Ford', perfil: 'Econômico', probabilidadeEvasao: 0.71, motivo: 'Atraso em revisões e preocupação com custos', acaoRecomendada: 'Plano de revisão parcelado e lembretes automáticos de manutenção' },
];

export default mockClients;
