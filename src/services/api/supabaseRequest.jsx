import axiosInstance from "../axios";

/**
 * Função para chamadas genéricas ao Supabase com suporte a paginação.
 *
 * @param {string} table - Nome da tabela ou endpoint.
 * @param {string} method - Método HTTP (GET, POST, PATCH, DELETE).
 * @param {Object} [data] - Dados para POST ou PATCH (opcional).
 * @param {Object} [filters] - Filtros para query string (e.g., { id: "eq.1" }).
 * @param {number} [limit] - Número máximo de registros por página.
 * @param {number} [offset] - Quantidade de registros a pular (para paginação).
 * @returns {Promise<Object>} Resposta da API.
 */
const supabaseRequest = async ({
  table,
  method = '',
  data = null,
  filters = {},
  limit = 500000,
  offset = 0,
}) => {
  try {
    // Construção da query string a partir dos filtros
    const filterQuery = Object.entries(filters)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    // Adiciona suporte a paginação na query string
    const paginationQuery = `limit=${limit}&offset=${offset}`;
    const queryString = [filterQuery, paginationQuery].filter(Boolean).join('&');

    // Define a URL completa
    const url = queryString ? `${table}?${queryString}` : table;

    // Chama a API
    const response = await axiosInstance({
      method,
      url,
      headers: {
        'apikey': import.meta.env.VITE_SUPABASE_KEY, // Substitua por variáveis de ambiente
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      data,
    });

    return response.data;
  } catch (error) {
    console.error('Error in Supabase request:', error.response?.data || error.message);
    throw error;
  }
};

export default supabaseRequest;
