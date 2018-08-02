import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="title"
          component={this.renderInputField}
          label="Title"
          hint="enter title"
        />
        <Field
          name="categories"
          component={this.renderInputField}
          label="Categories"
          hint="enter categories/tags, e.g. 'cats, dogs'"
        />
        <Field
          name="content"
          component={this.renderInputField}
          label="Content"
          hint="enter body"
        />
        <button type="submit" className="btn btn-success">
          Save
        </button>
        <Link className="btn btn-warning" to="/">
          Cancel
        </Link>
      </form>
    );
  }

  renderInputField(field) {
    let className;
    field.meta.touched && field.meta.error
      ? (className = 'form-group has-danger')
      : (className = 'form-group');

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
          placeholder={field.hint}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }
}

function validate(values) {
  const errors = {};

  // validations
  if (!values.title) {
    errors.title = 'Provide a title';
  }
  if (!values.categories) {
    errors.categories = 'Choose at least one category';
  }
  if (!values.content) {
    errors.content = "Enter content. It's a blog!";
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  validate
})(
  connect(
    null,
    { createPost }
  )(PostsNew)
);
