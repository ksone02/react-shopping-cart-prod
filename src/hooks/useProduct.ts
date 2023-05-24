import { useEffect } from 'react';
import { serverState } from '../service/atom';
import { ProductType } from '../types/types';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

const useProduct = () => {
  const serverURL = useRecoilValue(serverState);

  const {
    data: productData,
    isFetching,
    refetch,
  } = useQuery<ProductType[]>(
    'products',
    async () => {
      const res = await fetch(`${serverURL}/products`, { method: 'GET' });
      const resData = await res.json();
      return resData;
    },
    {
      staleTime: 100000,
      cacheTime: Infinity,
    },
  );

  useEffect(() => {
    refetch();
  }, [serverURL]);

  return {
    productData,
    isFetching,
  };
};

export default useProduct;
