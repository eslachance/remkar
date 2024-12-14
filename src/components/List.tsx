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

  // console.log(start, end, page, pageRange);

  const handlePageChange = (page) => {
    loadFilteredResults(filter, page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {filter === '' ? (
        <h1 className="mt-0 flex justify-center">Entrer une recherche ci-haut</h1>
      ) : (
        <h1 className="pt-0 text-2xl">{total} resultats {totalPages > 1 && `(${page}/${totalPages} pages)`}</h1>
      )}
      <div className={`flex flex-col gap-2 overflow-auto ${totalPages > 0 ? 'pb-15' : ''}`}>
        {results.map((item) => (
          <div className="border-1 border-solid border-black rounded p2" key={item.id}>
            <Link to={`/karaoke/${item.id}`}>
              {item.artist} - {item.title}
            </Link>
          </div>
        ))}
      </div>
      <div className={`flex justify-center items-center fixed w-full ${totalPages > 1 ? 'bottom-11' : '-bottom-11'} transition-all ease-in-out duration-750`}>
        <div className="flex gap-2 bg-white px-10 py-3 rounded-t-[24px] border-1 border-solid border-black/50 shadow-lg">
          <button
            className="bg-white border-1 border-black/50 rounded-md px-3 py-1 text-lg font-bold"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}>
            <span className="iconify i-ri-arrow-left-line" />
          </button>
          {pageRange.map((pageNumber) => (
            <button
              className={`bg-white border-1 border-black/50 rounded-md px-3 py-1 text-lg font-bold ${pageNumber === page ? 'border-grey-50' : ''}`}
              onClick={() => handlePageChange(pageNumber)}
              disabled={pageNumber === page}
              key={pageNumber}>
              {pageNumber}
            </button>
          ))}
          <button
            className="bg-white border-1 border-black/50 rounded-md px-3 py-1 text-lg font-bold"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}>
            <span className="iconify i-ri-arrow-right-line" />
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default List;
