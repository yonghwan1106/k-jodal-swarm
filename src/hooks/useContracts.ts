'use client';

import { useState, useEffect, useCallback } from 'react';
import { ContractResponse, FetchOptions } from '@/lib/api';

interface UseContractsState {
  contracts: ContractResponse[];
  loading: boolean;
  error: string | null;
}

interface UseContractsOptions extends FetchOptions {
  cntrctNo?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useContracts(options: UseContractsOptions = {}) {
  const [state, setState] = useState<UseContractsState>({
    contracts: [],
    loading: true,
    error: null,
  });

  const fetchContracts = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const params = new URLSearchParams();

      if (options.startDate) params.set('startDate', options.startDate);
      if (options.endDate) params.set('endDate', options.endDate);
      if (options.type) params.set('type', options.type);
      if (options.cntrctNo) params.set('cntrctNo', options.cntrctNo);
      if (options.page) params.set('page', String(options.page));
      if (options.limit) params.set('limit', String(options.limit || 50));

      const response = await fetch(`/api/g2b/contracts?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setState({
          contracts: data.data || [],
          loading: false,
          error: null,
        });
      } else {
        setState({
          contracts: [],
          loading: false,
          error: data.error || 'Failed to fetch contracts',
        });
      }
    } catch (err) {
      console.error('[useContracts] Error:', err);
      setState({
        contracts: [],
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch contracts',
      });
    }
  }, [options.startDate, options.endDate, options.type, options.cntrctNo, options.page, options.limit]);

  useEffect(() => {
    fetchContracts();

    if (options.autoRefresh) {
      const interval = setInterval(fetchContracts, options.refreshInterval || 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [fetchContracts, options.autoRefresh, options.refreshInterval]);

  return {
    ...state,
    refetch: fetchContracts,
  };
}

// Hook for getting contract by number
export function useContract(contractNo: string) {
  const [contract, setContract] = useState<ContractResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContract() {
      if (!contractNo) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(`/api/g2b/contracts?cntrctNo=${contractNo}`);
        const data = await response.json();

        if (data.success && data.data && data.data.length > 0) {
          setContract(data.data[0]);
        } else {
          setContract(null);
        }
        setError(null);
      } catch (err) {
        setContract(null);
        setError(err instanceof Error ? err.message : 'Failed to fetch contract');
      } finally {
        setLoading(false);
      }
    }

    fetchContract();
  }, [contractNo]);

  return { contract, loading, error };
}

export default useContracts;
