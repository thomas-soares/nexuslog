import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { getPageHref, type HomeTab } from "../_lib/home-navigation";

export function Pagination({
  activeTab,
  currentPage,
  totalPages,
}: {
  activeTab: HomeTab;
  currentPage: number;
  totalPages: number;
}) {
  const firstPage = 1;
  const previousPage = Math.max(firstPage, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);
  const isFirstPage = currentPage <= firstPage;
  const isLastPage = currentPage >= totalPages;
  const disabledClass =
    "hidden h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-foreground opacity-50 ring-offset-background transition-colors lg:flex";
  const enabledClass =
    "hidden h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground lg:flex";
  const enabledInlineClass =
    "inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground";
  const disabledInlineClass =
    "inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-foreground opacity-50 ring-offset-background transition-colors";

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium leading-5 text-foreground">
          Pagina {currentPage} de {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          {isFirstPage ? (
            <span className={disabledClass}>
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </span>
          ) : (
            <Link className={enabledClass} href={getPageHref(activeTab, firstPage)}>
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Link>
          )}
          {isFirstPage ? (
            <span className={disabledInlineClass}>
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </span>
          ) : (
            <Link className={enabledInlineClass} href={getPageHref(activeTab, previousPage)}>
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          )}
          {isLastPage ? (
            <span className={disabledInlineClass}>
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </span>
          ) : (
            <Link className={enabledInlineClass} href={getPageHref(activeTab, nextPage)}>
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
          {isLastPage ? (
            <span className={disabledClass}>
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </span>
          ) : (
            <Link className={enabledClass} href={getPageHref(activeTab, totalPages)}>
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
