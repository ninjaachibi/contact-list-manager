import React, {Component} from 'react'

class CreateContact extends Component {
  state = {
    name: '',
    phone: '',
    birthday: '',
  }

  componentDidMount () {
    this.setState({
      name: this.props.name,
      phone: this.props.phone,
      birthday: this.props.birthday,
    })
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  onPhoneChange = (e) => {
    this.setState({
      phone: e.target.value
    })
  }

  onBirthdayChange = (e) => {
    this.setState({
      birthday: e.target.value
    })
  }

  onCreate = (e) => {
    const {name, phone, birthday} = this.state;

    fetch('/contact/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        birthday
      })
    }).then((res)=> {
      if(res.status === 200) {
        console.log(res)
      } else {
        console.log('error');
      }
    }).catch((err) => {
      console.log(err);
    })

    this.setState({
      name: '',
      phone: '',
      date: '',
    })
    this.props.cancel();
  }

  onUpdate = (id) => {
    const {name, phone, birthday} = this.state;

    fetch('/contact/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        birthday,
        id
      })
    }).then((res)=> {
      if(res.status === 200) {
        console.log(res)
      } else {
        console.log('error');
      }
    }).catch((err) => {
      console.log(err);
    })

    this.setState({
      name: '',
      phone: '',
      date: '',
    })
    this.props.cancel();
  }

  render() {
    return (
        <div className="contact-form">
          <input value={this.state.name} type="text" onChange={this.onNameChange} className="field" placeholder="name"/>
          <input value={this.state.phone} type="text" onChange={this.onPhoneChange} className="field" placeholder="phone"/>
          <input value={this.state.birthday} type="date" onChange={this.onBirthdayChange} className="field" placeholder="birthday"/>
          {this.props.update
            ? <button onClick={()=> this.onUpdate(this.props.id)} className="btn">Update</button>
            : <button onClick={this.onCreate} className="btn">Create</button>
          }
          <button onClick={()=>this.props.cancel()} className="btn">Cancel</button>

        </div>
    )
  }
}

export default CreateContact;
