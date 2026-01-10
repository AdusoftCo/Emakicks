import "../Admin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import { Container, Card, Table, Button, Form } from "react-bootstrap";
import { formatPrice, formatFechaAR} from '../utils/formater';

const Libreta = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    novedad: "",
    monto: "",
    fecha: ""
  });

  const navigate = useNavigate();

  const fetchLibreta = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/libreta`);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchLibreta();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_API_URL}/api/libreta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ novedad: "", monto: "", fecha: "" });
    fetchLibreta();
  };

  return (

    <Container className="my-5">
      <Card className="p-4 shadow-sm">
        <div className="d-flex align-items-center mb-3">
          <Button
            variant="link"
            className="p-0 me-3"
            style={{ fontWeight: "bolder", color: "#0d6efd" }}
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={28} />

          </Button>

          <h2 className="mb-0">Libreta diaria</h2>
        </div>

          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Control
              placeholder="Novedad"
              value={form.novedad}
              onChange={e => setForm({ ...form, novedad: e.target.value })}
              required
            />

            <Form.Control
              type="number"
              placeholder="Monto"
              value={form.monto}
              onChange={e => setForm({ ...form, monto: e.target.value })}
              required
              className="mt-2"
            />

            <Form.Control
              type="date"
              value={form.fecha}
              onChange={e => setForm({ ...form, fecha: e.target.value })}
              className="mt-2"
            />

            <Button type="submit" className="mt-2 category-btn">
              Guardar
            </Button>
          </Form>

          <Table striped>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Novedad</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id}>
                  <td>{formatFechaAR(i.created_at)}</td>
                  <td>{i.novedad}</td>
                  <td>{formatPrice(i.monto)}</td>
                </tr>
              ))}
            </tbody>
        </Table>
      </Card>
  </Container>
  );
};

export default Libreta;
