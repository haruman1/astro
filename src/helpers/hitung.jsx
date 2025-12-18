const hitungMasuk = (stocks) => stocks.filter((s) => s.type === 'in').length;

const hitungKeluar = (stocks) => stocks.filter((s) => s.type === 'out').length;

const hitungExpiring = (stocks) => stocks.filter((s) => s.is_expired).length;
