import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    const api = "https://playground.4geeks.com/contact";
    const agenda = "YoannisRP_agenda";

    const loadContacts = async () => {
        const resp = await fetch(`${api}/agendas/${agenda}/contacts`);
        const data = await resp.json();
        dispatch({ type: "set_contacts", payload: data.contacts || [] });
    };

    const createContact = async (contact) => {
        const resp = await fetch(`${api}/agendas/${agenda}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact)
        });
        const data = await resp.json();
        dispatch({ type: "add_contact", payload: data });
    };

    const updateContact = async (id, contact) => {
        const resp = await fetch(`${api}/agendas/${agenda}/contacts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact)
        });
        const data = await resp.json();
        dispatch({ type: "update_contact", payload: data });
    };

    const deleteContact = async (id) => {
        await fetch(`${api}/agendas/${agenda}/contacts/${id}`, {
            method: "DELETE"
        });
        dispatch({ type: "delete_contact", payload: id });
    };

    return (
        <StoreContext.Provider value={{
            store,
            dispatch,
            loadContacts,
            createContact,
            updateContact,
            deleteContact
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    return useContext(StoreContext);
}
