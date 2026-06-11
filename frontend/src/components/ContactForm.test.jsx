import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import ContactForm from './ContactForm';

test('creates a contact when the form is submitted', async () => {
  const user = userEvent.setup();

  const onCreateContact = vi.fn();

  render(
    <ContactForm
      onCreateContact={onCreateContact}
      onUpdateContact={vi.fn()}
      onCancelEdit={vi.fn()}
      editingContact={null}
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
    screen.getByRole('button', { name: /create contact/i }),
  );

  expect(onCreateContact).toHaveBeenCalledTimes(1);
  expect(onCreateContact).toHaveBeenCalledWith(
    expect.objectContaining({
      name: 'Maria',
      company: 'Aegean Digital',
      email: 'maria@test.com',
      status: 'lead',
    }),
  );
});
test('error on create contact without filling fields', async () => {
  const user = userEvent.setup();
  const onCreateContact = vi.fn();
  render(
    <ContactForm
      onCreateContact={onCreateContact}
      onUpdateContact={vi.fn()}
      onCancelEdit={vi.fn()}
      editingContact={null}
    />,
  );
  await user.click(
    screen.getByRole('button', { name: /create contact/i }),
  );
  expect(
    screen.getByText(/all fields are required/i),
  ).toBeInTheDocument();
  expect(onCreateContact).not.toHaveBeenCalled();
});
test('fill editing contact and update successfully', async () => {
  const user = userEvent.setup();
  const onCreateContact = vi.fn();
  const onUpdateContact = vi.fn();
  const contact = {
    id: 1,
    name: 'Maria',
    company: 'Aegean Digital',
    email: 'maria@test.com',
    status: 'lead',
    notes: [],
  };
  render(
    <ContactForm
      onCreateContact={onCreateContact}
      onUpdateContact={onUpdateContact}
      onCancelEdit={vi.fn()}
      editingContact={contact}
    />,
  );
  await user.selectOptions(
    screen.getByLabelText(/status/i),
    'inactive',
  );
  await user.click(
    screen.getByRole('button', { name: /update contact/i }),
  );
  expect(onUpdateContact).toHaveBeenCalledTimes(1);
  expect(onCreateContact).not.toHaveBeenCalled();
  expect(onUpdateContact).toHaveBeenCalledWith(
    expect.objectContaining({
      name: 'Maria',
      company: 'Aegean Digital',
      email: 'maria@test.com',
      status: 'inactive',
    }),
  );
});
test('editing contact filled and cancel reset form and change nothing', async () => {
  const user = userEvent.setup();
  const onCreateContact = vi.fn();
  const onUpdateContact = vi.fn();
  const onCancelEdit = vi.fn();
  const contact = {
    id: 1,
    name: 'Maria',
    company: 'Aegean Digital',
    email: 'maria@test.com',
    status: 'lead',
    notes: [],
  };
  const originalContact = structuredClone(contact);
  render(
    <ContactForm
      onCreateContact={onCreateContact}
      onUpdateContact={onUpdateContact}
      onCancelEdit={onCancelEdit}
      editingContact={contact}
    />,
  );
  await user.selectOptions(
    screen.getByLabelText(/status/i),
    'inactive',
  );
  await user.click(screen.getByRole('button', { name: /cancel/i }));
  expect(onUpdateContact).not.toHaveBeenCalled();
  expect(onCreateContact).not.toHaveBeenCalled();
  expect(onCancelEdit).toHaveBeenCalledTimes(1);
  expect(screen.getByLabelText(/name/i)).toHaveValue('');
  expect(screen.getByLabelText(/company/i)).toHaveValue('');
  expect(screen.getByLabelText(/e-mail/i)).toHaveValue('');
  expect(screen.getByLabelText(/status/i)).toHaveValue('active');
  expect(contact).toEqual(originalContact);
});
test('shows invalid email error and does not create contact', async () => {
  const user = userEvent.setup();

  const onCreateContact = vi.fn();
  const onUpdateContact = vi.fn();
  const onCancelEdit = vi.fn();

  render(
    <ContactForm
      onCreateContact={onCreateContact}
      onUpdateContact={onUpdateContact}
      onCancelEdit={onCancelEdit}
      editingContact={null}
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
    screen.getByRole('button', { name: /create contact/i }),
  );

  expect(
    screen.getByText(/enter a valid email/i),
  ).toBeInTheDocument();

  expect(onCreateContact).not.toHaveBeenCalled();
  expect(onUpdateContact).not.toHaveBeenCalled();
});
