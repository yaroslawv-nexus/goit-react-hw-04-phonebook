import React, { useState } from 'react';
import { CreateContactForm } from './ContactForm/CreateContactForm';
import { ContactList } from './ContactsLIst/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

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
