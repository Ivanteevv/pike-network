import { BrandLink } from "@/components/brand-link";
import buttonStyles from "@/components/button.module.css";
import { cx } from "@/lib/class-names";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.kicker}>404</p>
        <h1>Такой страницы бара пока нет</h1>
        <p>
          Возможно, ссылка устарела или точка ещё не добавлена в сеть. На
          главной уже можно выбрать доступную локацию.
        </p>
        <BrandLink
          variant="ghost"
          href="/"
          className={cx(
            buttonStyles.buttonBase,
            buttonStyles.buttonGhostAction,
            buttonStyles.buttonLg,
            buttonStyles.buttonArrow,
            styles.link
          )}
        >
          Вернуться на главную
        </BrandLink>
      </div>
    </main>
  );
}
