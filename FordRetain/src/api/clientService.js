/**
 * Serviço de consumo da API FordRetain.
 * Esses métodos encapsulam as chamadas HTTP e simplificam o uso nas telas.
 */
const API_BASE_URL = 'http://localhost:3001';

/**
 * Obtém métricas agregadas de VIN Share da API.
 * @returns {Promise<Object>} dados de métricas
 */
export async function getDashboard() {
  const response = await fetch(`${API_BASE_URL}/dashboard`);
  if (!response.ok) {
    throw new Error('Falha ao obter métricas');
  }
  return response.json();
}

/**
 * Lista clientes em risco ordenados por probabilidade.
 * @returns {Promise<Array>} lista de leads
 */
export async function getLeads() {
  const response = await fetch(`${API_BASE_URL}/leads`);
  if (!response.ok) {
    throw new Error('Falha ao obter lista de clientes');
  }
  return response.json();
}

/**
 * Envia os dados de um cliente para predição e retorna o perfil e probabilidade.
 * @param {Object} data dados do cliente (idade, região, etc.)
 * @returns {Promise<Object>} resultado da predição
 */
export async function predictProfile(data) {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer: data }),
  });
  if (!response.ok) {
    throw new Error('Falha ao obter predição');
  }
  return response.json();
}