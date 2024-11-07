import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/Login.module.css';
import { login } from "@/utils/api";
import { UserContext } from "./_app";
import Image from 'next/image';
import Link from 'next/link';

function Login() {
  const [error, setError] = useState('')
  const { setUser } = useContext(UserContext)

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
    e.preventDefault();

    let email = e.target.email.value;
    let password = e.target.password.value;

    login(email, password).then((res) => {
      if (res.error) {
        setError(res.error);
        return alert(error)
      } else {
        let {_id, username, token } = res
        
        const cookieOptions = { maxAge: 2592000, path: '/', secure: process.env.NODE_ENV === 'production' }
        document.cookie = `token=${token}; ${Object.keys(cookieOptions).map(key => `${key}=${cookieOptions[key]}`).join('; ')}`;

        setUser({ id: _id, username, token }); 
        window.location.href = '/feed';
      }}).catch((error) => {console.error(error)})
  }
  
  useEffect(() => {
    if (document.cookie.includes('token')) {
      window.location.href = '/feed';
    }
  }, [])

  return (
    <div className={styles.login_container}>
      <div className={styles.logo_container}>
        <Link href={"/"}><Image src="/logo.svg" alt="Caffagram Logo" width={250} height={250} /></Link>
      </div>
      <h1 className={styles.title}>Ingresa en tu cuenta</h1>
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
        Create account <Link href="/register" className={styles.register_link}>here</Link>
      </p>
    </div>
  );
}

export default Login;