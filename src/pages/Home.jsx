import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const { store, loadContacts, deleteContact } = useGlobalReducer();

    useEffect(() => {
        loadContacts();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Contactos</h1>
                <Link to="/demo" className="btn btn-success">Nuevo contacto</Link>
            </div>

            {store.contacts.length === 0 && <p>No hay contactos.</p>}

            {store.contacts.map(contact => (
                <div key={contact.id} className="card p-3 mb-3">
                    <h5>{contact.name}</h5>
                    <p>{contact.email}</p>
                    <p>{contact.phone}</p>
                    <p>{contact.address}</p>

                    <div className="d-flex gap-2">
                        <Link to={`/demo?id=${contact.id}`} className="btn btn-primary">
                            Editar
                        </Link>

                        <button
                            className="btn btn-danger"
                            onClick={() => deleteContact(contact.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
