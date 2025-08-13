import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Admin.css';
import { useAuth } from '../components/AuthContext';

const Admin = () => {
    const { login } = useAuth();
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (role === '' || password === '') {
            setErrorMessage('Por favor, rellene todos los campos.');
        } else {
            const loginSuccess = login({ role, password });
            if (loginSuccess) {
                console.log('Logging in with:', { role, password });
                setErrorMessage('');
                navigate('/dashboard');
            } else {
                setErrorMessage('Usuario o Password incorrecto.');
            }
        }
    };

    return (
        <div className="wrapper">
            <div className="login">
                <div className="text-center">
                    <img
                        src="https://img.icons8.com/color/100/customer-skin-type-7.png"
                        alt="Icono de usuario"
                        width={100}
                        height={100}
                        className="img-fluid d-block mx-auto"
                    />
                </div>

                <form id="login-form" onSubmit={handleSubmit} className="mt-5">
                    <div className="mb-3">
                        <input
                            type="text"
                            name="role"
                            id="role"
                            className="form-control"
                            placeholder="Usuario"
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="recuperar-link mt-3">
                            <a href="#" className="disabled-link">Recuperar Contraseña</a>
                        </div>
                    </div>

                    <div className="mb-3 mt-5">
                        <button type="submit" className="btn rounded-pill btn-block" style={{ backgroundColor: '#5728b7', color: 'white', borderRadius: '5px' }}>
                            Enviar
                        </button>
                    </div>
                </form>

                {errorMessage && <p id="error-message" className="mb-0" style={{ minHeight: '55px', color: 'red' }}>{errorMessage}</p>}    
            </div>
        </div>
    );
};

export default Admin;
