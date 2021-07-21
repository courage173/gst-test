import React from 'react';
import styles from './loader.module.css';
const Loader = () => (
    <div className={styles['ball-beat']} style={{ textAlign: 'center' }}>
        <div
            style={{ height: '8px', width: '8px', backgroundColor: '#4c4c4c' }}
        ></div>
        <div
            style={{ height: '8px', width: '8px', backgroundColor: '#4c4c4c' }}
        ></div>
        <div
            style={{ height: '8px', width: '8px', backgroundColor: '#4c4c4c' }}
        ></div>
    </div>
);

Loader.displayName = 'Loader';
export default Loader;
