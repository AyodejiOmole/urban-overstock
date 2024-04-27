import Statistics from '@/components/Seller/Dashboard/Statistics';
import SellerStatCards from '@/components/Seller/StatCards';
import React from 'react';

const SellerDashboard = () => {
  return (
    <section>
      <SellerStatCards />
      <Statistics />
    </section>
  );
};

export default SellerDashboard;
