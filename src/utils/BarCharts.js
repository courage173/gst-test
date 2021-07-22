//import './styles.css';
import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';
import styles from './char.module.css';

export default function Charts({ type, data }) {
    return (
        <Chart
            backgroundColor={'rgba(255, 255, 255, 0.7)'}
            width={'500px'}
            height={'300px'}
            chartType={type === 'bar' ? 'BarChart' : 'PieChart'}
            loader={<div>Loading Chart</div>}
            data={[['Task', 'population'], ...data]}
            className={styles.chartWrap}
            options={{
                title: '',
                backgroundColor: 'transparent',
                pieSliceText: 'value',
            }}
        />
    );
}

Charts.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.array,
};
Charts.displayName = 'BarCharts';
