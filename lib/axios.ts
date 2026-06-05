import axios from 'axios'

/**
 * Instância do axios onde podem ser configuradas várias opções que serão utilizadas
 * em todas as requisições efetuadas por essa instância.
 */
export const api = axios.create({
  timeout: 1000 * 30, // 30 segundos
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})


