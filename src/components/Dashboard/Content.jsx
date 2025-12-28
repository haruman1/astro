import { useStock } from '../hooks/useStock';

export default function Content() {
  const { stocks, loading } = useStock();
  return (
    <section className="p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5">
        <SummaryCard
          title="Total Produk"
          value={stocks.length}
          loading={loading}
        />

        <SummaryCard
          title="Total Stok"
          value={stocks.reduce(
            (total, item) => total + Number(item.qty || 0),
            0
          )}
          loading={loading}
        />

        <SummaryCard
          title="Produk Aktif"
          value={stocks.filter((item) => item.status === 'active').length}
          loading={loading}
        />

        <SummaryCard
          title="Produk Nonaktif"
          value={stocks.filter((item) => item.status === 'inactive').length}
          loading={loading}
        />
      </div>

      {/* Chart placeholder */}
      <div className="bg-white rounded-xl shadow p-6 mt-6 col-span-4">
        <span className="text-gray-600 text-sm">Pelacakan Stok</span>
        <div
          id="tracking-stock-chart"
          className="h-[250px] mt-4 flex items-center justify-center text-gray-400"
        >
          Chart here
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ title, value, loading = false }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {loading ? (
        <>
          {/* Title skeleton */}
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />

          {/* Value skeleton */}
          <div className="h-8 w-16 bg-gray-200 rounded mt-4 animate-pulse" />
        </>
      ) : (
        <>
          <span className="text-gray-500 text-sm">{title}</span>
          <h3 className="text-2xl font-semibold mt-2">{value}</h3>
        </>
      )}
    </div>
  );
}
