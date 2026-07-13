import { useCallback, useState } from 'react';
import apiClient from '@/lib/api-client';
import { AxiosError } from 'axios';

interface UseFetchOptions {
  immediate?: boolean;
}

export function useFetch<T>(
  url: string,
  options?: UseFetchOptions,
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<T>(url);
      setData(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError);
      throw axiosError;
    } finally {
      setLoading(false);
    }
  }, [url]);

  return {
    data,
    loading,
    error,
    fetch,
  };
}
