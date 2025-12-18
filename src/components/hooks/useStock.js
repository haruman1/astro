import { useContext } from 'react';
import { StockContext } from '../Context/StockContext.jsx';

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used inside StockProvider');
  }
  return context;
};
