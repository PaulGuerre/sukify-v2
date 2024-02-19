'use client'

import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setPlaylists } from '@/store/playlistsSlice';
import { getPlaylists } from '@/utils/api';
import menu from '@/lib/icons/menu.svg';
import menu_color from '@/lib/icons/menu_color.svg';
import Image from 'next/image';

export default function Header() {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlists.playlists);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isVisible, setIsVisible ] = useState(false);

    const isMobile = () => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth < 768 ? true : false;
    };

    useEffect(() => {
        const header = document.querySelector(`.${styles.header}`);
        const button = document.querySelector(`.${styles.button}`);

        if (!header || !button) return;

        header.style.left = (!isVisible && isMobile) ? '-100%' : '0%';
        button.style.left = (!isVisible && isMobile) ? '100%' : '16px';
    }, [isVisible]);

    useEffect(() => {
        setIsLoading(false);
        getPlaylists().then((res) => {
            dispatch(setPlaylists(res.data));
        });
    }, []);
    
    return (
        <div className={styles.header}>
            <div className={styles.button} onClick={() => setIsVisible(!isVisible)}>
                <Image src={isVisible ? menu : menu_color} alt="menu icon" />
            </div>
            <div className={styles.menu}>
                <p className={styles.title}>Sukify</p>
                <Link href="/musics" className={styles.link}>Musics</Link>
                <Link href="/playlists" className={styles.link}>Playlists</Link>
                <hr className={styles.separator} />
                <p className={styles.title}>Your music</p>
                <div className={styles.list}>{playlists.map((playlist) => (<Link href={`/playlists/${playlist.id}`} className={styles.link} key={playlist.id}>{playlist.name}</Link>))}</div>
            </div>
        </div>
    );
};
