import { SignInButton } from "@clerk/clerk-react";
import styles from './home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Meet:Connect with the people around you</h3>
      <p className={styles.button}><SignInButton /></p>
    </div>
  );
}
