import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';

const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap
        defaultZoom={2}
        defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
    >
        {props.markers.map(marker => {
            return (
                <Marker
                    key={marker.id}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                >
                    <InfoWindow>
                        <div>{marker.shelter}</div>
                    </InfoWindow>
                </Marker>
            );
        })}
    </GoogleMap>
));

export default MapWithAMarkerClusterer;
