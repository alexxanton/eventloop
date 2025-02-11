import Navbar from "@/components/Navbar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.ctas}>
        </div>
      </main>
    </div>
  );
}
