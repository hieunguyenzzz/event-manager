import React, {Component} from 'react';
import {connect} from 'react-redux';
import {decreaseCounter, increaseCounter} from './testActions';
import {Button, Icon} from 'semantic-ui-react';
import Script from 'react-load-script'
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';

import GoogleMapReact from 'google-map-react'

const mapState = (state) => ({
    data: state.test.data
});


const actions = {
    decreaseCounter, increaseCounter
}

const AnyReactComponent = ({lat, lng}) => <Icon lat={lat} lng={lng} text="My Marker" />

class TestComponent extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    state = {
        address: '',
        scriptLoaded: false
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.log('Error', error))
    }

    onChange = (address) => {
        this.setState({address})
    }

    handleScriptLoad = () => {
        this.setState({scriptLoaded: true})
    }
    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        }
        const {decreaseCounter, increaseCounter, data} = this.props;
        return (
            <div>
                {/*<Script*/}
                    {/*url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxGWBjl3ChoeVWM9AbKMUHrAQGPWlgikI&libraries=places"*/}
                    {/*onLoad={this.handleScriptLoad}*/}
                {/*/>*/}
                <h1>Test area</h1>
                <h3>{data}</h3>
                <Button onClick={increaseCounter} color='green' content="increment"/>
                <Button onClick={decreaseCounter} color='red' content="decrement"/>

                <br/><br/>
                <form onSubmit={this.handleFormSubmit}>
                    {this.state.scriptLoaded && <PlacesAutocomplete inputProps={inputProps}/>}
                </form>

                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyAxGWBjl3ChoeVWM9AbKMUHrAQGPWlgikI' }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        <AnyReactComponent
                            lat={59.955413}
                            lng={30.337844}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}

export default connect(mapState, actions)(TestComponent);
