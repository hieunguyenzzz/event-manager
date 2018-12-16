import {Button, Grid} from 'semantic-ui-react';
import React from 'react';
import {connect} from 'react-redux'
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from 'cuid';

const mapState = (state) => ({
   events: state.events
});



class EventDashboard extends React.Component {
    state = {
        selectedEvent: null,
        isOpen: false
    };

    handleCreateEvent = () => {
        this.setState({
            isOpen: true,
            selectedEvent: null,
        })
    }

    handleCancel = () => {
        this.setState({
            isOpen: false
        })
    }

    handleOpenEvent = (eventToUpdate) => () => {
        this.setState({
            selectedEvent: eventToUpdate,
            isOpen: true
        });
    }

    handleUpdateEvent = (updatedEvent) => {
        this.setState({
            events: this.state.events.map(event => {
                if (event.id === updatedEvent) {
                    return Object.assign({}, updatedEvent)
                }
                return event;
            }),
            isOpen: false,
            selectedEvent: null
        });
    }

    createNewEvent = (event) => {
        event.id = cuid();
        event.hostPhotoURL = 'assets/user.png';
        const events = this.state.events;
        this.setState({events: [...events, event]});
    }

    handleDeleteEvent = (eventId) => () => {
        const updatedEvents = this.state.events.filter(event => event.id !== eventId)
        this.setState({events: updatedEvents})
    }

    render() {
        const {events} = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList events={events} handleOpenEvent={this.handleOpenEvent} handleDeleteEvent={this.handleDeleteEvent}/>

                </Grid.Column>
                <Grid.Column width={6}>
                    <Button positive content="Create Event" onClick={this.handleCreateEvent}/>
                    {this.state.isOpen &&
                    <EventForm selectedEvent={this.state.selectedEvent} handleCancel={this.handleCancel}
                               createEvent={this.createNewEvent} updateEvent={this.handleUpdateEvent}/>}
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(mapState)(EventDashboard);