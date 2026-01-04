import React from 'react';
import './Register.css';
import { Button } from '../../components/Button/Button';
import { TextField } from '../../components/TextField/TextField';
import logoImage from '../../assets/logo.png';

const Register: React.FC = () => {
  return (
    <div className="register">
      {/* Background with overlay */}
      <div className="register__background">
        <div className="register__background-overlay" />
      </div>

      {/* Header */}
      <header className="register__header">
        <div className="register__header-content">
          <div className="register__logo-section">
            <div className="register__logo">
              <img src={logoImage} alt="Pasillo Austral Logo" className="register__logo-img" />
            </div>
            <div className="register__brand">
              <h1 className="register__brand-text">Pasillo Austral</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Register Card */}
      <div className="register__card">
        <div className="register__card-header">
          <h2 className="register__title">Registrate</h2>
          <p className="register__terms">
            Al continuar, aceptás nuestros{' '}
            <a href="#" className="register__link">Términos de uso</a>
            {' '}y confirmás que entendés la{' '}
            <a href="#" className="register__link">Política de privacidad.</a>
          </p>
        </div>

        <div className="register__form">
          <div className="register__field-wrapper">
            <TextField
              label="Email"
              type="email"
              required
              placeholder=""
            />
          </div>

          <div className="register__field-wrapper">
            <TextField
              label="Contraseña"
              type="password"
              required
              placeholder=""
            />
          </div>

          <div className="register__links">
            <div className="register__link-group">
              <span className="register__link-group-text">¿Ya tenes usuario?</span>
              {' '}
              <a href="#" className="register__link">Inicia Sesión</a>
            </div>
          </div>

          <Button variant="primary">
            Registrarme
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;

