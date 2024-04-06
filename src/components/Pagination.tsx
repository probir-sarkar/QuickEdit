import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  perPage: number;
}

const Pagination: React.FC<Props> = ({ currentPage, setCurrentPage, perPage, totalItems }) => {
  const totalPage = Math.ceil(totalItems / perPage) || 1;
  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = currentPage * perPage;

  return (
    <div className="flex justify-between mt-4  ">
      <div className="">
        <p>
          Showing <span>{startIndex}</span> to {Math.min(endIndex, totalItems)} of {totalItems} entries
        </p>
      </div>
      <div className="flex gap-2 *:h-6 *:w-6 *:flex *:justify-center *:items-center *:bg-slate-100 *:rounded *:hover:cursor-pointer">
        {/* First Two Icons */}
        {currentPage > 2 && (
          <div onClick={() => setCurrentPage(1)}>
            <ChevronsLeft size={16} />
          </div>
        )}
        {currentPage > 1 && (
          <div onClick={() => setCurrentPage((prev) => prev - 1)}>
            <ChevronLeft size={16} />
          </div>
        )}
        {/* End of First Two Icons */}

        {currentPage > 1 && <div onClick={() => setCurrentPage((prev) => prev - 1)}>{currentPage - 1}</div>}
        <div>{currentPage}</div>
        {currentPage < totalPage && <div onClick={() => setCurrentPage((prev) => prev + 1)}>{currentPage + 1}</div>}
        {/* Last Two Icons*/}
        {currentPage < totalPage && (
          <div onClick={() => setCurrentPage((prev) => prev + 1)}>
            <ChevronRight size={14} />
          </div>
        )}
        {currentPage + 1 < totalPage && (
          <div onClick={() => setCurrentPage(totalPage)}>
            <ChevronsRight size={14} />
          </div>
        )}
        {/* End of Last Two Icons */}
      </div>
    </div>
  );
};

export default Pagination;
