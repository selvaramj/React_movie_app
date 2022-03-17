import React, { Component } from 'react';
import Joi from 'joi-browser';
import auth from '../../services/authService';
import Form from '../../components/form';
import { register } from '../../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

class RegisterForm extends Form {
  state = {
    data: {
      name: '',
      password: '',
      email: '',
    },
    errors: {},
  };

  schema = {
    name: Joi.string().min(3).required().label('Name'),
    password: Joi.string().min(5).required().label('Password'),
    email: Joi.string().email().label('Email'),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
      toast.error('User already registered with this email-id');
    }
    console.log('Register Form Submitted');
  };

  render() {
    return (
      <div className='container'>
        {console.log(this.props)}
        <h1 className='text-center'>Registration Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('name', 'Name')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('email', 'Username', 'email')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default (props) => (
  <RegisterForm {...props} navigateTo={useNavigate()} />
);
