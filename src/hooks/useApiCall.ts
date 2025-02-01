import { AxiosError } from "axios";
import { useState } from "react";

interface ApiCallState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export const useApiCall = <T>() => {
  const [state, setState] = useState<ApiCallState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = async (apiCall: () => Promise<T>) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await apiCall();
      setState({ data: result, error: null, isLoading: false });
      return { success: true, data: result };
    } catch (err) {
      let error;
      const axiosErr = err as AxiosError;
      if (axiosErr.response?.data) {
        error = new Error(
          (axiosErr.response.data as unknown as { error: string }).error
        );
      } else {
        error = err instanceof Error ? err : new Error("An error occurred");
      }
      setState({ data: null, error, isLoading: false });
      return { success: false, error };
    }
  };

  // Return state properties directly along with execute
  return {
    isLoading: state.isLoading,
    error: state.error,
    data: state.data,
    execute,
  };
};

// Type for the return value of useApiCall
export type UseApiCallReturn<T> = {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
  execute: (
    apiCall: () => Promise<T>
  ) => Promise<{ success: true; data: T } | { success: false; error: Error }>;
};
