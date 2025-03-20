import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCountData = () => {
  const { data } = useSWR(`/api/dashboard/count`, fetcher, {
    refreshInterval: 10000,
  });

  return {
    data,
  };
};
