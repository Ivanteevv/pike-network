import {
  Cormorant_Garamond,
  Literata,
  Lora,
  Playfair_Display,
  Prata,
} from "next/font/google";
import Link from "next/link";
import styles from "./page.module.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

const literata = Literata({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

const prata = Prata({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
});

const fontOptions = [
  {
    name: "Cormorant Garamond",
    className: cormorant.className,
    note: "Более барочный и мягкий вариант, хорошо держит крупный бренд.",
  },
  {
    name: "Literata",
    className: literata.className,
    note: "Спокойнее и плотнее, меньше театральности, больше редакционного характера.",
  },
  {
    name: "Playfair Display",
    className: playfair.className,
    note: "Выбранный вариант: контрастный, заметный, ближе к афише и вывеске.",
  },
  {
    name: "Lora",
    className: lora.className,
    note: "Теплый, читабельный, менее парадный. Хорош для заголовков поменьше.",
  },
  {
    name: "Prata",
    className: prata.className,
    note: "Самый вывесочный вариант: сухой, уверенный, с винтажным ресторанным тоном.",
  },
];

export const metadata = {
  title: "Сравнение шрифтов | Бар Щука",
};

export default function FontComparePage() {
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <Link href="/" className={styles.backLink}>
          На главную
        </Link>
        <p className={styles.kicker}>Сравнение display-шрифтов</p>
        <h1>Щука</h1>
        <p>
          Одинаковый текст, одинаковые размеры и одинаковый фон. Меняется только
          шрифт крупного бренда и заголовков.
        </p>
      </section>

      <section className={styles.grid} aria-label="Варианты шрифтов">
        {fontOptions.map((font) => (
          <article key={font.name} className={styles.card}>
            <div className={styles.cardMeta}>
              <span>{font.name}</span>
            </div>
            <div className={font.className}>
              <h2 className={styles.brand}>Бар Щука</h2>
              <p className={styles.headline}>
                Теплый бар для вечера после работы
              </p>
            </div>
            <p className={styles.copy}>
              Еда, напитки, компания и спортивные трансляции, ради которых
              удобно собраться вместе.
            </p>
            <div className={styles.actions}>
              <span>Выбрать бар</span>
              <span>Позвонить</span>
            </div>
            <p className={styles.note}>{font.note}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
