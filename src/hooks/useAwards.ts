'use client';

import { useState, useEffect, useCallback } from 'react';
import { AwardResponse, FetchOptions } from '@/lib/api';

interface UseAwardsState {
  awards: AwardResponse[];
  loading: boolean;
  error: string | null;
}

interface UseAwardsOptions extends FetchOptions {
  bidNtceNo?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useAwards(options: UseAwardsOptions = {}) {
  const [state, setState] = useState<UseAwardsState>({
    awards: [],
    loading: true,
    error: null,
  });

  const fetchAwards = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const params = new URLSearchParams();

      if (options.startDate) params.set('startDate', options.startDate);
      if (options.endDate) params.set('endDate', options.endDate);
      if (options.type) params.set('type', options.type);
      if (options.bidNtceNo) params.set('bidNtceNo', options.bidNtceNo);
      if (options.page) params.set('page', String(options.page));
      if (options.limit) params.set('limit', String(options.limit || 50));

      const response = await fetch(`/api/g2b/awards?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setState({
          awards: data.data || [],
          loading: false,
          error: null,
        });
      } else {
        setState({
          awards: [],
          loading: false,
          error: data.error || 'Failed to fetch awards',
        });
      }
    } catch (err) {
      console.error('[useAwards] Error:', err);
      setState({
        awards: [],
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch awards',
      });
    }
  }, [options.startDate, options.endDate, options.type, options.bidNtceNo, options.page, options.limit]);

  useEffect(() => {
    fetchAwards();

    if (options.autoRefresh) {
      const interval = setInterval(fetchAwards, options.refreshInterval || 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [fetchAwards, options.autoRefresh, options.refreshInterval]);

  return {
    ...state,
    refetch: fetchAwards,
  };
}

// Hook for getting award by bid number
export function useAwardByBid(bidNumber: string) {
  const [award, setAward] = useState<AwardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAward() {
      if (!bidNumber) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(`/api/g2b/awards?bidNtceNo=${bidNumber}`);
        const data = await response.json();

        if (data.success && data.data && data.data.length > 0) {
          setAward(data.data[0]);
        } else {
          setAward(null);
        }
        setError(null);
      } catch (err) {
        setAward(null);
        setError(err instanceof Error ? err.message : 'Failed to fetch award');
      } finally {
        setLoading(false);
      }
    }

    fetchAward();
  }, [bidNumber]);

  return { award, loading, error };
}

export default useAwards;
