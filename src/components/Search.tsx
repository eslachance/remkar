import { useContext, useState } from 'react';
import { ResultStoreContext } from '@/store/results';
import { debounce } from '@/utils';
import { useLanguage } from '@/i18n/LanguageContext';

const Search = () => {
  const { resultState, dispatch, loadFilteredResults } = useContext(ResultStoreContext);
  const { t } = useLanguage();

  const [search] = useState(() => debounce(loadFilteredResults, 250));

  const onHandleFilterChange = (e) => {
    dispatch({ type: 'SET_FILTER', payload: e.currentTarget.value });
    search(e.currentTarget.value);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium sr-only">
        {t('search')}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
          <span className="iconify i-ri-search-line text-xl text-dive-accent" />
        </div>
        <input
          value={resultState?.filter}
          type="search"
          id="default-search"
          onChange={onHandleFilterChange}
          className="block w-full p-4 ps-12 text-base bg-dive-bg-light border-2 border-dive-border rounded-lg text-dive-text placeholder-dive-text-muted focus:outline-none focus:border-dive-accent transition-colors"
          placeholder={t('searchPlaceholder')}
        />
      </div>
    </div>
  );
};

export default Search;
