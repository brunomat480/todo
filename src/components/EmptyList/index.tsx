import clipboardImg from '@/assets/img/clipboard.png';

import styles from './styles.module.css';

export function EmptyList() {
  return (
    <div className={styles.container}>
      <img src={clipboardImg} alt="Prancheta" />
      <p>
        <strong>Você ainda não tem tarefas cadastradas</strong> <br /> Crie
        tarefas e organize seus itens a fazer
      </p>
    </div>
  );
}
