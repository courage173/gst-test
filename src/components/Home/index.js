/* eslint-disable no-unused-vars */
import React, { useState, Suspense } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slide from 'react-reveal/Slide';
import PropTypes from 'prop-types';
import Form from '../../utils/form/Form';
import styles from './Home.module.css';
import { update, generateData } from '../../utils/form/formAction';
import { getCountries } from '../../redux/actions/countries';
import { Loader } from '../../utils/loader/Loader';

//lazy load map component
const Map = React.lazy(() => import('../../utils/Map'));
//lazy load chart component
const BarCharts = React.lazy(() => import('../../utils/BarCharts'));

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
        //check if user input is empty
        if (data.search.length > 0) {
            await props.getCountries(data.search);
        }
    };
    //build map data
    const mapData = countries.map((country, i) => {
        return {
            id: i,
            shelter: country.name,
            latitude: country.latlng[0],
            longitude: country.latlng[1],
        };
    });
    //build data needed by chart
    const chartData = countries.map(country => {
        return [country.name, country.population];
    });

    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <div className={styles.title}>
                    <h1>Search Countries</h1>
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

            <div className={styles.mapContainer}>
                {!props.requesting ? (
                    <Suspense fallback={<Loader />}>
                        <Map markers={mapData} />
                    </Suspense>
                ) : null}
            </div>
            {!props.requesting && chartData.length > 0 && (
                <Slide left>
                    <div className={styles.chartContainer}>
                        <div
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            }}
                        >
                            <h4
                                style={{
                                    marginBottom: 0,
                                    padding: 5,
                                    fontSize: 18,
                                }}
                            >
                                Populations
                            </h4>
                        </div>
                        {chartData.length === 1 ? (
                            <div className={styles.singleWrap}>
                                <h5
                                    style={{
                                        marginTop: 0,

                                        fontSize: 18,
                                    }}
                                >
                                    {chartData[0][0]} has a Population of{' '}
                                    <span
                                        style={{ color: 'rgb(80, 223, 199)' }}
                                    >
                                        {chartData[0][1]}
                                    </span>
                                </h5>
                                {` `}
                            </div>
                        ) : (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.7) ',
                                    }}
                                >
                                    <div
                                        className={styles.toggleBtn}
                                        style={{
                                            backgroundColor:
                                                active === 'bar' &&
                                                'rgb(80 223 199)',
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
                                                active === 'line' &&
                                                'rgb(80 223 199)',
                                            color: active === 'line' && '#fff',
                                        }}
                                        onClick={() => setActive('line')}
                                    >
                                        Pie chart
                                    </div>
                                </div>

                                <Suspense fallback={<Loader />}>
                                    <BarCharts type={active} data={chartData} />
                                </Suspense>
                            </>
                        )}
                    </div>
                </Slide>
            )}
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
