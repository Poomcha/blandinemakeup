import styles from "./prestation.module.css";

import cN from "classnames";
import { patrick_hand_sc } from "../font";
import Social from "@/components/social/social";

export default function Prestations() {
  return (
    <div
      className={cN(styles.root, "page", "flex", "flex-column", "p-relative")}
    >
      <h1
        className={cN(
          styles.title,
          "title",
          patrick_hand_sc.className,
          "bg-black"
        )}
      >
        PRESTATIONS
      </h1>
      <div className={cN(styles.imgctn, "w-100pr", "h-100dvh")}></div>
      <section className={cN(styles.section, "w-100pr", "flex", "flex-column")}>
        <table
          className={cN(
            styles.table,
            "w-100pr",
            "gradient-border",
            "rounded",
            "purple-box-shadow"
          )}
        >
          <caption
            className={cN("w-100pr", patrick_hand_sc.className, styles.caption)}
          >
            <span>BEAUTÉ</span>
          </caption>
          <tbody>
            <tr>
              <td className={cN("w-50pr", "text-left")}>Jour</td>
              <td className={cN("w-50pr", "text-right")}>40€</td>
            </tr>
            <tr>
              <td className={cN("w-50pr", "text-left")}>Soirée</td>
              <td className={cN("w-50pr", "text-right")}>60€</td>
            </tr>
            <tr>
              <td className={cN("w-50pr", "text-left")}>+ faux cils</td>
              <td className={cN("w-50pr", "text-right")}>+ 15€</td>
            </tr>
          </tbody>
        </table>
        <table
          className={cN(
            styles.table,
            "w-100pr",
            "gradient-border",
            "rounded",
            "purple-box-shadow"
          )}
        >
          <caption
            className={cN("w-100pr", patrick_hand_sc.className, styles.caption)}
          >
            <span>ARTISTIQUE</span>
          </caption>
          <tbody>
            <tr>
              <td className={cN("w-50pr", "text-center")}>Sur devis</td>
            </tr>
          </tbody>
        </table>
        <table
          className={cN(
            styles.table,
            "w-100pr",
            "gradient-border",
            "rounded",
            "purple-box-shadow"
          )}
        >
          <caption
            className={cN("w-100pr", patrick_hand_sc.className, styles.caption)}
          >
            <span>ENFANT</span>
          </caption>
          <tbody>
            <tr>
              <td className={cN("w-50pr", "text-center")}>Sur devis</td>
            </tr>
          </tbody>
        </table>
        <table
          className={cN(
            styles.table,
            "w-100pr",
            "gradient-border",
            "rounded",
            "purple-box-shadow"
          )}
        >
          <caption
            className={cN("w-100pr", patrick_hand_sc.className, styles.caption)}
          >
            <span>MARIAGE</span>
          </caption>
          <tbody>
            <tr>
              <td className={cN("w-50pr", "text-left")}>Essais (recommandé)</td>
              <td className={cN("w-50pr", "text-right")}>Sur devis</td>
            </tr>
            <tr>
              <td className={cN("w-50pr", "text-left")}>Jour J (sans essai)</td>
              <td className={cN("w-50pr", "text-right")}>Sur devis</td>
            </tr>
            <tr>
              <td className={cN("w-50pr", "text-left")}>Jour J (avec essai)</td>
              <td className={cN("w-50pr", "text-right")}>Sur devis</td>
            </tr>
            <tr>
              <td className={cN("w-50pr", "text-left")}>Invités</td>
              <td className={cN("w-50pr", "text-right")}>Sur devis</td>
            </tr>
          </tbody>
        </table>
        <table
          className={cN(
            styles.table,
            "w-100pr",
            "gradient-border",
            "rounded",
            "purple-box-shadow"
          )}
        >
          <caption
            className={cN("w-100pr", patrick_hand_sc.className, styles.caption)}
          >
            <span>SHOOTING</span>
          </caption>
          <tbody>
            <tr>
              <td className={cN("w-50pr", "text-left")}>Entre 2h et 4h</td>
              <td className={cN("w-50pr", "text-right")}>Sur devis</td>
            </tr>
            <tr>
              <td className={cN("w-50pr", "text-left")}>Entre 4h et 6h</td>
              <td className={cN("w-50pr", "text-right")}>Sur devis</td>
            </tr>
            <tr>
              <td className={cN("w-50pr", "text-left")}>Entre 6h et 8h</td>
              <td className={cN("w-50pr", "text-right")}>Sur devis</td>
            </tr>
          </tbody>
        </table>
        <table
          className={cN(
            styles.table,
            "w-100pr",
            "gradient-border",
            "rounded",
            "purple-box-shadow"
          )}
        >
          <caption
            className={cN("w-100pr", patrick_hand_sc.className, styles.caption)}
          >
            <span>TOURNAGE</span>
          </caption>
          <tbody>
            <tr>
              <td className={cN("w-50pr", "text-center")}>Sur devis</td>
            </tr>
          </tbody>
        </table>
        <table
          className={cN(
            styles.table,
            "w-100pr",
            "gradient-border",
            "rounded",
            "purple-box-shadow"
          )}
        >
          <caption
            className={cN("w-100pr", patrick_hand_sc.className, styles.caption)}
          >
            <span>ÉVÊNEMENT</span>
          </caption>
          <tbody>
            <tr>
              <td className={cN("w-50pr", "text-left")}>Festival</td>
              <td className={cN("w-50pr", "text-right")}>Sur devis</td>
            </tr>
            <tr>
              <td className={cN("w-50pr", "text-left")}>Anniversaire</td>
              <td className={cN("w-50pr", "text-right")}>Sur devis</td>
            </tr>
            <tr>
              <td className={cN("w-50pr", "text-left")}>EVJF ou EVG</td>
              <td className={cN("w-50pr", "text-right")}>Sur devis</td>
            </tr>
            <tr>
              <td className={cN("w-50pr", "text-left")}>Clubbing</td>
              <td className={cN("w-50pr", "text-right")}>Sur devis</td>
            </tr>
          </tbody>
        </table>
        <div className={cN(styles.contacts, "flex", "flex-center")}>
          <Social />
        </div>
      </section>
    </div>
  );
}
