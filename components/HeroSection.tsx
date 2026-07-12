import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <span className={styles.suptitle}>Discover your future</span>
        <h1>Study at the university that inspires ambition</h1>
        <p>Join a vibrant campus with global programs, modern facilities, and a welcoming student community.</p>
        <div className={styles.actions}>
          <Link href="/tour" className={styles.primaryButton}>Start Virtual Tour</Link>
          <Link href="/tour" className={styles.secondaryButton}>View 360 Gallery</Link>
        </div>
      </div>
    </section>
  );
}
