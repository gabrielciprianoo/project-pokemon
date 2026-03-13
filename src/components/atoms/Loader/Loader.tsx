import styles from './Loader.module.scss';

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = 'Cargando...' }: LoaderProps) {
  return (
    <div className={styles.loader}>
      <p>{message}</p>
    </div>
  );
}
