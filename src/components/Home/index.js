/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Form from '../../utils/form/Form';
import styles from './Home.module.css';
import { update, generateData, isFormValid } from '../../utils/form/formAction';
import MapWithAMarkerClusterer from '../../utils/Map';
import BarCharts from '../../utils/BarCharts';
import { getCountries } from '../../redux/actions/countries';
import Loader from '../../utils/loader/Loader';

const Home = props => {
    const [active, setActive] = useState('bar');
    const [state, setState] = useState({
        formError: false,
        formdata: {
            search: {
                element: 'input',
                value: '',
                config: {
                    name: 'search',
                    type: 'text',
                    placeholder: 'Enter your search item...',
                    label: 'Search',
                },
                validation: {
                    required: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: false,
            },
        },
    });

    const updateForm = element => {
        const newFormdata = update(element, state.formdata, 'login');
        setState({
            formError: false,
            formdata: newFormdata,
        });
    };
    const countries = props.countries;

    const handleSearch = async () => {
        const data = generateData(state.formdata);
        if (data.search.length > 0) {
            await props.getCountries(data.search);
        }
    };
    const mapData = countries.map((country, i) => {
        return {
            id: i,
            shelter: country.name,
            latitude: country.latlng[0],
            longitude: country.latlng[1],
        };
    });
    const chatData = countries.map(country => {
        return [country.name, country.population];
    });
    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <div className={styles.title}>
                    <h1>Search for Countries around the World</h1>
                </div>
                <div className={styles.formWrap}>
                    <Form
                        id={'search'}
                        formdata={state.formdata.search}
                        change={element => updateForm(element)}
                        styles={{ width: '100%' }}
                    />
                    <div>
                        <button
                            className={styles.button}
                            onClick={handleSearch}
                        >
                            {props.requesting ? <Loader /> : 'Search'}
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.chartContainer}>
                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7) ',
                    }}
                >
                    <h4 style={{ marginBottom: 0, padding: 5 }}>Populations</h4>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.7) ',
                    }}
                >
                    <div
                        className={styles.toggleBtn}
                        style={{
                            backgroundColor:
                                active === 'bar' && 'rgb(80 223 199)',
                            color: active === 'bar' && '#fff',
                            borderRight: 0,
                        }}
                        onClick={() => setActive('bar')}
                    >
                        Bar chart
                    </div>
                    <div
                        className={styles.toggleBtn}
                        style={{
                            backgroundColor:
                                active === 'line' && 'rgb(80 223 199)',
                            color: active === 'line' && '#fff',
                        }}
                        onClick={() => setActive('line')}
                    >
                        Pie chart
                    </div>
                </div>
                <BarCharts type={active} data={chatData} />
            </div>
            <div className={styles.mapContainer}>
                {!props.requesting ? (
                    <MapWithAMarkerClusterer markers={mapData} />
                ) : null}
            </div>
        </div>
    );
};

Home.displayName = 'Home';

Home.propTypes = {
    getCountries: PropTypes.func.isRequired,
    requesting: PropTypes.bool,
    countries: PropTypes.array.isRequired,
};
const mapDispatchToProps = dispatch =>
    bindActionCreators({ getCountries }, dispatch);
const mapStateToProps = state => {
    return {
        requesting: state.countries.requesting,
        error: state.countries.error,
        countries: state.countries.countries,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
