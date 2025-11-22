import { useContext } from 'react';

import { ResultStoreContext } from '@/store/results';
import { Link, Outlet } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

const List = () => {
  const { resultState: {songs: { results, total, page }, filter }, loadFilteredResults } = useContext(ResultStoreContext);
  const { t } = useLanguage();

  const totalPages = Math.ceil(total / 25);
  const pageArray = [...Array(totalPages).keys()];

  const start = Math.max(1, page - 4);
  const end = Math.min(totalPages, page + 4);
  const pageRange = pageArray.slice(start, end);

  const handlePageChange = (page) => {
    loadFilteredResults(filter, page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {filter === '' ? (
        <div className="text-center py-12">
          <span className="iconify i-ri-music-2-line text-6xl text-dive-accent mb-4" />
          <h1 className="mt-4 text-2xl md:text-3xl font-display text-dive-text">{t('enterSearch')}</h1>
        </div>
      ) : (
        <h2 className="pt-4 pb-2 text-xl md:text-2xl text-dive-text font-display">
          {total} {t('results')} {totalPages > 1 && `(${page}/${totalPages} ${t('pages')})`}
        </h2>
      )}
      <div className={`flex flex-col gap-3 overflow-auto ${totalPages > 0 ? 'pb-20' : ''}`}>
        {results.map((item) => (
          <div 
            className="bg-dive-bg-light border border-dive-border rounded-lg p-4 hover:border-dive-accent transition-colors shadow-md hover:shadow-lg" 
            key={item.id}
          >
            <Link 
              to={`/karaoke/${item.id}`}
              className="flex items-center gap-3"
            >
              <span className="iconify i-ri-music-line text-xl text-dive-accent flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-dive-text text-base md:text-lg font-medium truncate">
                  {item.artist}
                </div>
                <div className="text-dive-text-dim text-sm md:text-base truncate">
                  {item.title}
                </div>
              </div>
              <span className="iconify i-ri-arrow-right-line text-dive-text-muted flex-shrink-0" />
            </Link>
          </div>
        ))}
      </div>
      <div className={`flex justify-center items-center fixed w-full left-0 ${totalPages > 1 ? 'bottom-14' : '-bottom-20'} transition-all ease-in-out duration-750 z-50`}>
        <div className="flex gap-2 bg-dive-bg-light/95 px-4 md:px-8 py-3 rounded-t-2xl border border-dive-border border-b-0 shadow-2xl backdrop-blur-sm">
          <button
            className="bg-dive-bg-lighter border border-dive-border rounded-md px-3 py-2 text-dive-text hover:bg-dive-accent hover:border-dive-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}>
            <span className="iconify i-ri-arrow-left-line" />
          </button>
          <div className="hidden sm:flex gap-2">
            {pageRange.map((pageNumber) => (
              <button
                className={`border rounded-md px-3 py-2 font-medium transition-colors ${
                  pageNumber === page 
                    ? 'bg-dive-accent border-dive-accent text-white' 
                    : 'bg-dive-bg-lighter border-dive-border text-dive-text hover:bg-dive-bg hover:border-dive-accent'
                }`}
                onClick={() => handlePageChange(pageNumber)}
                disabled={pageNumber === page}
                key={pageNumber}>
                {pageNumber}
              </button>
            ))}
          </div>
          <div className="sm:hidden text-dive-text font-medium px-2 flex items-center">
            {page} / {totalPages}
          </div>
          <button
            className="bg-dive-bg-lighter border border-dive-border rounded-md px-3 py-2 text-dive-text hover:bg-dive-accent hover:border-dive-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}>
            <span className="iconify i-ri-arrow-right-line" />
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default List;
