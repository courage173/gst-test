//import './styles.css';
import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';

export default function Charts({ type }) {
    return (
        <Chart
            backgroundColor={'rgba(255, 255, 255, 0.7)'}
            width={'500px'}
            height={'300px'}
            chartType={type === 'bar' ? 'BarChart' : 'PieChart'}
            loader={<div>Loading Chart</div>}
            data={[
                ['Task', 'population'],
                ['Work', 11],
                ['Eat', 2],
                ['Commute', 2],
                ['Watch TV', 2],
                ['Sleep', 7],
            ]}
            options={{
                title: '',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                //chartArea: { width: '50%' },
                // hAxis: {
                //     title: 'Total Population',
                //     minValue: 0,
                // },
                // vAxis: {
                //     title: 'City',
                // },
            }}
        />
    );
}

Charts.propTypes = {
    type: PropTypes.string.isRequired,
};
Charts.displayName = 'BarCharts';
