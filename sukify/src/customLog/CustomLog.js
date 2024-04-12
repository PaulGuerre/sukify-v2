'use client'

import { useDispatch, useSelector } from 'react-redux';
import styles from './CustomLog.module.css';
import { useEffect, useState } from 'react';
import { setLog } from '@/store/apiSlice';

export default function CustomLog() {
    const dispatch = useDispatch();
    const [ isVisible, setIsVisible ] = useState(false);
    const log = useSelector((state) => state.api.log);

    useEffect(() => {
        if (log.message) {
            setIsVisible(true);
            setTimeout(() => {
                dispatch(setLog({}));
                setIsVisible(false);
            }, 5000);
        }
    }, [log]);

    return (
        isVisible ? <div className={`${styles.alert} ${log.status !== 200 ? styles.error : ''}`}>
            <p className={styles.log}>{log.message}</p>
        </div> : null
    )
}
