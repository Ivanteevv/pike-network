import styles from "./site-footer.module.css";

export function SiteFooter({ network }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.frame}>
        <div className={styles.lead}>
          <div className={styles.leadActions}>
            <div className={styles.contactGroup}>
              <p className={styles.kicker}>Телефон</p>
              <a className={styles.primaryContact} href={`tel:${network.phoneE164}`}>
                <span className={styles.linkLabel}>{network.phoneDisplay}</span>
              </a>
            </div>

            <div className={styles.contactGroup}>
              <p className={styles.kicker}>Соцсети</p>
              <div className={styles.socials} aria-label="Соцсети сети">
                {network.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className={styles.linkLabel}>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p>{`© ${year} ${network.displayName}`}</p>
        </div>
      </div>
    </footer>
  );
}
