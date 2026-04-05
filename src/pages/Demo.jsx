import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useLocation, useNavigate } from "react-router-dom";

export default function Demo() {
    const { store, createContact, updateContact } = useGlobalReducer();
    const navigate = useNavigate();
    const params = new URLSearchParams(useLocation().search);
    const id = params.get("id");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id) {
            const c = store.contacts.find(x => x.id == id);
            if (c) setForm(c);
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) await updateContact(id, form);
        else await createContact(form);
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h1>{id ? "Editar contacto" : "Nuevo contacto"}</h1>

            <form onSubmit={handleSubmit} className="mt-3">

                <input
                    className="form-control mb-2"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="phone"
                    placeholder="Teléfono"
                    value={form.phone}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="address"
                    placeholder="Dirección"
                    value={form.address}
                    onChange={handleChange}
                />

                <button className="btn btn-success">
                    {id ? "Guardar cambios" : "Crear contacto"}
                </button>
            </form>
        </div>
    );
}
