import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UseApiMutationOptions<T> {
  mutationFn: (data: T) => Promise<{ data?: any; error?: string }>;
  successMessage?: string;
  errorMessage?: string;
  invalidateQueries?: string[];
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApiMutation<T>({
  mutationFn,
  successMessage = 'Operation successful',
  errorMessage = 'Operation failed',
  invalidateQueries = [],
  onSuccess,
  onError,
}: UseApiMutationOptions<T>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: T) => {
      const result = await mutationFn(data);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: (data) => {
      toast.success(successMessage);
      invalidateQueries.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || errorMessage);
      onError?.(error.message);
    },
  });
}
