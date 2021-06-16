import { PaginationItem } from "./PaginationItem"


interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage)
  
  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []
  
  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []
  
  return (
    <div className="flex justify-between items-center mt-8 text-gray-600" >
      <div>
        <strong>0</strong> - <strong>{registerPerPage}</strong> de <strong>{totalCountOfRegisters}</strong>
      </div>
      <div className="flex space-x-2">
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > (2 + siblingsCount) && (
              <span className="text-gray-600 w-8 text-center">...</span>
            )}
          </>
        )}
        {previousPages.length > 0 && previousPages.map(page => (
          <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        ))}
        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />
        {nextPages.length > 0 && nextPages.map(page => (
          <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        ))}
        {currentPage + siblingsCount < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && (
              <span className="text-gray-600 w-8 text-center">...</span>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </div>
    </div>
  )
}