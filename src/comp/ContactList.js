import React, {Component} from 'react'

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    }
  }

  componentDidMount() {
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
  }

  render () {
    return (
      <div className="contact-list">
        {this.state.contacts.map((contact) =>
          <div className="contact">
            {contact.name} <br/>
            {contact.phone} <br/>
            {new Date(contact.birthday).toUTCString()} <br/>
            {contact.id}
            <button
              onClick={()=>this.props.edit(contact)}
            >Edit</button>
            <button onClick={()=>this.props.delete(contact._id)}>Delete</button>
          </div>
        )}
      </div>
    )
  }

}

export default ContactList;
