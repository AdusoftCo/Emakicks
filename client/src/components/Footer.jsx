import React from 'react';
import '../Admin.css';

const Footer = () => {

    return (
        <footer className="text-center mt-5" style={{ backgroundColor: '#abd5db', padding: '20px' }}>
        {/* Social Icons */}
        <div className="social-icons mb-3">
            <a href="https://facebook.com/oaduviri" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook" style={{ fontSize: '24px', margin: '0 10px' }}></i>
            </a>
            <a href="https://wa.me/5491150511072" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp" style={{ fontSize: '24px', margin: '0 10px', color: 'rgb(3, 129, 20)' }}></i>
            </a>
        </div>

        {/* Footer Text */}
        <div className="footer-text">
            <p>Emakick's 2025 @ Todos los derechos reservados</p>
            <p>
                Diseñado por Adusoft & Co. <span style={{ color: '#f50707', fontWeight: 'bold' }}>❤</span>
            </p>
        </div>
        </footer>
    );
};

export default Footer;
