import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({lat, lng}) => <Icon lat={lat} lng={lng} text="My Marker"/>

class EventMap extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    render() {
        return (
            <div style={{height: '300px', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyAxGWBjl3ChoeVWM9AbKMUHrAQGPWlgikI'}}
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
        );
    }
}

export default EventMap;