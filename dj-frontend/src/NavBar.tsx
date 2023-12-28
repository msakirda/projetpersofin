const NavBar :
React.FC<{ pageIndex: number, currentPage: number, numPages: number, handleFirstPage: () => void, handlePrevPage: () => void, handleNextPage: () => void, handleLastPage: () => void }>
= (
    { pageIndex, currentPage, numPages, handleFirstPage, handlePrevPage, handleNextPage, handleLastPage }
) =>
{


    return (
        <div className="navBar">
        <button onClick={handleFirstPage} disabled={currentPage === 0}>
          First Page
        </button>
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={currentPage === numPages - 1}>
          Next Page
        </button>
        <button onClick={handleLastPage} disabled={currentPage === numPages - 1}>
          Last Page
        </button>
        <p>Page {pageIndex === 0 ? "Settings" : pageIndex === numPages -1 ? "Final Page" : pageIndex }</p>
      </div>

    );
};

export default NavBar;