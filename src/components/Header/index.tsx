import logoImg from '@/assets/img/logo.png';
import styles from '@/components/Header/styles.module.css';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <a href="#">
        <img src={logoImg} alt="Logo do Todo" />
      </a>
    </header>
  );
}
