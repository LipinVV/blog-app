import {UserType} from "../../types";
import './pagination.scss';

type PaginationProps = {
    handleClickDecrease: () => void,
    handleClickIncrease: () => void,
    currentPage: number,
    users: UserType[],
    indexOfLastItem: number,
}

export const Pagination = ({handleClickDecrease, handleClickIncrease, currentPage, users, indexOfLastItem}: PaginationProps) => {

    return (
        <div className='pagination'>
            <section className='pagination__control-buttons'>
                <button
                    className='pagination__control-button'
                    type='button'
                    onClick={handleClickDecrease}
                    disabled={currentPage === 1}
                >Back
                </button>
                <button
                    className='pagination__control-button'
                    type='button'
                    onClick={handleClickIncrease}
                    disabled={indexOfLastItem >= users.length}
                >Next
                </button>
            </section>
        </div>
    )
}