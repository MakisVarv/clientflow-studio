import { useEffect, useReducer } from 'react';
import {
  clientFormReducer,
  initialState,
} from '../reducers/clientFormReducer';

export default function ClientForm({
  onCreateClient,
  onUpdateClient,
  onCancelEdit,
  editingClient,
}) {
  const [state, dispatch] = useReducer(
    clientFormReducer,
    initialState,
  );

  const { form, error } = state;
  function handleCancel() {
    onCancelEdit();
    dispatch({ type: 'RESET_FORM' });
  }
  useEffect(() => {
    if (editingClient) {
      dispatch({ type: 'LOAD_CLIENT', client: editingClient });
    } else {
      dispatch({ type: 'RESET_FORM' });
    }
  }, [editingClient]);
  function handleFieldChange(e) {
    const { name, value } = e.target;

    dispatch({
      type: 'CHANGE_FIELD',
      field: name,
      value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'CLEAR_ERROR' });
    if (
      form.name.trim() === '' ||
      form.company.trim() === '' ||
      form.email.trim() === ''
    ) {
      dispatch({
        type: 'SET_ERROR',
        message: 'All fields are required',
      });
      return;
    }
    if (!form.email.includes('@')) {
      dispatch({
        type: 'SET_ERROR',
        message: 'Enter a valid email',
      });
      return;
    }
    if (editingClient) {
      const updatedClient = {
        ...editingClient,
        ...form,
      };

      onUpdateClient(updatedClient);
    } else {
      const client = {
        ...form,
        id: crypto.randomUUID(),
      };

      onCreateClient(client);
    }

    dispatch({ type: 'RESET_FORM' });
  }
  return (
    <div className="client-form">
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleFieldChange}
        ></input>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Company Name"
          value={form.company}
          onChange={handleFieldChange}
        ></input>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleFieldChange}
        ></input>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleFieldChange}
        >
          <option>active</option>
          <option>inactive</option>
          <option>lead</option>
        </select>
        <input
          type="submit"
          value={editingClient ? 'Update Client' : 'Create Client'}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      {editingClient && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </div>
  );
}
