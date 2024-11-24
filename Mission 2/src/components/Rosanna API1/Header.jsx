import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/turnersLogo.png";

export default function HeaderAPI1() {
  return (
    <div>
      <section className={styles.headerBar}>
        <img src={logo} className={styles.logo}></img>
        {/* <h2 className={styles.headerType}>Turners</h2> */}
      </section>
    </div>
  );
}
