import { Card } from "primereact/card";

export function DashboardCard({ children, titulo }: { children: React.ReactNode; titulo: string }) {
    return (
    <Card
      className="shadow-5 dashboard-card"
      title={titulo}
    >
      {children}
    </Card>
  )

}