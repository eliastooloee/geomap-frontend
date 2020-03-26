import React from 'react';
import { api } from '../services/api';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: ''
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.signUp(this.state.fields)
  };

  signUp = (fields) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
          user: {
              "username": this.state.fields.username,
              "password": this.state.fields.password
          }
      })
    })
      .then(res => res.json())
      .catch(err => console.log(err))
      this.props.history.push("/login")
  }

  render() {
    const { fields } = this.state;
    return (
      <div>
        {this.state.error ? <h1>Try again...</h1> : null}
        <div className="ui form">
          <form onSubmit={this.handleSubmit}>
            <div className="ui field">
              <label>Username</label>
              <input
                name="username"
                placeholder="username"
                value={fields.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={fields.password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="ui basic green button">
              Create Account
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;