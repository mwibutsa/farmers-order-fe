import { AxiosError } from "axios";
import { useState } from "react";

interface ApiCallState<TResponse> {
  data: TResponse | null;
  error: Error | null;
  isLoading: boolean;
}

type ApiCallResult<TResponse> =
  | { success: true; data: TResponse; result?: unknown }
  | { success: false; error: Error };

export const useApiCall = <TResponse, TData = TResponse>() => {
  const [state, setState] = useState<ApiCallState<TResponse>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = async (
    apiCall: () => Promise<TResponse>,
    transform?: (response: TResponse) => TData
  ): Promise<ApiCallResult<TResponse>> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await apiCall();
      const result = transform ? transform(response) : response;
      setState({ data: response, error: null, isLoading: false });
      return { success: true, data: response, result };
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

  return {
    isLoading: state.isLoading,
    error: state.error,
    data: state.data,
    execute,
  };
};

export type UseApiCallReturn<TResponse, TData = TResponse> = {
  isLoading: boolean;
  error: Error | null;
  data: TResponse | null;
  execute: (
    apiCall: () => Promise<TResponse>,
    transform?: (response: TResponse) => TData
  ) => Promise<ApiCallResult<TResponse>>;
};
