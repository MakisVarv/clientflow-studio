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
export function contactFormReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    case 'LOAD_CONTACT':
      return {
        ...state,
        form: {
          name: action.contact.name,
          company: action.contact.company,
          email: action.contact.email,
          status: action.contact.status,
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
