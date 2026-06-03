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
