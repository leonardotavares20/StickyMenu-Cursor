import React from "react";
import styles from "./Header.module.css";
import { forwardRef } from "react";
import Magnetic from "./Magnetic";

const Header = forwardRef(function (props, ref) {
  return (
    <header className={styles.header}>
      <Magnetic>
        <div className={styles.burger}>
          <div ref={ref} className={styles.bounce}></div>
        </div>
      </Magnetic>
    </header>
  );
});

export default Header;
