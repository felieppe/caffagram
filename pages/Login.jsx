import React from "react";
import styles from '../styles/Login.module.css';

function Login() {
  return (
    <div className={styles.login_container}>
      <div className={styles.logo_container}>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRNYYPTbBU17CbvR5JIjgU7TVqu0T6ry7A9g&s" 
          alt="Caffagram Logo" 
          className={styles.logo}
        />
      </div>
      <h1 className={styles.title}>Caffagram</h1>
      <form className={styles.login_form}>
        <input
          type="email"
          placeholder="email"
          className={styles.login_input}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          className={styles.login_input}
        />
        <br />
        <button type="submit" className={styles.login_button}>Login</button>
      </form>
      <p className={styles.signup_text}>
        Create account <a href="/signup" className={styles.signup_link}>here</a>
      </p>
    </div>
  );
}

export default Login;