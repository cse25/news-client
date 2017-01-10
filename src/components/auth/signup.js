import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required'
  }
  if (values.passwordConfirm && values.password !== values.passwordConfirm) {
    errors.password = 'Passwords must match'
  }
  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div className="form-group">
      <input className="form-control" {...input} placeholder={label} type={type}/>
      {touched && error && <div className="error">{error}</div>}
    </div>
  </div>
)

class Signup extends Component {
  handleFormSubmit( {email, password }) {
    console.log(email, password);
    this.props.signupUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form className="form-margin-top" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" type="text" component={renderField} label="Email"/>
        <Field name="password" type="password" component={renderField} label="Password"/>
        <Field name="passwordConfirm" type="password" component={renderField} label="Confirm Password"/>
        <div>
          <button className="btn btn-secondary" type="submit">Submit</button>
        </div>
        {this.renderAlert()}
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

Signup = reduxForm({
  form: 'signup',
  validate
})(Signup);

Signup = connect(mapStateToProps, actions)(Signup);

export default Signup;
