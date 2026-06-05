import { api } from "@/lib/axios";
import { Pedido } from "@/types/pedido";

export async function listarPedidos() {
    const resposta = await api.get<Pedido[]>('/pedidos')
    return resposta.data
}