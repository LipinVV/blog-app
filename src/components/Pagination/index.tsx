import { PaginationProps } from '../../types';
import './pagination.scss';

export const Pagination = ({
  handleClickDecrease, handleClickIncrease, currentPage, users, indexOfLastItem,
}: PaginationProps) => (
  <div className="pagination">
    <section className="pagination__control-buttons">
      <button
        className="pagination__control-button"
        type="button"
        onClick={handleClickDecrease}
        disabled={currentPage === 1}
      >
        Back
      </button>
      <button
        className="pagination__control-button"
        type="button"
        onClick={handleClickIncrease}
        disabled={indexOfLastItem >= users.length}
      >
        Next
      </button>
    </section>
  </div>
);
