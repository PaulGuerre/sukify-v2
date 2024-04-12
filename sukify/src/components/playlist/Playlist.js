import Link from 'next/link'
import styles from './Playlist.module.css'
import Image from 'next/image'
import play from "@/lib/icons/play.svg";
import { getPlaylistMusics } from '@/utils/api';
import { useDispatch } from 'react-redux';
import { setCurrentMusic, setPlayingMusics } from '@/store/playerSlice';

export default function Playlist({ playlist }) {
    const dispatch = useDispatch();

    const handlePlayClick = (event) => {
        event.preventDefault();
        getPlaylistMusics(playlist.id, 1000, 0).then((res) => {
            dispatch(setPlayingMusics(res.data));
            dispatch(setCurrentMusic({ ...res.data[0], playlistID: playlist.id, playlistName: playlist.name }));
        });
    };

    return (
        <Link href={`/playlists/${playlist.id}`} className={styles.playlist}>
            <div className={styles.playlistName}>{playlist.name}</div>
            <div className={styles.play} onClick={handlePlayClick}>
                <Image src={play} alt="play icon" />
            </div>
            <div className={styles.playlistLength}>{playlist.MusicCount} musics</div>
        </Link>
    )
}
