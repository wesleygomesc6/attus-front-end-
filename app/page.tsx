import { DashboardCard } from "./components/DashboardCard"

export default function HomePage() {
  return (
    <div>
      <div className="flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-900 m-0">Dashboard</h1>
          <p className="text-500 mt-1 mb-0">Bem-vindo de volta!</p>
        </div>
      </div>

      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <DashboardCard titulo="Usuários">
            <div className="flex justify-content-between align-items-center">
              <div>
                <span className="text-3xl font-bold text-900">1.234</span>
                <div className="text-green-500 mt-1 text-sm font-medium">
                  <i className="pi pi-arrow-up" /> +12% este mês
                </div>
              </div>
              <i className="pi pi-users text-3xl" />
            </div>
          </DashboardCard>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <DashboardCard titulo="Receita">
            <div className="flex justify-content-between align-items-center">
              <div>
                <span className="text-3xl font-bold text-900">R$ 45.2k</span>
                <div className="text-green-500 mt-1 text-sm font-medium">
                  <i className="pi pi-arrow-up" /> +8% este mês
                </div>
              </div>
              <i className="pi pi-dollar text-3xl" />
            </div>
          </DashboardCard>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <DashboardCard titulo="Pedidos">
            <div className="flex justify-content-between align-items-center">
              <div>
                <span className="text-3xl font-bold text-900">389</span>
                <div className="text-green-500 mt-1 text-sm font-medium">
                  <i className="pi pi-arrow-down" /> -3% este mês
                </div>
              </div>
              <i className="pi pi-shopping-cart text-3xl" />
            </div>
          </DashboardCard>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <DashboardCard titulo="Produtos">
            <div className="flex justify-content-between align-items-center">
              <div>
                <span className="text-3xl font-bold text-900">52</span>
                <div className="text-green-500 mt-1 text-sm font-medium">
                  <i className="pi pi-arrow-up" /> +2 novos
                </div>
              </div>
              <i className="pi pi-box text-3xl" />
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}