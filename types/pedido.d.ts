export interface Pedido {
    id: number;
    titulo: string;
    descricao: string;
    status: 'PENDENTE' | 'CONCLUIDO' | 'CANCELADO' | 'EM_ANALISE' | 'EM_ANDAMENTO' | 'REJEITADO';
    clienteId: number;
    clienteNome: string;
    vendedorId: number;
    vendedorNome: string;
    criadoEm: Date;
    atualizadoEm?: Date; 
}