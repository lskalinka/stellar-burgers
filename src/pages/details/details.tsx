import styles from './details.module.css';
import { FC, memo, ReactNode } from 'react';

type DetailsTitle = {
  title: string;
  children?: ReactNode;
};

export const DetailsPage: FC<DetailsTitle> = memo(({ title, children }) => (
  <>
    <div className={styles.header}>
      <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
    </div>
    <div className={styles.content}>{children}</div>
  </>
));
