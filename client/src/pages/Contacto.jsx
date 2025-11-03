import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Admin.css';

const Contact = () => {
  return (
    <article className="third-screen-article">
      <div className="title-container">
        <h1>Contáctanos</h1>
      </div>

      {/* Formulario */}
      <div className="form-container">
        <form action="https://formspree.io/f/xeoqkzal" method="POST">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" name="email" className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">Mensaje</label>
            <textarea id="message" name="message" className="form-control" rows="3" required></textarea>
          </div>

          <div className="button-container">
            <button type="submit" className="btn" style={{ backgroundColor: '#5728b7', color: 'white' }}>Enviar</button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default Contact;
