'use client'

import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import Link from 'next/link';
import { useEffect } from 'react';
import { setPlaylists } from '@/store/playlistsSlice';
import { getPlaylists } from '@/utils/api';

export default function Header() {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlists.playlists);

    useEffect(() => {
        getPlaylists(10, 0).then((res) => {
            dispatch(setPlaylists(res.data));
        });
    }, []);

    return (
        <div className={styles.header}>
            {/* <div className={styles.logo}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png" alt="logo" />
            </div> */}
            <div className={styles.menu}>
                <p className={styles.title}>Sukify</p>
                <Link href="/musics" className={styles.link}>Musics</Link>
                <Link href="/playlists" className={styles.link}>Playlists</Link>
                <p className={styles.title}>Your music</p>
                {playlists.map((playlist) => (
                    <Link href={`/playlists/${playlist.id}`} className={styles.link} key={playlist.id}>{playlist.name}</Link>
                ))}
            </div>
        </div>
    );
};
