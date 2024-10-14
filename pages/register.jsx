import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css';
import { register } from '../utils/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

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

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.message || 'Ocurrió un error en el registro');
      }
    } catch (error) {
      setError('Error de servidor. Intenta más tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Crear una Cuenta</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Cuenta creada exitosamente.</p>}

      <form onSubmit={handleSubmit}>
        <input
          className={styles.data}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
        <input
          className={styles.data}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <input
          className={styles.data}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
          required
        />
        <button className={styles.submitButton} type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
