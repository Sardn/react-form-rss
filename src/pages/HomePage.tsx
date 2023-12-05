import styles from '../styles/main.module.css';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      <nav>
        <Link to="/hook-form" className={styles.link}>
          Hook form
        </Link>
        <Link to="/uncontrolled-form" className={styles.link}>
          Uncontrolled form
        </Link>
      </nav>
    </>
  );
};
export default MainPage;
