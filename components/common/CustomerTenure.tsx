import { formatTenure } from '@/utils/formatTenure';
import React from 'react';

const CustomerTenure = ({ createdAt }) => {
  const tenure = formatTenure(createdAt);

  return (
    <div className="text-sm font-medium text-gray-600">
      {tenure}
    </div>
  );
};

export default CustomerTenure;