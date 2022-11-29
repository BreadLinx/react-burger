import styles from "./loader.module.css";

export function Loader() {
  return (
    <div className={styles.spinner}>
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
  );
}
