import styles from './FeaturesSection.module.css';

export default function FeaturesSection() {
  return (
    <section className={styles.featuresSection}>
      <h2>Student-focused campus services</h2>
      <div className={styles.grid}>
        <article>
          <h3>Modern classrooms</h3>
          <p>Technology-equipped spaces for collaborative learning.</p>
        </article>
        <article>
          <h3>Innovation labs</h3>
          <p>Hands-on labs for research, design, and entrepreneurship.</p>
        </article>
        <article>
          <h3>Student support</h3>
          <p>Advising, career guidance, and wellness services for every student.</p>
        </article>
      </div>
    </section>
  );
}
