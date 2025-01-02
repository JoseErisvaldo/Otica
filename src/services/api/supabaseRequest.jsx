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
  orderBy = null, // Coluna de ordenação, opcional
  ascending = true, // Direção da ordenação, por padrão é ascendente
  functionName = null, // Nome da função para chamadas RPC
}) => {
  try {
    // Construção da query string a partir dos filtros
    const filterQuery = Object.entries(filters)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    // Adiciona suporte a paginação e ordenação se não for uma chamada RPC
    const paginationQuery = table !== "rpc" ? `limit=${limit}&offset=${offset}` : '';
    const orderQuery =
      table !== "rpc" && orderBy
        ? `&order=${orderBy}.${ascending ? 'asc' : 'desc'}`
        : '';

    const queryString = [filterQuery, paginationQuery, orderQuery]
      .filter(Boolean)
      .join('&');

    // Define a URL completa
    const url = table === "rpc"
      ? `rpc/${functionName}`
      : queryString
      ? `${table}?${queryString}`
      : table;

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
