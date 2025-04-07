import { Trash } from '@phosphor-icons/react';

import styles from './styles.module.css';

export function TaskCard() {
  return (
    <div className={styles.task}>
      <input type="checkbox" name="" id="" />
      <p>
        Integer urna interdum massa libero auctor neque turpis turpis semper.
        Duis vel sed fames integer.
      </p>

      <button type="button">
        <Trash size={24} />
      </button>
    </div>
  );
}
