import React from 'react';
import './Login.css';
import { Button } from '../../components/Button/Button';
import { TextField } from '../../components/TextField/TextField';
import logoImage from '../../assets/logo.png';

const Login: React.FC = () => {
  return (
    <div className="login">
      {/* Background with overlay */}
      <div className="login__background">
        <div className="login__background-overlay" />
      </div>

      {/* Header */}
      <header className="login__header">
        <div className="login__header-content">
          <div className="login__logo-section">
            <div className="login__logo">
              <img src={logoImage} alt="Pasillo Austral Logo" className="login__logo-img" />
            </div>
            <div className="login__brand">
              <h1 className="login__brand-text">Pasillo Austral</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Login Card */}
      <div className="login__card">
        <div className="login__card-header">
          <h2 className="login__title">Iniciar sesión</h2>
          <p className="login__terms">
            Al continuar, aceptás nuestros{' '}
            <a href="#" className="login__link">Términos de uso</a>
            {' '}y confirmás que entendés la{' '}
            <a href="#" className="login__link">Política de privacidad.</a>
          </p>
        </div>

        <div className="login__form">
          <div className="login__field-wrapper">
            <TextField
              label="Email"
              type="email"
              required
              placeholder=""
            />
          </div>

          <div className="login__field-wrapper">
            <TextField
              label="Contraseña"
              type="password"
              required
              placeholder=""
            />
          </div>

          <div className="login__links">
            <a href="#" className="login__link login__link--forgot">
              ¿Olvidaste tu contraseña?
            </a>
            <div className="login__register">
              <span className="login__register-text">¿Sos un nuevo usuario?</span>
              {' '}
              <a href="#" className="login__link">Registrate</a>
            </div>
          </div>

          <Button variant="primary">
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;

