import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useRoomReservation = (user_id: number) => {
  const { data, error } = useSWR(
    `/api/reservation/room?id=${user_id}`,
    fetcher,
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useEnrollmentReservation = (user_id: number) => {
  const { data, error } = useSWR(
    `/api/reservation/enrollment?id=${user_id}`,
    fetcher,
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDiveReservation = (user_id: number) => {
  const { data, error } = useSWR(
    `/api/reservation/dive?id=${user_id}`,
    fetcher,
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useCountReservation = (user_id: number) => {
  const { data, error } = useSWR(
    `/api/reservation/count?id=${user_id}`,
    fetcher,
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
