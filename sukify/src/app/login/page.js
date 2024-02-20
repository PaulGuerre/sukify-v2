'use client'

import styles from './page.module.css';
import { getToken } from "@/utils/api";

export default function Login() {
    const handleLogin = () => {
        const username = document.querySelector("input[type='text']").value;
        const password = document.querySelector("input[type='password']").value;

        getToken(username, password).then((res) => {
            localStorage.setItem('token', res.data);
            window.location.href = '/musics';
        });
    }

    return (
        <div className={styles.login}>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button className={styles.validate} onClick={handleLogin}>Login</button>
        </div>
    );
};
