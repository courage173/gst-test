/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Form from '../../utils/form/Form';
import styles from './Home.module.css';
import { update, generateData, isFormValid } from '../../utils/form/formAction';

const Home = () => {
    const [state, setState] = useState({
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
        setState({ loginErrorMessage: '', message: '' });
        const newFormdata = update(element, state.formdata, 'login');
        setState({
            formError: false,
            formdata: newFormdata,
        });
    };
    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <div className={styles.title}>
                    <h1>Search Countries</h1>
                </div>
                <Form
                    id={'search'}
                    formdata={state.formdata.search}
                    change={element => updateForm(element)}
                />
            </div>
        </div>
    );
};

Home.displayName = 'Home';
export default Home;
