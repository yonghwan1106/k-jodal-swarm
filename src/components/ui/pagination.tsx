"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: number[] = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className={`flex items-center justify-center gap-1 ${className}`}
      aria-label="페이지네이션"
    >
      {showFirstLast && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="border-[#334155] text-[#94A3B8] hover:bg-[#1E293B] disabled:opacity-50"
          aria-label="첫 페이지"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-[#334155] text-[#94A3B8] hover:bg-[#1E293B] disabled:opacity-50"
        aria-label="이전 페이지"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <div className="flex items-center gap-1">
        {visiblePages[0] > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(1)}
              className="border-[#334155] text-[#94A3B8] hover:bg-[#1E293B] min-w-[36px]"
            >
              1
            </Button>
            {visiblePages[0] > 2 && (
              <span className="px-2 text-[#64748B]">...</span>
            )}
          </>
        )}

        {visiblePages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={
              currentPage === page
                ? "bg-[#3B82F6] text-white min-w-[36px]"
                : "border-[#334155] text-[#94A3B8] hover:bg-[#1E293B] min-w-[36px]"
            }
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Button>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2 text-[#64748B]">...</span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              className="border-[#334155] text-[#94A3B8] hover:bg-[#1E293B] min-w-[36px]"
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-[#334155] text-[#94A3B8] hover:bg-[#1E293B] disabled:opacity-50"
        aria-label="다음 페이지"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {showFirstLast && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="border-[#334155] text-[#94A3B8] hover:bg-[#1E293B] disabled:opacity-50"
          aria-label="마지막 페이지"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      )}
    </nav>
  );
}

// Page size selector component
interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  options?: number[];
  className?: string;
}

export function PageSizeSelector({
  pageSize,
  onPageSizeChange,
  options = [10, 20, 50, 100],
  className = "",
}: PageSizeSelectorProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-[#94A3B8]">페이지당</span>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="h-9 px-3 rounded-lg bg-[#1E293B] border border-[#334155] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
        aria-label="페이지당 항목 수"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}개
          </option>
        ))}
      </select>
    </div>
  );
}
