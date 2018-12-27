import React, {Component} from 'react';
import {Segment, Form, Button, Grid, Header} from "semantic-ui-react";
import {connect} from "react-redux";
import {reduxForm, Field} from 'redux-form'
import {updateEvent, deleteEvent, createEvent} from "../eventActions";
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import SelectInput from '../../../app/common/form/SelectInput'
import DateInput from "../../../app/common/form/DateInput";
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate'
import cuid from 'cuid';


const emptyEvent = {

};

const mapState = (state, ownProps) => {
    const event = state.events.filter(event => event.id === ownProps.match.params.id);
    if (event.length) {

        return {
            initialValues: event[0]
        }
    } else {
        return {
            initialValues: emptyEvent
        }
    }
}

const actions = {
    updateEvent,
    deleteEvent,
    createEvent
}

const validate = combineValidators({
    title: isRequired({message: 'Title is required'}),
    hostedBy: isRequired({message: 'HostbY is required'}),
    category: isRequired({message: 'category is required'}),
    description: composeValidators(
        isRequired({message: 'description is required'}),
        hasLengthGreaterThan(4)({message: 'length is more than 4'})
    )(),
    date: isRequired({message: "Date is required"}),
    venue: isRequired({message: 'Vanue is required'}),
    city: isRequired({message: 'city is required'})
});

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

class EventForm extends Component {

    handleOnSubmit = (values) => {
        console.log(values);
        values.date = values.date.toString();
        const {createEvent, updateEvent} = this.props;

        if (this.props.initialValues.id === '') {
            const newEvent = {
                ...this.props.initialValues,
                id: cuid(),
                hostPhotoURL: '/assets/user.png'
            }
            createEvent(newEvent);
            this.props.history.push('/events');
        } else {
            updateEvent(values);
            this.props.history.goBack();
        }


    }


    render() {
        const {invalid, submitting, pristine} = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        <Form onSubmit={this.props.handleSubmit(this.handleOnSubmit)}>
                            <Header sub color='teal' content='Event details'/>
                            <Field name='title' type='text' component={TextInput} placeholder='Give your event a name'/>
                            <Field name='hostedBy' type='text' component={TextInput} placeholder='Who host the event'/>
                            <Field name='category' type='text' component={SelectInput} options={category} placeholder='What is your event about'/>
                            <Field name='description' type='text' rows={3} component={TextArea} placeholder='Tell us about your event'/>
                            <Header sub color='teal' content='Event location details'/>
                            <Field name='venue' type='text' component={TextInput} placeholder='Event Venue'/>
                            <Field name='city' type='text' component={TextInput} placeholder='Event City'/>
                            <Field name='date' type='text' component={DateInput} dateFormat="Pp" timeFormat="HH:mm" showTimeSelect placeholder="Date and Time of event" />

                            <Button disabled={invalid || submitting || pristine} positive type="submit">
                                Submit
                            </Button>
                            <Button type="button"  onClick={this.props.history.goBack}>Cancel</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>

        );
    }
}

export default connect(mapState, actions)(reduxForm({form: 'EventForm', enableReinitialize: true, validate})(EventForm));