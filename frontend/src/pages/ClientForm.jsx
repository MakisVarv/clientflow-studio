import { useEffect, useReducer } from 'react';

const initialForm = {
  name: '',
  company: '',
  email: '',
  status: 'active',
};

const initialState = {
  form: initialForm,
  error: '',
};
function clientFormReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    case 'LOAD_CLIENT':
      return {
        ...state,
        form: action.client,
        error: '',
      };

    case 'RESET_FORM':
      return initialState;

    case 'SET_ERROR':
      return {
        ...state,
        error: action.message,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: '',
      };

    default:
      return state;
  }
}

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
        ...form,
        id: editingClient.id,
      };

      onUpdateClient(updatedClient);
    } else {
      const client = {
        ...form,
        id: Date.now(),
      };

      onCreateClient(client);
    }

    dispatch({ type: 'RESET_FORM' });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleFieldChange}
        ></input>
        <label htmlFor="company">Company</label>
        <input
          name="company"
          type="text"
          placeholder="Company Name"
          value={form.company}
          onChange={handleFieldChange}
        ></input>
        <label htmlFor="email">E-mail</label>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleFieldChange}
        ></input>
        <label htmlFor="status">Status</label>
        <select
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
    </>
  );
}
