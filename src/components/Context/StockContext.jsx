import { createContext, useState, useEffect } from 'react';
import api from '../../lib/api';

export const StockContext = createContext(null);

export function StockProvider({ children }) {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStocks().finally(() => setLoading(false));
  }, []);

  const fetchStocks = async () => {
    const res = await api.get('/stocks');
    if (res.data?.success) {
      setStocks(res.data.data);
    }
  };

  const getStockById = async (id) => {
    const res = await api.get(`/stocks/${id}`);
    if (!res.data?.success) {
      throw new Error('Stock not found');
    }
    return res.data.data;
  };

  const createStock = async (payload) => {
    const res = await api.post('/stocks', payload);
    if (!res.data?.success) {
      throw new Error(res.data.message || 'Create stock failed');
    }

    setStocks((prev) => [...prev, res.data.data]);
    return res.data.data;
  };

  const updateStock = async (id, payload) => {
    const res = await api.put(`/stocks/${id}`, payload);
    if (!res.data?.success) {
      throw new Error(res.data.message || 'Update stock failed');
    }

    setStocks((prev) => prev.map((s) => (s.id === id ? res.data.data : s)));
    return res.data.data;
  };

  const deleteStock = async (id) => {
    const res = await api.delete(`/stocks/${id}`);
    if (!res.data?.success) {
      throw new Error(res.data.message || 'Delete stock failed');
    }

    setStocks((prev) => prev.filter((s) => s.id !== id));
    return true;
  };

  return (
    <StockContext.Provider
      value={{
        stocks,
        loading,
        fetchStocks,
        getStockById,
        createStock,
        updateStock,
        deleteStock,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}
