/*global google*/
import React, {Component} from 'react';
import {Segment, Form, Button, Grid, Header} from "semantic-ui-react";
import {connect} from "react-redux";
import {reduxForm, Field} from 'redux-form'
import {updateEvent, deleteEvent, createEvent} from "../eventActions";
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Script from 'react-load-script';
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import SelectInput from '../../../app/common/form/SelectInput'
import DateInput from "../../../app/common/form/DateInput";
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate'
import cuid from 'cuid';
import PlaceInput from "../../../app/common/form/PlaceInput";


const emptyEvent = {};

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
    state = {
        cityLatLng: {},
        venueLatLng: {},
        scriptLoaded:false
    }

    handleCitySelect = (selectedCity) => {
        geocodeByAddress(selectedCity)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({
                    cityLatLng: latLng
                })
            })
            .then(() => {
                this.props.change('city', selectedCity); /* @todo find out why this fix on mouse click*/
                console.log(this.props.city);
            })
    }

    handleVenueSelect = (selectedVenue) => {
        geocodeByAddress(selectedVenue)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({
                    venueLatLng: latLng
                })
            })
            .then(() => {
                this.props.change('venue', selectedVenue); /* @todo find out why this fix on mouse click*/
            })
    }

    handleOnSubmit = (values) => {
        values.date = values.date.toString();
        values.venueLatLng = this.state.venueLatLng
        const {createEvent, updateEvent} = this.props;

        if (typeof this.props.initialValues.id === "undefined") {
            const newEvent = {
                ...values,
                id: cuid(),
                attendees: [],
                hostPhotoURL: '/assets/user.png'
            }
            createEvent(newEvent);
            this.props.history.push('/events');
        } else {
            updateEvent(values);
            this.props.history.goBack();
        }
    }

    handleScriptLoaded = () => {
        this.setState({scriptLoaded: true})
    }


    render() {
        const {invalid, submitting, pristine} = this.props;
        return (
            <Grid>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxGWBjl3ChoeVWM9AbKMUHrAQGPWlgikI&libraries=places"
                    onLoad={this.handleScriptLoaded}
                />

                <Grid.Column width={10}>
                    <Segment>
                        <Form onSubmit={this.props.handleSubmit(this.handleOnSubmit)}>
                            <Header sub color='teal' content='Event details'/>
                            <Field name='title' type='text' component={TextInput} placeholder='Give your event a name'/>
                            <Field name='hostedBy' type='text' component={TextInput} placeholder='Who host the event'/>
                            <Field name='category' type='text' component={SelectInput} options={category}
                                   placeholder='What is your event about'/>
                            <Field name='description' type='text' rows={3} component={TextArea}
                                   placeholder='Tell us about your event'/>
                            <Header sub color='teal' content='Event location details'/>
                            <Field name='city' type='text' component={PlaceInput} options={{type: ['(cities)']}}
                                   placeholder='Event City' onSelect={this.handleCitySelect}/>
                            {this.state.scriptLoaded && <Field name='venue' type='text' component={PlaceInput} onSelect={this.handleVenueSelect} placeholder='Event Venue'
                                   options={{
                                       location: new google.maps.LatLng(this.state.cityLatLng),
                                       radius: 1000,
                                       types: ['establishment']
                                   }}/>}

                            <Field name='date' type='text' component={DateInput} dateFormat="Pp" timeFormat="HH:mm"
                                   showTimeSelect placeholder="Date and Time of event"/>

                            <Button disabled={invalid || submitting || pristine} positive type="submit">
                                Submit
                            </Button>
                            <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>

        );
    }
}

export default connect(mapState, actions)(reduxForm({
    form: 'EventForm',
    enableReinitialize: true,
    validate
})(EventForm));