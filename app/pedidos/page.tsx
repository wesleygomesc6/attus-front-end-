'use client'
import { listarPedidos } from "@/api/pedidos/listar-pedidos"
import { useLayout } from "@/context/LayoutContext"
import { useQuery } from "@tanstack/react-query"
import { Card } from "primereact/card"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Skeleton } from "primereact/skeleton"
import { StatusPedido } from "../components/StatusPedido"

export default function PedidosPage () {
    const {exibirNotificacao} = useLayout()

    const { data: pedidos, isLoading: carregandoPedidos, isError } = useQuery({
        queryKey: ['pedidos'],
        queryFn: async () => await listarPedidos(),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if (isError) {
        exibirNotificacao({
        severity: 'error',
        summary: 'Erro ao carregar os pedidos.',
        detail: 'Algo de errado aqui!'
        })
    }

    if(carregandoPedidos) {
        <Skeleton width="100%" height="2rem" className="mb-2" />
    }


    return (
        <Card title="Pedidos">
            <DataTable size="small" value={pedidos} loading={carregandoPedidos} rows={10}>
                <Column field="id" header="#" />
                <Column field="titulo" header="Título" />
                <Column field="descricao" header="Descrição" className="max-w-15rem" />
                <Column field="clienteNome" header="Cliente" />
                <Column field="status" header="Status" body={(data) => <StatusPedido status={data.status} />} />
                <Column field="criadoEm" header="Data Pedido" body={(data) => new Date(data.criadoEm).toLocaleString()} />
                <Column field="vendedorNome" header="Vendedor" />
            </DataTable>
            
        </Card>
    )
}