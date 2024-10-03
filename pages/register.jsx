import { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, username })
      });
      
      const data = await response.json();
      if (data.success) {
        console.log('Cuenta creada exitosamente');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Ocurrió un error en el registro');
    }
  };

  return (
    <div>
      <h2>Crear una Cuenta</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
