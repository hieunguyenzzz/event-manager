import React, {Component} from 'react';
import {} from 'semantic-ui-react';
import {Segment} from "semantic-ui-react";
import {Form} from "semantic-ui-react";
import {Button} from "semantic-ui-react";
const emptyEvent = {
    id: '',
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
};

class EventForm extends Component {
    state = {
        event: emptyEvent
    }

    componentDidMount() {
        if (this.props.selectedEvent) {
            this.setState({
                event: this.props.selectedEvent
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedEvent !== nextProps.selectedEvent) {
            this.setState({
                event: nextProps.selectedEvent || emptyEvent
            })
        } else {
            console.log('no updated!!!');
        }
    }

    // static getDerivedStateFromProps({selectedEvent}) {
    //     if (!selectedEvent) {
    //         return {
    //             event: emptyEvent,
    //         }
    //     }
    //     return {
    //         event: selectedEvent,
    //     }
    // }

    handleOnChance = (evt) => {
        const event = this.state.event;
        event[evt.target.name] = evt.target.value;
        this.setState({event});
    }

    handleOnSubmit = (evt) => {
        evt.preventDefault();
        if (this.state.event.id === '') {
            this.props.createEvent(this.state.event);
        } else {
            this.props.updateEvent(this.state.event);
        }
    }





    render() {
        const {handleCancel} = this.props;
        return (
            <Segment>
                <Form onSubmit={this.handleOnSubmit}>
                    <Form.Field>
                        <label>Event Title</label>
                        <input name="title" value={this.state.event.title} onChange={this.handleOnChance} placeholder="First Name"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Event Date</label>
                        <input name="date" value={this.state.event.date} onChange={this.handleOnChance} type="date" placeholder="Event Date"/>
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input name="city" value={this.state.event.city} onChange={this.handleOnChance} placeholder="City event is taking place"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Venue</label>
                        <input name="venue" value={this.state.event.venue} onChange={this.handleOnChance} placeholder="Enter the Venue of the event"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Hosted By</label>
                        <input name="hostedBy" onChange={this.handleOnChance} value={this.state.event.hostedBy}
                               placeholder="Enter the name of person hosting"/>
                    </Form.Field>
                    <Button positive type="submit">
                        Submit
                    </Button>
                    <Button type="button" onClick={handleCancel}>Cancel</Button>
                </Form>
            </Segment>
        );
    }
}

export default EventForm;