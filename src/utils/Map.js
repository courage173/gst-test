/* eslint-disable no-unused-vars */
import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';

const markers = [
    {
        id: 1,
        latitude: 25.0391667,
        longitude: 121.525,
        shelter: 'Taiwan',
    },
    {
        id: 2,
        latitude: 24.0391667,
        longitude: 110.525,
        shelter: 'GuanGzi',
    },
    {
        id: 3,
        latitude: 20.0391667,
        longitude: 100.525,
        shelter: 'Chiang Rai',
    },
];
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
        defaultZoom={4}
        defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
    >
        {markers.map(marker => {
            //const onClick = props.onClick.bind(this, marker)
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
