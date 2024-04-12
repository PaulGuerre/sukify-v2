'use client'

import styles from './page.module.css';
import { getToken } from "@/utils/api";
import { setCookie } from 'cookies-next';
import Image from 'next/image';
import sukify from '@/lib/img/sukify.png';

export default function Login() {
    const handleLogin = () => {
        const username = document.querySelector("input[type='text']").value;
        const password = document.querySelector("input[type='password']").value;

        getToken(username, password).then((res) => {
            setCookie('token', res.data, { maxAge: 60 * 60 * 24 * 30});
            window.location.href = '/musics';
        });
    }

    return (
        <div className={styles.login}>
            <Image src={sukify} alt='Sukify logo' width={250} />
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button className={styles.validate} onClick={handleLogin}>Login</button>
        </div>
    );
};
