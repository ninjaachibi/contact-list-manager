import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CreateContact from './comp/CreateContact'
import ContactList from './comp/ContactList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      update: false,
      currentName: '',
      currentPhone: '',
      currentBirthday: '',
      currentId: '',
    }
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  edit (contactToEdit) {
    this.setState({
      editing: true,
      currentName: contactToEdit.name,
      currentPhone: contactToEdit.phone,
      currentBirthday: contactToEdit.birthday,
      currentId: contactToEdit._id,
      update: true,
    })
  }

  delete (id) {
    console.log('in delete, id is', id);
    fetch('/contact/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      }),
    })
    .then((res)=> {
      if(res.status === 200) {
        console.log('DELETED SUCCESSFULLY', res)
      } else {
        console.log('error');
      }
    })
    .then(() => {
      fetch('/contact', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(res => res.json())
        .then((contacts) => {
          console.log('contacts are', contacts);
          this.setState({
            contacts: contacts
          })
        })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render () {
    console.log('my contacts',this.state.contacts);
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Contacts</h1>
        </header>


        {(this.state.editing)
          ? <CreateContact
            cancel={()=>this.setState({editing:false})}
            name={this.state.currentName}
            phone={this.state.currentPhone}
            birthday={this.state.currentBirthday}
            update={this.state.update}
            id={this.state.currentId}
          />
          :
          <div className="contact-container">
            <button
              onClick={()=>this.setState({
                editing: true,
                currentName: '',
                currentPhone: '',
                currentBirthday: '',
                update: false,
              })}
              className="btn"
              >Create New Contact</button>
              <ContactList edit={this.edit} delete={this.delete}/>
          </div>
        }

      </div>
    );
  }
}

export default App;
