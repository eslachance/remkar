import { useContext } from 'react';

import { ResultStoreContext } from '@/store/results';
import { Link, Outlet } from 'react-router-dom';

const List = () => {
  const { resultState: {songs: { results, total, page }, filter }, loadFilteredResults } = useContext(ResultStoreContext);

  const totalPages = Math.ceil(total / 25);

  const handlePageChange = (page) => {
    loadFilteredResults(filter, page);
  };

  return (
    <>
      {filter === '' ? (
        <h1 className="mt-0 flex justify-center">Entrer une recherche ci-haut</h1>
      ) : (
        <h1 className="pt-0">{results.length} resultats ({total} total)</h1>
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
            className="btn btn-primary"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}>
            <span className="iconify i-ri-arrow-left-line" />
          </button>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <button
              className={`btn btn-primary ${pageNumber + 1 === page ? 'btn-active' : ''}`}
              onClick={() => handlePageChange(pageNumber + 1)}
              key={pageNumber}>
              {pageNumber + 1}
            </button>
          ))}
          <button
            className="btn btn-primary"
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
