import { api } from "@/lib/axios";
import { Cliente } from "@/types/cliente";

export async function listarClientes() {
    const resposta = await api.get<Cliente[]>('/clientes')
    return resposta.data
}