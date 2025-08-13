import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Header.module.css";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">Forum</Link>
      </div>

      <nav className={styles.nav}>
        {user ? (
          <>
            <button onClick={handleLogout} className={styles.navButton}>
              Atsijungti
            </button>
            <Link to="/ask" className={styles.askButton}>
              Užduoti klausimą
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navButton}>
              Prisijungti
            </Link>
            <Link to="/register" className={styles.navButton}>
              Registruotis
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
