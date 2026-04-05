import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Single = () => {
    const { store } = useGlobalReducer();
    const { theId } = useParams();
    const contact = store.contacts.find(c => c.id === parseInt(theId));

    return (
        <div className="container mt-4 text-center">
            <h1 className="display-4">{contact?.name}</h1>
            <p>{contact?.email}</p>
            <p>{contact?.phone}</p>
            <p>{contact?.address}</p>

            <Link to="/" className="btn btn-primary mt-3">
                Volver
            </Link>
        </div>
    );
};

export default Single;
