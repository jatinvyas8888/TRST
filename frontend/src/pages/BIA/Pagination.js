import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, onItemsPerPageChange, itemsPerPage }) => {
  return (
    <div className="pagination-wrapper">
      <div className="d-flex align-items-center gap-3 p-2 justify-content-between">
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-sm btn-outline-secondary" 
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button 
            className="btn btn-sm btn-outline-secondary" 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <span className="mx-2">Page</span>
          <input
            type="text"
            className="form-control page-input"
            value={currentPage}
            onChange={(e) => onPageChange(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onPageChange(Number(e.target.value));
              }
            }}
            onBlur={(e) => {
              const page = Number(e.target.value);
              if (page > 0 && page <= totalPages) {
                onPageChange(page);
              }
            }}
          />
          <span className="mx-2">of {totalPages}</span>
          <button 
            className="btn btn-sm btn-outline-secondary" 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button 
            className="btn btn-sm btn-outline-secondary" 
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
        <div>
          <span>Items per page:</span>
          <select
            className="form-select"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
