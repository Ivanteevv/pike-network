import { BrandLink } from "@/components/brand-link";
import { getSocialLinks } from "@/lib/content/content-guards";
import styles from "./site-footer.module.css";

export function SiteFooter({ network }) {
  const year = new Date().getFullYear();
  const socialLinks = getSocialLinks(network.socials);
  const hasPhoneLink = network.phoneDisplay && network.phoneE164;

  return (
    <footer className={styles.footer}>
      <div className={styles.frame}>
        <div className={styles.lead}>
          <div className={styles.leadActions}>
            {hasPhoneLink ? (
              <div className={styles.contactGroup}>
                <p className={styles.kicker}>Телефон</p>
                <BrandLink
                  variant="phone"
                  className={styles.primaryContact}
                  href={`tel:${network.phoneE164}`}
                >
                  {network.phoneDisplay}
                </BrandLink>
              </div>
            ) : null}

            {socialLinks.length > 0 ? (
              <div className={styles.contactGroup}>
                <p className={styles.kicker}>Соцсети</p>
                <div className={styles.socials} aria-label="Соцсети сети">
                  {socialLinks.map((social) => (
                    <BrandLink
                      key={social.label}
                      variant="footer"
                      className={styles.socialLink}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {social.label}
                    </BrandLink>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p>{`© ${year} ${network.displayName}`}</p>
        </div>
      </div>
    </footer>
  );
}
