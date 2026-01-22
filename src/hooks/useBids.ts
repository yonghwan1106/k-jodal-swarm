'use client';

import { useState, useEffect, useCallback } from 'react';
import { BidResponse, FetchOptions } from '@/lib/api';
import { mockBids, bidStats as mockBidStats } from '@/lib/mock-data/bids';

interface UseBidsState {
  bids: BidResponse[];
  loading: boolean;
  error: string | null;
  isFallback: boolean;
  stats: {
    totalScanned: number;
    todayNew: number;
    recommended: number;
    highMatch: number;
    deadlineSoon: number;
    analyzing: number;
    avgMatchScore: number;
  };
}

interface UseBidsOptions extends FetchOptions {
  autoRefresh?: boolean;
  refreshInterval?: number; // ms
  useMockData?: boolean; // Force use mock data
}

export function useBids(options: UseBidsOptions = {}) {
  const [state, setState] = useState<UseBidsState>({
    bids: [],
    loading: true,
    error: null,
    isFallback: false,
    stats: mockBidStats,
  });

  const fetchBids = useCallback(async () => {
    // If forced to use mock data
    if (options.useMockData) {
      setState(prev => ({
        ...prev,
        bids: mockBids as unknown as BidResponse[],
        loading: false,
        isFallback: true,
        stats: mockBidStats,
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const params = new URLSearchParams();

      if (options.startDate) params.set('startDate', options.startDate);
      if (options.endDate) params.set('endDate', options.endDate);
      if (options.type) params.set('type', options.type);
      if (options.keyword) params.set('keyword', options.keyword);
      if (options.agency) params.set('agency', options.agency);
      if (options.page) params.set('page', String(options.page));
      if (options.limit) params.set('limit', String(options.limit || 50));

      const response = await fetch(`/api/bids?${params.toString()}`);
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        const bids = data.data as BidResponse[];

        // Calculate stats from real data
        const stats = {
          totalScanned: data.meta?.total || bids.length,
          todayNew: bids.filter(b => {
            const today = new Date().toISOString().split('T')[0];
            return b.publishedAt?.startsWith(today);
          }).length,
          recommended: bids.filter(b => b.status === 'recommended').length,
          highMatch: bids.filter(b => b.matchScore >= 80).length,
          deadlineSoon: bids.filter(b => {
            const daysLeft = Math.ceil(
              (new Date(b.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            );
            return daysLeft <= 7;
          }).length,
          analyzing: bids.filter(b => b.status === 'analyzing').length,
          avgMatchScore: bids.length > 0
            ? Math.round(bids.reduce((sum, b) => sum + b.matchScore, 0) / bids.length * 10) / 10
            : 0,
        };

        setState({
          bids,
          loading: false,
          error: null,
          isFallback: data.fallback || false,
          stats,
        });
      } else {
        // Fallback to mock data
        setState({
          bids: mockBids as unknown as BidResponse[],
          loading: false,
          error: null,
          isFallback: true,
          stats: mockBidStats,
        });
      }
    } catch (err) {
      console.error('[useBids] Error:', err);

      // Fallback to mock data on error
      setState({
        bids: mockBids as unknown as BidResponse[],
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch bids',
        isFallback: true,
        stats: mockBidStats,
      });
    }
  }, [options.startDate, options.endDate, options.type, options.keyword, options.agency, options.page, options.limit, options.useMockData]);

  useEffect(() => {
    fetchBids();

    // Auto refresh if enabled
    if (options.autoRefresh) {
      const interval = setInterval(fetchBids, options.refreshInterval || 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [fetchBids, options.autoRefresh, options.refreshInterval]);

  return {
    ...state,
    refetch: fetchBids,
  };
}

// Hook for single bid
export function useBid(id: string) {
  const [bid, setBid] = useState<BidResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBid() {
      setLoading(true);

      try {
        const response = await fetch(`/api/bids/${id}`);
        const data = await response.json();

        if (data.success && data.data) {
          setBid(data.data);
        } else {
          // Try mock data
          const mockBid = mockBids.find(b => b.id === id);
          setBid(mockBid as unknown as BidResponse || null);
        }
        setError(null);
      } catch (err) {
        // Try mock data on error
        const mockBid = mockBids.find(b => b.id === id);
        setBid(mockBid as unknown as BidResponse || null);
        setError(err instanceof Error ? err.message : 'Failed to fetch bid');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchBid();
    }
  }, [id]);

  return { bid, loading, error };
}

export default useBids;
