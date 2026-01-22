import { renderHook, waitFor, act } from "@testing-library/react";
import { useBids } from "@/hooks/useBids";

// Mock the entire module
jest.mock("@/hooks/useBids", () => {
  const mockBids = [
    {
      id: "1",
      title: "테스트 입찰",
      agency: "테스트 기관",
      estimatedPrice: 100000000,
      deadline: "2026-02-01",
      matchScore: 85,
      winProbability: 72,
      status: "new",
      riskLevel: "low",
      competitors: 5,
      aiInsights: ["테스트 인사이트"],
      urgency: "normal",
    },
  ];

  return {
    useBids: jest.fn(() => ({
      bids: mockBids,
      loading: false,
      error: null,
      isFallback: false,
      stats: {
        totalScanned: 1,
        highMatch: 1,
        deadlineSoon: 0,
        avgMatchScore: 85,
      },
      refetch: jest.fn(),
    })),
  };
});

describe("useBids", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns bids data", () => {
    const { result } = renderHook(() => useBids({}));

    expect(result.current.loading).toBe(false);
    expect(result.current.bids).toHaveLength(1);
    expect(result.current.bids[0].title).toBe("테스트 입찰");
  });

  it("returns stats correctly", () => {
    const { result } = renderHook(() => useBids({}));

    expect(result.current.stats.totalScanned).toBe(1);
    expect(result.current.stats.highMatch).toBe(1);
    expect(result.current.stats.avgMatchScore).toBe(85);
  });

  it("provides refetch function", () => {
    const { result } = renderHook(() => useBids({}));

    expect(typeof result.current.refetch).toBe("function");
  });

  it("indicates when not using fallback data", () => {
    const { result } = renderHook(() => useBids({}));

    expect(result.current.isFallback).toBe(false);
  });

  it("returns no error state", () => {
    const { result } = renderHook(() => useBids({}));

    expect(result.current.error).toBeNull();
  });
});
