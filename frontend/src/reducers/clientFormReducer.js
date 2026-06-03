export const initialForm = {
  name: '',
  company: '',
  email: '',
  status: 'active',
};

export const initialState = {
  form: initialForm,
  error: '',
};
export function clientFormReducer(state, action) {
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
        form: {
          name: action.client.name,
          company: action.client.company,
          email: action.client.email,
          status: action.client.status,
        },
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
