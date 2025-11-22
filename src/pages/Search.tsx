import Search from '@/components/Search';
import List from '@/components/List';
import { useLanguage } from '@/i18n/LanguageContext';

const SearchPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-display text-dive-text tracking-wide mb-2">
          {t('karaoke')}
        </h1>
        <div className="w-24 h-1 bg-dive-red mx-auto"></div>
      </div>
      <div className="flex flex-col gap-6">
        <Search />
        <List />
      </div>
    </div>
  );
};

export default SearchPage;
