import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const HomePage = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-5xl md:text-7xl font-display text-dive-text tracking-wide mb-4">
          BAR LA REMISE
        </h1>
        <div className="w-32 h-1 bg-dive-accent mx-auto mb-6"></div>
        <div className="bg-dive-bg-lighter border border-dive-border rounded-lg p-6 md:p-8 shadow-xl max-w-4xl mx-auto mb-8">
          <p className="text-dive-text-dim text-lg leading-relaxed">
            {language === 'fr' 
              ? "Bienvenue au Bar La Remise ! Un bar de quartier authentique où vous pouvez profiter d'une ambiance décontractée, de bonnes boissons et de soirées karaoké mémorables. Venez nous visiter !"
              : "Welcome to Bar La Remise! An authentic neighborhood dive bar where you can enjoy a relaxed atmosphere, good drinks, and memorable karaoke nights. Come visit us!"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hours Card */}
        <div className="bg-dive-bg-light border border-dive-border rounded-lg p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <span className="iconify i-ri-time-line text-3xl text-dive-accent" />
            <h2 className="text-3xl font-display text-dive-text">{t('openingHours')}</h2>
          </div>
          <div className="space-y-3 mb-8">
            <div className="flex justify-between items-center text-lg">
              <span className="text-dive-text font-semibold">{t('monSat')}</span>
              <span className="text-dive-text-dim">
                {language === 'fr' ? 'Midi à 3AM' : 'Noon to 3AM'}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-dive-text font-semibold">{t('sunday')}</span>
              <span className="text-dive-text-dim">
                {language === 'fr' ? '14h à 3AM' : '2PM to 3AM'}
              </span>
            </div>
          </div>

          <div className="border-t border-dive-border pt-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="iconify i-ri-music-2-line text-3xl text-dive-red" />
              <h2 className="text-3xl font-display text-dive-text">
                <Link to="/karaoke" className="hover:text-dive-accent transition-colors">
                  {t('karaoke')}
                </Link>
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-lg">
                <span className="text-dive-text font-semibold">{t('friday')}</span>
                <span className="text-dive-text-dim">
                  {language === 'fr' ? '22h à 3AM' : '10PM to 3AM'}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-dive-text font-semibold">{t('saturday')}</span>
                <span className="text-dive-text-dim">
                  {language === 'fr' ? '22h à 3AM' : '10PM to 3AM'}
                </span>
              </div>
            </div>
            <Link 
              to="/karaoke" 
              className="mt-6 block w-full bg-dive-red hover:bg-dive-red-light text-white text-center py-3 rounded-md font-medium transition-colors"
            >
              {language === 'fr' ? 'Voir la liste de karaoké' : 'View karaoke list'}
            </Link>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="bg-dive-bg-light border border-dive-border rounded-lg p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <span className="iconify i-ri-map-pin-line text-3xl text-dive-accent" />
            <h2 className="text-3xl font-display text-dive-text">{t('address')}</h2>
          </div>
          <div className="space-y-3 mb-6">
            <p className="text-dive-text-dim text-lg">
              540 rue Boucher
            </p>
            <p className="text-dive-text-dim text-lg">
              Montréal, QC H2J 2S4
            </p>
          </div>
          
          <div className="flex items-center gap-3 mb-4 mt-8">
            <span className="iconify i-ri-phone-line text-3xl text-dive-accent" />
            <h2 className="text-3xl font-display text-dive-text">{t('phone')}</h2>
          </div>
          <a href="tel:+15142720206" className="text-dive-text-dim text-lg hover:text-dive-accent transition-colors">
            +1 (514) 272-0206
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
