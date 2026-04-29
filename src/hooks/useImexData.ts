'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ImexRecord, ImexFormPayload } from '@/lib/types';

const BASE_URL = '/api/imex';

async function fetchImex(): Promise<ImexRecord[]> {
  const res = await fetch(BASE_URL);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export function useImexData(options?: { refetchInterval?: number }) {
  return useQuery({
    queryKey: ['imex'],
    queryFn: fetchImex,
    staleTime: 30_000,        // 30 saat cache
    refetchOnWindowFocus: true,
    refetchInterval: options?.refetchInterval,
  });
}

export function useSaveImex() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload, isEdit, id }: {
      payload: ImexFormPayload;
      isEdit: boolean;
      id?: number;
    }) => {
      const url = isEdit ? `${BASE_URL}/${id}` : BASE_URL;
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['imex'] }),
  });
}

export function useDeleteImex() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['imex'] }),
  });
}
