'use client'
import { listarPedidos } from "@/api/pedidos/listar-pedidos"
import { useLayout } from "@/context/LayoutContext"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Card } from "primereact/card"
import { Column } from "primereact/column"
import { DataTable, DataTableFilterMeta } from "primereact/datatable"
import { StatusPedido } from "../components/StatusPedido"
import { FilterMatchMode } from "primereact/api"
import { useState } from "react"
import { InputText } from "primereact/inputtext"
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Pedido } from "@/types/pedido"
import { Dropdown } from "primereact/dropdown"

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { atualizarPedido } from "@/api/pedidos/atualizar-pedido"

const pedidoSchema = z.object({
    id: z.number(),
    status: z.enum(['PENDENTE', 'EM_ANALISE', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO', 'REJEITADO']),
})

type PedidoUpdate = z.infer<typeof pedidoSchema>

export default function PedidosPage() {
    const { exibirNotificacao } = useLayout()
    const [filtro, setFiltro] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [filtroGeral, setFiltroGeral] = useState<string>('');
    const [dialogoAtualizarStatus, setDialogoAtualizarStatus] = useState<boolean>(false);
    const [salvandoAtualizacao, setSalvandoAtualizacao] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        reset,
        formState: { isValid: formularioEhValido },
    } = useForm<PedidoUpdate>({
        resolver: zodResolver(pedidoSchema),
    })


    const aoAlterarFiltroGeral = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const _filters = { ...filtro };

        const globalFilter = _filters['global'];
        if (globalFilter && 'value' in globalFilter) {
            globalFilter.value = value;
        }

        setFiltro(_filters);
        setFiltroGeral(value);
    };

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

    const cabecalhoTabela = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <h1 className="text-2xl font-semibold my-0">Pedidos</h1>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={filtroGeral} onChange={aoAlterarFiltroGeral} placeholder="consultar" className="p-inputtext-sm" />
                </IconField>
            </div>
        );
    };

    function pedidoSelecionado(pedido: Pedido) {
        setValue('id', pedido.id)
        setDialogoAtualizarStatus(true)
    }

    async function confirmarAtualizacao(data: PedidoUpdate) {
        setSalvandoAtualizacao(true);
        try {
            const pedidoAtualizado = await atualizarPedido(data);
            reset();
            exibirNotificacao({
                severity: 'success',
                summary: 'Status do pedido atualizado com sucesso.',
                detail: `O pedido #${pedidoAtualizado.id} agora está com status ${pedidoAtualizado.status}.`,
            });
            queryClient.setQueryData(['pedidos'], (antigos: Pedido[] | undefined) => {
                if (!antigos) return [pedidoAtualizado];
                return antigos.map(pedido => pedido.id === pedidoAtualizado.id ? pedidoAtualizado : pedido);
            });
            setDialogoAtualizarStatus(false);
        } catch (error) {
            exibirNotificacao({
                severity: 'error',
                summary: 'Erro ao atualizar o status do pedido.',
                detail: error instanceof Error ? error.message : 'Aconteceu um erro desconhecido.',
            });
        } finally {
            setSalvandoAtualizacao(false);
        }
    }


    return (
        <Card>
            <Dialog header="Atualizar Status do Pedido"
                draggable={false}
                visible={dialogoAtualizarStatus}
                className="w-11 md:w-8 lg:w-6 xl:w-5"
                onHide={() => setDialogoAtualizarStatus(false)}
            >
                <form className="flex flex-column gap-3" onSubmit={handleSubmit(confirmarAtualizacao)}>
                    <div className="flex flex-column gap-2">
                        <label
                            htmlFor="status-pedido"
                            className="font-medium flex align-items-center"
                        >
                            Selecionar novo status para o pedido: #{getValues('id')}
                        </label>

                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Dropdown
                                        required
                                        {...field}
                                        id="status-pedido"
                                        placeholder="Selecione o status do pedido"
                                        onChange={(evento) => {
                                            field.onChange(evento.value) // Atualiza o valor do campo no react-hook-form
                                        }}
                                        options={[
                                            { label: 'Pendente', value: 'PENDENTE' },
                                            { label: 'Em Análise', value: 'EM_ANALISE' },
                                            { label: 'Em Andamento', value: 'EM_ANDAMENTO' },
                                            { label: 'Concluído', value: 'CONCLUIDO' },
                                            { label: 'Cancelado', value: 'CANCELADO' },
                                            { label: 'Rejeitado', value: 'REJEITADO' },
                                        ]}
                                    />
                                )
                            }}
                        /></div>
                    <div className="flex gap-3 justify-content-end">
                        <Button
                            label="Cancelar"
                            severity="secondary"
                            icon="pi pi-times"
                            onClick={() => setDialogoAtualizarStatus(false)}
                            type="reset"
                            size="small"
                            disabled={salvandoAtualizacao}
                        />
                        <Button
                            label="Salvar"
                            icon="pi pi-save"
                            severity="success"
                            disabled={!formularioEhValido}
                            type="submit"
                            loading={salvandoAtualizacao}
                            size="small"
                        />
                    </div>
                </form>
            </Dialog>
            <DataTable
                size="small"
                value={pedidos}
                loading={carregandoPedidos}
                emptyMessage="Nenhum pedido encontrado."
                header={cabecalhoTabela()}
                filters={filtro}
            >
                <Column field="id" header="#" />
                <Column field="titulo" header="Título" />
                <Column field="descricao" header="Descrição" className="max-w-15rem" />
                <Column field="clienteNome" header="Cliente" />
                <Column field="status" header="Status" body={(data) => <StatusPedido status={data.status} />} />
                <Column field="criadoEm" header="Data Pedido" body={(data) => new Date(data.criadoEm).toLocaleString()} />
                <Column field="vendedorNome" header="Vendedor" />
                <Column field="acao" header="Ação" className="max-w-2rem" body={(data) => {
                    if (data.status !== 'CANCELADO') {
                        return <Button size="small" icon="pi pi-sync" rounded text title="Atualizar status"
                            onClick={() => pedidoSelecionado(data)}
                        />
                    }
                }} />
            </DataTable>

        </Card>
    )
}