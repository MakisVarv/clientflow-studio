import { clientFormReducer, initialState } from './clientFormReducer';
import { test, expect } from 'vitest';

test('updates one form field', () => {
  const action = {
    type: 'CHANGE_FIELD',
    field: 'name',
    value: 'Maria',
  };

  const nextState = clientFormReducer(initialState, action);

  expect(nextState.form.name).toBe('Maria');
  expect(nextState.form.company).toBe('');
  expect(nextState.error).toBe('');
});
test('sets validation error message', () => {
  const action = {
    type: 'SET_ERROR',
    message: 'All fields are required',
  };

  const nextState = clientFormReducer(initialState, action);

  expect(nextState.error).toBe('All fields are required');
  expect(nextState.form).toEqual(initialState.form);
});
test('loads client data into the form for edit mode', () => {
  const client = {
    id: 123,
    name: 'Maria Papadopoulou',
    company: 'Aegean Digital',
    email: 'maria@aegeandigital.gr',
    status: 'active',
    notes: [{ id: 1, text: 'Important client' }],
  };

  const previousState = {
    ...initialState,
    error: 'Some old error',
  };

  const nextState = clientFormReducer(previousState, {
    type: 'LOAD_CLIENT',
    client,
  });

  expect(nextState.form).toEqual({
    name: 'Maria Papadopoulou',
    company: 'Aegean Digital',
    email: 'maria@aegeandigital.gr',
    status: 'active',
  });

  expect(nextState.form.id).toBe(undefined);
  expect(nextState.form.notes).toBe(undefined);
  expect(nextState.error).toBe('');
});
test('resets the form state', () => {
  const dirtyState = {
    form: {
      name: 'Maria',
      company: 'Aegean Digital',
      email: 'maria@test.com',
      status: 'lead',
    },
    error: 'Old error',
  };

  const nextState = clientFormReducer(dirtyState, {
    type: 'RESET_FORM',
  });

  expect(nextState).toEqual(initialState);
});
