import {Button, Grid} from 'semantic-ui-react';
import React from 'react';
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from 'cuid';

const events = [
    {
        id: '1',
        title: 'Trip to Tower of London',
        date: '2018-03-27',
        category: 'culture',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'London, UK',
        venue: "Tower of London, St Katharine's & Wapping, London",
        hostedBy: 'Bob',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        attendees: [
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            },
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            }
        ]
    },
    {
        id: '2',
        title: 'Trip to Punch and Judy Pub',
        date: '2018-03-28',
        category: 'drinks',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'London, UK',
        venue: 'Punch & Judy, Henrietta Street, London, UK',
        hostedBy: 'Tom',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
        attendees: [
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            },
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            }
        ]
    }
]

class EventDashboard extends React.Component {
    state = {
        events,
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
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList events={this.state.events} handleOpenEvent={this.handleOpenEvent} handleDeleteEvent={this.handleDeleteEvent}/>

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

export default EventDashboard;