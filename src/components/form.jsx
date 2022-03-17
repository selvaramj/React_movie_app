import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from '../components/inputField';
import Select from './selectField';

class Form extends Component {
  validate = () => {
    const errors = {};
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!error) return null;

    error.details.map((error) => (errors[error.path[0]] = error.message));
    console.log(error);

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const error = this.validate();
    this.setState({ ...this.state, errors: error || {} });

    //handle submit may differ based on form
    this.doSubmit();
  };

  handleOnChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const state = { ...this.state };
    state.data[input.name] = input.value;
    this.setState({ state, errors });
  };

  renderInput = (name, label, type = 'text') => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        label={label}
        error={errors[name]}
        value={data[name]}
        onChange={this.handleOnChange}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleOnChange}
        error={errors[name]}
      />
    );
  };

  renderButton = (label) => {
    return (
      <button
        type='submit'
        className='btn btn-primary'
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  };
}

export default Form;
