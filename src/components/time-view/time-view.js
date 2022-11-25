import React from 'react';
import PropTypes from "prop-types";
import styles from './timer-view.module.css';

const MILISECONDS_IN_MINUTE = 60000;
const MILISECONDS_IN_SECOND = 1000;

const TimeView = (props) => {

    const preZero = (time) => {
        return (time < 10 ? '0' : '') + time;
    };

    const getStringTime = () => {
        const minutes = (props.time - props.time % MILISECONDS_IN_MINUTE) / MILISECONDS_IN_MINUTE;
        const seconds = Math.floor((props.time - minutes * MILISECONDS_IN_MINUTE) / MILISECONDS_IN_SECOND);
        return preZero(minutes) + ':' + preZero(seconds);
    }

    return (
        <div className={styles.timeViewWrapper}>
            <h2 className={styles.textStyle}>Нажмите на время, чтобы изменить длительность</h2>
            <h1 className={styles.timer}>{getStringTime()}</h1>
        </div>
    )
}

TimeView.propTypes = {
    time: PropTypes.number.isRequired,
};

export default TimeView;
