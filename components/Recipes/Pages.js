const Pages = function ({ currentPage, changePage, pageGroup }) {
  return (
    <ul className="pages__list">
      {pageGroup.map((page) => (
        <li className="pages__item" key={page}>
          <button
            onClick={changePage(page)}
            className={`pages__button ${
              +page === +currentPage ? "current" : ""
            }`}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pages;
