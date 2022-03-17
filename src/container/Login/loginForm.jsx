import React from 'react';
import Joi from 'joi-browser';
import Form from '../../components/form';
import auth from '../../services/authService';
import { Navigate } from 'react-router-dom';
class Login extends Form {
  state = {
    data: {
      username: '',
      password: '',
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    console.log('Form Submitted');
  };

  render() {
    if (auth.getCurrentUser()) return <Navigate to='/' replace={true} />;
    return (
      <div className='container'>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Submit')}
        </form>
      </div>
    );
  }
}

export default Login;
