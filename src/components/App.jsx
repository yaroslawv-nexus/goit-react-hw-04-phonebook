import React, { useEffect, useState } from 'react';
import { CreateContactForm } from './ContactForm/CreateContactForm';
import { ContactList } from './ContactsLIst/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled';

const getInitialContacts = () => {
  const checkStorage = JSON.parse(localStorage.getItem(`contacts`));
  if (checkStorage !== null) {
    return checkStorage;
  } else {
    return [{ id: 'id-1', name: 'Test Contact', number: '459-12-56' }];
  }
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    if (checkDuplicate(contact)) {
      alert('the contact already exists');
      return;
    }
    setContacts(prev => [...prev, { id: nanoid(), ...contact }]);
  };

  function checkDuplicate(contact) {
    return contacts.some(
      element => contact.name.toLowerCase() === element.name.toLowerCase()
    );
  }

  const deleteContact = e => {
    setContacts(prev =>
      prev.filter(element => {
        return element.id !== e.target.id;
      })
    );
  };

  const filterChange = e => {
    setFilter(e.target.value);
  };

  const filterByName = () => {
    if (!filter) {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <CreateContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter filterText={filter} filterChange={filterChange} />
      <ContactList deleteContact={deleteContact} filterByName={filterByName} />
    </Container>
  );
};
