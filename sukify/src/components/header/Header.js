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

    const [ isVisible, setIsVisible ] = useState(false);
    const isMobile = window.innerWidth < 768 ? true : false;

    useEffect(() => {
        const menu = document.querySelector(`.${styles.menu}`);        
        menu.style.transform = (!isVisible && isMobile) ? 'translateX(-100%)' : 'translateX(0)';
        menu.style.transition = 'transform 0.5s';
    }, [isVisible]);

    useEffect(() => {
        getPlaylists(10, 0).then((res) => {
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
                {playlists.map((playlist) => (
                    <Link href={`/playlists/${playlist.id}`} className={styles.link} key={playlist.id}>{playlist.name}</Link>
                ))}
            </div>
        </div>
    );
};
