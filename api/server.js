const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all origins. In production, restrict as needed.
app.use(cors());
app.use(express.json());

// Dummy leads data. In a real application, this would come from a database
// and would be sorted by probability of churn.
const leads = [
  {
    id: 1,
    name: 'João Silva',
    profile: 'Economico',
    probability: 0.75,
    suggestion: 'Enviar cupom de desconto',
  },
  {
    id: 2,
    name: 'Maria Souza',
    profile: 'Esquecido',
    probability: 0.65,
    suggestion: 'Enviar lembrete de revisão',
  },
  {
    id: 3,
    name: 'Carlos Santos',
    profile: 'Abandono',
    probability: 0.8,
    suggestion: 'Oferecer pacote de revisões',
  },
  {
    id: 4,
    name: 'Ana Paula',
    profile: 'Fiel',
    probability: 0.95,
    suggestion: 'Agradecer fidelidade',
  },
];

// Endpoint to return aggregated VIN Share metrics. These values are mocked
// for demonstration purposes. A real implementation would calculate metrics
// from historical service data.
app.get('/dashboard', (req, res) => {
  const metrics = {
    overallVinShare: 0.42,
    vinShareByRegion: {
      Sudeste: 0.45,
      Sul: 0.4,
      Nordeste: 0.38,
    },
    vinShareByModel: {
      Ka: 0.5,
      EcoSport: 0.35,
      Ranger: 0.55,
    },
  };
  res.json(metrics);
});

// Endpoint that returns a list of customers at risk of churn (leads)
app.get('/leads', (req, res) => {
  // In a real application, this list would be sorted by probability
  // and filtered by dealership or region.
  res.json(leads);
});

// Endpoint to predict a customer’s profile. For now, this returns a
// dummy prediction; a real implementation would invoke a ML model.
app.post('/predict', (req, res) => {
  // In a real scenario, validate input and call the model
  const { customer } = req.body;
  // Simple rule-based dummy response
  const prediction = {
    profile: 'Economico',
    probability: 0.7,
  };
  res.json(prediction);
});

// Start the server on the configured port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});