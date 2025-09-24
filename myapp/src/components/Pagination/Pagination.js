import React from "react";
import "./Pagination.css";

const Pagination = ({ total, perPage, page, setPage, setPerPage }) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1); 
  };

  return (
    <div className="pagination">
      <div className="page-buttons">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>

      <select value={perPage} onChange={handlePerPageChange}>
        {[10, 25, 50, 100].map((num) => (
          <option key={num} value={num}>
            {num} per page
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
