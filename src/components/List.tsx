import { useContext } from 'react';

import { ResultStoreContext } from '@/store/results';
import { Link, Outlet } from 'react-router-dom';

const List = () => {
  const { resultState: {songs: { results, total, page }, filter }, loadFilteredResults } = useContext(ResultStoreContext);

  const totalPages = Math.ceil(total / 25);
  const pageArray = [...Array(totalPages).keys()];

  const start = Math.max(1, page - 4);
  const end = Math.min(totalPages, page + 4);
  const pageRange = pageArray.slice(start, end);

  console.log(start, end, page, pageRange);

  const handlePageChange = (page) => {
    loadFilteredResults(filter, page);
  };

  return (
    <>
      {filter === '' ? (
        <h1 className="mt-0 flex justify-center">Entrer une recherche ci-haut</h1>
      ) : (
        <h1 className="pt-0 text-2xl">{total} resultats {totalPages > 1 && `(${page}/${totalPages} pages)`}</h1>
      )}
      <div className="flex flex-col gap-2 overflow-auto">
        {results.map((item) => (
          <div className="border-1 border-solid border-black rounded p2" key={item.id}>
            <Link to={`/karaoke/${item.id}`}>
              {item.artist} - {item.title}
            </Link>
          </div>
        ))}
      </div>
      { totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            className="bg-white border-1 rounded-md px-3 py-1 text-lg font-bold"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}>
            <span className="iconify i-ri-arrow-left-line" />
          </button>
          {pageRange.map((pageNumber) => (
            <button
              className={`bg-white border-1 rounded-md px-3 py-1 text-lg font-bold ${pageNumber === page ? 'border-grey-50' : ''}`}
              onClick={() => handlePageChange(pageNumber)}
              disabled={pageNumber === page}
              key={pageNumber}>
              {pageNumber}
            </button>
          ))}
          <button
            className="bg-white border-1 rounded-md px-3 py-1 text-lg font-bold"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}>
            <span className="iconify i-ri-arrow-right-line" />
          </button>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default List;
