import { useState } from 'react';

const usePaginator = (limit: number, defaultPage: number = 1) => {
  const [currentPage, setPage] = useState<number>(defaultPage);
  return {
    limit,
    currentPage,
    offset: (currentPage - 1) * limit,
    setPage,
  };
};

export default usePaginator;
