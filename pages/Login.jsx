import React, { useEffect, useState } from "react";
import styles from '../styles/Login.module.css';
import { login } from "@/utils/api";

function Login() {
  const [error, setError] = useState('')

  const validateForm = (e) => {
    if (!e.target.email.value || !e.target.password.value) {
      setError('Por favor, completa todos los campos');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.email.value)) {
      setError('Ingresa un email válido');
      return false;
    }
    if (e.target.password.value.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  function handleSubmit(e){
    if (!validateForm(e)) return alert(error);

    console.log("Email: ", e.target.email.value)
    console.log("Password: ", e.target.password.value)

    e.preventDefault();

    let data = {email: e.target.email.value, password: e.target.password.value}
    login(data).then((res) => {
      if (res.error) {
        setError(res.error);
        return alert(error)
      } else {
        let {_id, token } = res
        document.cookie = `token=${token}; max-age=3600; path=/`;

        window.location.href = '/feed';
      }}).catch((error) => {
      console.error('Error:', error)
    })
  }
  
  useEffect(() => {
    if (document.cookie.includes('token')) {
      window.location.href = '/feed';
    }
  }, [])

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
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          id="email"
          className={styles.login_input}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          id="password"
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