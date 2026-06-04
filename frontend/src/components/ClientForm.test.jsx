import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import ClientForm from './ClientForm';

test('creates a client when the form is submitted', async () => {
  const user = userEvent.setup();

  const onCreateClient = vi.fn();

  render(
    <ClientForm
      onCreateClient={onCreateClient}
      onUpdateClient={vi.fn()}
      onCancelEdit={vi.fn()}
      editingClient={null}
    />,
  );

  await user.type(screen.getByLabelText(/name/i), 'Maria');
  await user.type(
    screen.getByLabelText(/company/i),
    'Aegean Digital',
  );
  await user.type(screen.getByLabelText(/e-mail/i), 'maria@test.com');
  await user.selectOptions(screen.getByLabelText(/status/i), 'lead');

  await user.click(
    screen.getByRole('button', { name: /create client/i }),
  );

  expect(onCreateClient).toHaveBeenCalledTimes(1);
  expect(onCreateClient).toHaveBeenCalledWith(
    expect.objectContaining({
      name: 'Maria',
      company: 'Aegean Digital',
      email: 'maria@test.com',
      status: 'lead',
    }),
  );
});
test('error on create client without filling fields', async () => {
  const user = userEvent.setup();
  const onCreateClient = vi.fn();
  render(
    <ClientForm
      onCreateClient={onCreateClient}
      onUpdateClient={vi.fn()}
      onCancelEdit={vi.fn()}
      editingClient={null}
    />,
  );
  await user.click(
    screen.getByRole('button', { name: /create client/i }),
  );
  expect(
    screen.getByText(/all fields are required/i),
  ).toBeInTheDocument();
  expect(onCreateClient).not.toHaveBeenCalled();
});
test('fill editing client and update successfully', async () => {
  const user = userEvent.setup();
  const onCreateClient = vi.fn();
  const onUpdateClient = vi.fn();
  const client = {
    id: 1,
    name: 'Maria',
    company: 'Aegean Digital',
    email: 'maria@test.com',
    status: 'lead',
    notes: [],
  };
  render(
    <ClientForm
      onCreateClient={onCreateClient}
      onUpdateClient={onUpdateClient}
      onCancelEdit={vi.fn()}
      editingClient={client}
    />,
  );
  await user.selectOptions(
    screen.getByLabelText(/status/i),
    'inactive',
  );
  await user.click(
    screen.getByRole('button', { name: /update client/i }),
  );
  expect(onUpdateClient).toHaveBeenCalledTimes(1);
  expect(onCreateClient).not.toHaveBeenCalled();
  expect(onUpdateClient).toHaveBeenCalledWith(
    expect.objectContaining({
      name: 'Maria',
      company: 'Aegean Digital',
      email: 'maria@test.com',
      status: 'inactive',
    }),
  );
});
test('editing client filled and cancel reset form and change nothing', async () => {
  const user = userEvent.setup();
  const onCreateClient = vi.fn();
  const onUpdateClient = vi.fn();
  const onCancelEdit = vi.fn();
  const client = {
    id: 1,
    name: 'Maria',
    company: 'Aegean Digital',
    email: 'maria@test.com',
    status: 'lead',
    notes: [],
  };
  const originalClient = structuredClone(client);
  render(
    <ClientForm
      onCreateClient={onCreateClient}
      onUpdateClient={onUpdateClient}
      onCancelEdit={onCancelEdit}
      editingClient={client}
    />,
  );
  await user.selectOptions(
    screen.getByLabelText(/status/i),
    'inactive',
  );
  await user.click(screen.getByRole('button', { name: /cancel/i }));
  expect(onUpdateClient).not.toHaveBeenCalled();
  expect(onCreateClient).not.toHaveBeenCalled();
  expect(onCancelEdit).toHaveBeenCalledTimes(1);
  expect(screen.getByLabelText(/name/i)).toHaveValue('');
  expect(screen.getByLabelText(/company/i)).toHaveValue('');
  expect(screen.getByLabelText(/e-mail/i)).toHaveValue('');
  expect(screen.getByLabelText(/status/i)).toHaveValue('active');
  expect(client).toEqual(originalClient);
});
test('shows invalid email error and does not create client', async () => {
  const user = userEvent.setup();

  const onCreateClient = vi.fn();
  const onUpdateClient = vi.fn();
  const onCancelEdit = vi.fn();

  render(
    <ClientForm
      onCreateClient={onCreateClient}
      onUpdateClient={onUpdateClient}
      onCancelEdit={onCancelEdit}
      editingClient={null}
    />,
  );

  await user.type(screen.getByLabelText(/name/i), 'Maria');
  await user.type(
    screen.getByLabelText(/company/i),
    'Aegean Digital',
  );
  await user.type(
    screen.getByLabelText(/e-mail/i),
    'not-valid-email',
  );

  await user.click(
    screen.getByRole('button', { name: /create client/i }),
  );

  expect(
    screen.getByText(/enter a valid email/i),
  ).toBeInTheDocument();

  expect(onCreateClient).not.toHaveBeenCalled();
  expect(onUpdateClient).not.toHaveBeenCalled();
});
