import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import FormAlert from '../components/form_alert';
import renderDatePicker from '../components/render_date_picker';
import * as actions from '../actions/post';

// import '../../node_modules/react-datepicker/dist/react-datepicker.css';

class CheckOut extends Component{
  constructor (props) {
    super(props)
    this.state = {
      startDate: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  renderFieldValidate(field){
    const { meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label className="form-control-label">{field.label}</label>
        <input
          className="form-control"
          id="inputHorizontalDnger"
          {...field.input} />
        <div className="form-control-feedback">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <FormAlert errorMessage={this.props.errorMessage} />
      );
    }
  }

  handleFormSubmit = (values) => {
    const {id} = this.props.match.params;
    // this.props.checkOut(values, id, this.props.history);
    console.log(values);
  }

  render(){
    const { handleSubmit } = this.props;

    return(
      <div className="container container-form">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field label="First Name:" name="PersonFirstName" component={this.renderFieldValidate} type="text"/>
          <Field label="Last Name:" name="PersonLastName" component={this.renderFieldValidate} type="text"/>
          <div className="form-group">
            <label className="form-control-label">Due Back By (Optional):</label>
            {/* <DatePicker className="form-control" name="DueBackBy" selected={this.state.startDate} onChange={this.handleChange} minDate={moment()}/> */}
            <Field name="DueBackBy" component={renderDatePicker}/>
          </div>
          {this.renderAlert()}
          <div className="form-group"><button type="submit" className="btn btn-outline-success">Check Out</button></div>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  if(!values.PersonFirstName){
    errors.PersonFirstName = 'Please enter the first name for this person';
  } else if(values.PersonFirstName.length < 3){
    errors.PersonFirstName = 'The first name must be greater than 2 characters';
  }
  if(!values.PersonLastName){
    errors.PersonLastName = 'Please enter the last name for this person';
  } else if(values.PersonLastName.length < 2){
    errors.PersonLastName = 'The last name must be greater than 1 character';
  }

  return errors;
}

function mapStateToProps(state){
  return{
    errorMessage: state.post.error
  };
}

const reduxFormCheckOut = reduxForm({
  validate,
  form: 'checkOut'
})(CheckOut);

export default connect(mapStateToProps, actions)(reduxFormCheckOut);
