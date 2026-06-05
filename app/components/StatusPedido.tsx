import { Tag, TagProps } from "primereact/tag";

export function StatusPedido({ status }: { status: string }) {
    const statusMap: Record<string, TagProps['severity']> = {
        PENDENTE: 'info',
        CONCLUIDO: 'success',
        CANCELADO: 'danger',
        REJEITADO: 'warning',
    };
    const classesMap: Record<string, string> = {
        EM_ANALISE: 'bg-analise text-white',
        EM_ANDAMENTO: 'bg-andamento text-white',
    };

    return (
       <Tag value={status} severity={statusMap[status]} className={classesMap[status]} />
    );
}