import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section id="programs" className={styles.aboutSection}>
      <div className={styles.content}>
        <span>Why choose us</span>
        <h2>Excellence in education and student life</h2>
        <p>
          Experience undergraduate and graduate programs created to prepare you for the careers of tomorrow, supported by experienced faculty and a modern campus environment.
        </p>
        <div className={styles.cards}>
          <article>
            <h3>World-class programs</h3>
            <p>Specialized majors, accredited degrees, and a strong focus on innovation.</p>
          </article>
          <article>
            <h3>Campus experience</h3>
            <p>Modern facilities, student clubs, and events that bring learning to life.</p>
          </article>
          <article>
            <h3>Global community</h3>
            <p>A diverse student body and strong industry partnerships to support your future.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
