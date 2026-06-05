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
          <div className="surface-card p-4 border-round shadow-1">
            <div className="flex justify-content-between align-items-center mb-3">
              <span className="text-500 font-medium">Usuários</span>
              <span className="bg-blue-100 text-blue-700 border-round p-2">
                <i className="pi pi-users" />
              </span>
            </div>
            <div className="text-3xl font-bold text-900">1.234</div>
            <div className="text-green-500 mt-1 text-sm font-medium">
              <i className="pi pi-arrow-up" /> +12% este mês
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card p-4 border-round shadow-1">
            <div className="flex justify-content-between align-items-center mb-3">
              <span className="text-500 font-medium">Receita</span>
              <span className="bg-green-100 text-green-700 border-round p-2">
                <i className="pi pi-dollar" />
              </span>
            </div>
            <div className="text-3xl font-bold text-900">R$ 45.2k</div>
            <div className="text-green-500 mt-1 text-sm font-medium">
              <i className="pi pi-arrow-up" /> +8% este mês
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card p-4 border-round shadow-1">
            <div className="flex justify-content-between align-items-center mb-3">
              <span className="text-500 font-medium">Pedidos</span>
              <span className="bg-orange-100 text-orange-700 border-round p-2">
                <i className="pi pi-shopping-cart" />
              </span>
            </div>
            <div className="text-3xl font-bold text-900">389</div>
            <div className="text-red-500 mt-1 text-sm font-medium">
              <i className="pi pi-arrow-down" /> -3% este mês
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card p-4 border-round shadow-1">
            <div className="flex justify-content-between align-items-center mb-3">
              <span className="text-500 font-medium">Produtos</span>
              <span className="bg-purple-100 text-purple-700 border-round p-2">
                <i className="pi pi-box" />
              </span>
            </div>
            <div className="text-3xl font-bold text-900">52</div>
            <div className="text-green-500 mt-1 text-sm font-medium">
              <i className="pi pi-arrow-up" /> +2 novos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}