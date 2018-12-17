import React, {Component} from 'react';
import {Segment, Form, Button} from "semantic-ui-react";
import {connect} from "react-redux";
import {updateEvent, deleteEvent, createEvent} from "../eventActions";
import cuid from 'cuid';

const emptyEvent = {
    id: '',
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
};

const mapState = (state, ownProps) => {
    const event = state.events.filter(event => event.id === ownProps.match.params.id);
    if (event.length) {

        return {
            event: event[0]
        }
    } else {
        return {
            event: emptyEvent
        }
    }
}

const actions = {
    updateEvent,
    deleteEvent,
    createEvent
}

class EventForm extends Component {
    state = {
        event: Object.assign({}, this.props.event)
    }

    handleOnChance = (evt) => {
        const {event} = this.state;
        const {updateEvent} = this.props;
        event[evt.target.name] = evt.target.value;
        this.setState(event);
    }

    handleOnSubmit = (evt) => {
        evt.preventDefault();
        const {createEvent, updateEvent} = this.props;

        if (this.state.event.id === '') {
            const newEvent = {
                ...this.state.event,
                id: cuid(),
                hostPhotoURL: '/assets/user.png'
            }
            createEvent(newEvent);
            this.props.history.push('/events');
        } else {
            updateEvent(this.state.event);
            this.props.history.goBack();
        }


    }


    render() {
        const {event} = this.state;
        return (
            <Segment>
                <Form onSubmit={this.handleOnSubmit}>
                    <Form.Field>
                        <label>Event Title</label>
                        <input name="title" value={event.title} onChange={this.handleOnChance}
                               placeholder="First Name"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Event Date</label>
                        <input name="date" value={event.date} onChange={this.handleOnChance} type="date"
                               placeholder="Event Date"/>
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input name="city" value={event.city} onChange={this.handleOnChance}
                               placeholder="City event is taking place"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Venue</label>
                        <input name="venue" value={event.venue} onChange={this.handleOnChance}
                               placeholder="Enter the Venue of the event"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Hosted By</label>
                        <input name="hostedBy" onChange={this.handleOnChance} value={event.hostedBy}
                               placeholder="Enter the name of person hosting"/>
                    </Form.Field>
                    <Button positive type="submit">
                        Submit
                    </Button>
                    <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
                </Form>
            </Segment>
        );
    }
}

export default connect(mapState, actions)(EventForm);