import styles from '../styles/Register.module.css';

import { register } from '@/utils/api';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from "./_app";
import Link from 'next/link';
import Image from 'next/image';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { setUser } = useContext(UserContext);

  const validateForm = () => {
    if (!email || !password || !username) {
      setError('Por favor, completa todos los campos');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Ingresa un email válido');
      return false;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      username: e.target.username.value
    };

    register(data).then((res) => {
      let {_id, token } = res

      const cookieOptions = { maxAge: 2592000, path: '/', secure: process.env.NODE_ENV === 'production', httpOnly: true }
      document.cookie = `token=${token}; ${Object.keys(cookieOptions).map(key => `${key}=${cookieOptions[key]}`).join('; ')}`;

      setUser({ id: _id, token });
      window.location.href = '/feed';
    }).catch((err) => {
      setError(err.response.data.message);
    })
  };

  useEffect(() => {
    if (document.cookie.includes('token')) {
      window.location.href = '/feed';
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <Link href={"/"}><Image src="/logo.svg" alt="Caffagram Logo" width={250} height={250} /></Link>
      </div>
      <h2 className={styles.title}>Crear una Cuenta</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Cuenta creada exitosamente.</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          id='email'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className={styles.input}
          required
        />
        <input
          id='password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className={styles.input}
          required
        />
        <input
          id='username'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Registrar</button>

        <p className={styles.login__text}>
          Create account <Link href="/login" className={styles.login__link}>here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;