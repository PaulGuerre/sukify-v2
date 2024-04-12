'use client'

import styles from './page.module.css';
import { getToken } from "@/utils/api";
import { setCookie } from 'cookies-next';
import Image from 'next/image';
import sukify from '@/lib/img/sukify.png';
import { useState } from 'react';

export default function Login() {
    const [ isFail, setIsFail ] = useState(false);

    const handleLogin = () => {
        const username = document.querySelector("input[type='text']").value;
        const password = document.querySelector("input[type='password']").value;

        getToken(username, password).then((res) => {
            if (res.status !== 200) {
                setIsFail(true);
                setTimeout(() => {
                    setIsFail(false);
                }, 1500);
                return;
            };
            setCookie('token', res.data, { maxAge: 60 * 60 * 24 * 30});
            window.location.href = '/musics';
        });
    }

    return (
        <div className={`${styles.login} ${isFail ? styles.fail : null}`}>
            <Image src={sukify} alt='Sukify logo' width={250} />
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button className={styles.validate} onClick={handleLogin}>Login</button>
        </div>
    );
};
