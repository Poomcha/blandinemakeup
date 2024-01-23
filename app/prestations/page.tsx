import styles from './prestation.module.css';

export default function Prestations() {
  return (
    <section>
      <h1>Prestations</h1>
      <ul>
        <li>
          <h2>Maquillage Beauté</h2>
          <ul>
            <li>
              <span>Jour: 40€</span>
            </li>
            <li>
              <span>Soirée</span>
              <ul>
                <li>Classique: 60€</li>
                <li>Faux cils: 15€</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <h2>Maquillage Artistique</h2>
          <span>Prestation sur devis</span>
        </li>
        <li>
          <h2>Maquillage Enfant</h2>
          <span>Prestation sur devis</span>
        </li>
        <li>
          <h2>Maquillage Mariage</h2>
          <ul>
            <li>Essai maquillage (recommandé): Prestation sur devis</li>
            <li>Maquillage Jour J (sans essai): Prestation sur devis</li>
            <li>Maquillage Jour J (avec essai): Prestation sur devis</li>
            <li>Maquillage Invités: Prestation sur devis</li>
          </ul>
        </li>
        <li>
          <h2>Shooting</h2>
          <ul>
            <li>Entre 2h et 4h: Prestation sur devis</li>
            <li>Entre 4h et 6h: Prestation sur devis</li>
            <li>Entre 6h et 8h: Prestation sur devis</li>
          </ul>
        </li>
        <li>
          <h2>Tournage</h2>
          <span>Prestation sur devis</span>
        </li>
        <li>
          <h2>Evênements</h2>
          <ul>
            <li>Festival: Prestation sur devis</li>
            <li>Anniversaire: Prestation sur devis</li>
            <li>EVJ ou EVG: Prestation sur devis</li>
            <li>Soirée Clubbing: Prestation sur devis</li>
          </ul>
        </li>
      </ul>
    </section>
  );
}
