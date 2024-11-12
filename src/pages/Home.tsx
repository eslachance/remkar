import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Taverne Bar La Remise</h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-center px-5">
        <div className="p2 sm:p-10 border-1 border-solid border-black/50 rounded-md">
          <h2>Addresse</h2>
          <div>
            540 rue Boucher
          </div>
          <div>Montréal, QC H2J 2S4</div>
          <h2>Telephone</h2>
          <div>
            +1 (514) 272-0206
          </div>
        </div>
        <div className="p2 sm:p-10 border-1 border-solid border-black/50 rounded-md">
          <div>
            <h2>Heures D'ouverture</h2>
            <p>
              <strong>Lun-Sam</strong>: Midi à 3AM
            </p>
            <p>
              <strong>Dimanche</strong>: 14h à 3AM
            </p>
          </div>
          <div>
            <h2><Link to="/karaoke">Karaoké</Link></h2>
            <p>
              <strong>Samedi</strong>: 22h à 3AM
            </p>
            <p>
              <strong>Dimanche</strong>: 22h à 3AM
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
