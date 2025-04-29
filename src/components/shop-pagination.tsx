
"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface ShopPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function ShopPagination({ currentPage, totalPages }: ShopPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // --- Pagination Logic for Display ---
  const getPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5; // Max number of page links to show (excluding prev/next/ellipsis)
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    // Always add Previous button
     items.push(
        <PaginationItem key="prev">
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
     );

    // Determine start and end page numbers
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPagesToShow) {
      if (currentPage <= halfMaxPages + 1) {
        // Show first `maxPagesToShow` pages if near the beginning
        endPage = maxPagesToShow;
      } else if (currentPage >= totalPages - halfMaxPages) {
         // Show last `maxPagesToShow` pages if near the end
        startPage = totalPages - maxPagesToShow + 1;
      } else {
        // Show pages around the current page
        startPage = currentPage - halfMaxPages;
        endPage = currentPage + halfMaxPages;
      }
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={createPageURL(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
         items.push(<PaginationEllipsis key="start-ellipsis" />);
      }
    }

    // Add page number links
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href={createPageURL(i)} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add end ellipsis and last page if needed
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            items.push(<PaginationEllipsis key="end-ellipsis" />);
        }
        items.push(
            <PaginationItem key={totalPages}>
            <PaginationLink href={createPageURL(totalPages)}>{totalPages}</PaginationLink>
            </PaginationItem>
        );
    }


    // Always add Next button
     items.push(
        <PaginationItem key="next">
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
     );

    return items;
  };


  return (
    <Pagination className="mt-8 md:mt-12">
      <PaginationContent>
         {getPaginationItems()}
      </PaginationContent>
    </Pagination>
  );
}
