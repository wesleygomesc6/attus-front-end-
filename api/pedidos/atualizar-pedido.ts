import { api } from "@/lib/axios";
import { Pedido } from "@/types/pedido";

interface AtualizarPedidoRequest {
    id: number;
    status: Pedido['status'];
}

export async function atualizarPedido({ id, status }: AtualizarPedidoRequest) {
    const resposta = await api.put<Pedido>(`/pedidos/${id}`, { status });
    return resposta.data;
}