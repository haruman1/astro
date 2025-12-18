import { AuthProvider } from '../Context/AuthContext.jsx';
import Protected from '../Protected.jsx';
import LogoutButton from '../Auth/Logout.jsx';
import { useEffect } from 'react';
import Header from './Header.jsx';
import Navbar from './Navbar.jsx';
import Content from './Content.jsx';
import Footer from './Footer.jsx';
import '../../styles/dashboard.css';
import { StockProvider } from '../Context/StockContext.jsx';
export default function DashboardApp() {
  useEffect(() => {
    // loadStockTrackingChart();
  }, []);

  const loadStockTrackingChart = async () => {
    try {
      const res = await fetch('API_KAMU_DI_SINI');
      const barang = await res.json();

      const namaBarang = barang.map((i) => i.nama || i.product_name);
      const stokBarang = barang.map((i) => i.stok || i.stock);

      const warnaStok = stokBarang.map((v) =>
        v > 20 ? '#16a34a' : v >= 10 ? '#facc15' : '#dc2626'
      );

      const options = {
        chart: {
          type: 'bar',
          height: 220,
          toolbar: { show: false },
        },
        series: [{ name: 'Jumlah Stok', data: stokBarang }],
        xaxis: { categories: namaBarang, labels: { rotate: -15 } },
        colors: warnaStok,
        plotOptions: {
          bar: { borderRadius: 4, columnWidth: '45%' },
        },
        dataLabels: { enabled: true },
      };

      new ApexCharts(
        document.querySelector('#tracking-stock-chart'),
        options
      ).render();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthProvider client:load>
      <Protected client:load>
        <StockProvider client:load>
          <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex gap-6">
              <Navbar />
              <main className="flex-1">
                <Header />
                <Content />
              </main>
            </div>
          </div>
          <Footer />
        </StockProvider>
      </Protected>
    </AuthProvider>
  );
}
