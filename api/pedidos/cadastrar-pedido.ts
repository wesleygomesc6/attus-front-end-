import { api } from "@/lib/axios";
import { Pedido } from "@/types/pedido";

interface CadastrarPedidoRequest {
    titulo: string;
    descricao: string;
    clienteId: number;
    vendedorId: number;
}

export async function cadastrarPedido({ titulo, descricao, clienteId, vendedorId }: CadastrarPedidoRequest) {
    const resposta = await api.post<Pedido>('/pedidos', { titulo, descricao, clienteId, vendedorId });
    return resposta.data;
}