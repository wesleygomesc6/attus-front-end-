'use client'
import { listarClientes } from "@/api/clientes/listar-clientes";
import { cadastrarPedido } from "@/api/pedidos/cadastrar-pedido";
import { useLayout } from "@/context/LayoutContext";
import { Pedido } from "@/types/pedido";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const pedidoSchema = z.object({
    titulo: z.string(),
    descricao: z.string(),
    clienteId: z.number(),
    vendedorId: z.number(),
})

type PedidoCreate = z.infer<typeof pedidoSchema>

export default function VenderPage() {
    const { exibirNotificacao } = useLayout()
    const [salvandoPedido, setSalvandoPedido] = useState<boolean>(false);
    const { data: clientes, isLoading: carrecandoClientes, isError } = useQuery({
        queryKey: ['clientes'],
        queryFn: async () => await listarClientes(),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    })
    const router = useRouter();
     const queryClient = useQueryClient();


    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { isValid: formularioEhValido },
    } = useForm<PedidoCreate>({
        resolver: zodResolver(pedidoSchema),
    })

    async function confirmarVenda(data: PedidoCreate) {
        setSalvandoPedido(true);
        try {
            const pedidoAtualizado = await cadastrarPedido(data);
            reset();
            exibirNotificacao({
                severity: 'success',
                summary: 'Pedido cadastrado com sucesso.',
                detail: `O pedido #${pedidoAtualizado.id} foi cadastrado com sucesso.`,
            });
            queryClient.setQueryData(['pedidos'], (antigos: Pedido[] | undefined) => {
                if (!antigos) return [pedidoAtualizado];
                return [...antigos, pedidoAtualizado];
            });
            router.push('/pedidos');
        } catch (error) {
            exibirNotificacao({
                severity: 'error',
                summary: 'Erro ao cadastrar o pedido.',
                detail: error instanceof Error ? error.message : 'Aconteceu um erro desconhecido.',
            });
        } finally {
            setSalvandoPedido(false);
        }
    }

    return (
        <Card title="Vender">
            <form className="flex flex-column gap-3" onSubmit={handleSubmit(confirmarVenda)}>
                <div className="flex flex-column gap-2">
                    <label htmlFor="titulo">Título</label>
                    <InputText className="p-inputtext-sm" required id="titulo" {...register('titulo')} placeholder="Título do pedido" />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="descricao">Descrição</label>
                    <InputText className="p-inputtext-sm" required id="descricao" {...register('descricao')} placeholder="Descrição do pedido" />
                </div>
                <div className="flex flex-column gap-2">
                    <label
                        htmlFor="clienteId"
                        className="font-medium flex align-items-center"
                    >
                        Selecione cliente
                    </label>

                    <Controller
                        name="clienteId"
                        control={control}
                        render={({ field }) => {
                            return (
                                <Dropdown
                                    className="p-dropdown-sm"
                                    required
                                    {...field}
                                    id="clienteId"
                                    placeholder="Selecione o cliente"
                                    optionLabel="nome"
                                    optionValue="id"
                                    onChange={(evento) => {
                                        field.onChange(evento.value) // Atualiza o valor do campo no react-hook-form
                                    }}
                                    emptyMessage={isError ? 'Erro ao carregar clientes' : 'Nenhum cliente encontrado'}
                                    loading={carrecandoClientes}
                                    options={clientes}
                                />
                            )
                        }}
                    /></div>
                <div className="flex flex-column gap-2">
                    <label
                        htmlFor="vendedorId"
                        className="font-medium flex align-items-center"
                    >
                        Selecione vendedor
                    </label>

                    <Controller
                        name="vendedorId"
                        control={control}
                        render={({ field }) => {
                            return (
                                <Dropdown
                                    className="p-dropdown-sm"
                                    required
                                    {...field}
                                    id="vendedorId"
                                    placeholder="Selecione o vendedor"
                                    optionLabel="nome"
                                    optionValue="id"
                                    onChange={(evento) => {
                                        field.onChange(evento.value) // Atualiza o valor do campo no react-hook-form
                                    }}
                                    emptyMessage='Nenhum vendedor encontrado'
                                    options={[
                                        { id: 1, nome: 'John Doe' },
                                        { id: 3, nome: 'Bob Johnson' },
                                        { id: 2, nome: 'Jane Smith' },
                                    ]}
                                />
                            )
                        }}
                    /></div>
                <div className="flex gap-3 justify-content-end">
                    <Button
                        label="Limpar"
                        severity="warning"
                        icon="pi pi-eraser"
                        onClick={() => reset()}
                        type="reset"
                        size="small"
                        disabled={salvandoPedido}
                    />
                    <Button
                        label="Salvar"
                        icon="pi pi-save"
                        severity="success"
                        disabled={!formularioEhValido}
                        type="submit"
                        loading={salvandoPedido}
                        size="small"
                    />
                </div>
            </form>
        </Card>
    );
}