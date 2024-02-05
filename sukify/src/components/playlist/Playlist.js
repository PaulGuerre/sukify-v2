import Link from 'next/link'
import styles from './Playlist.module.css'
import Image from 'next/image'
import play from "@/lib/icons/play.svg";

export default function Playlist({ playlist }) {
    return (
        <Link href={`/playlists/${playlist.id}`} className={`${styles.playlist} ${styles[`cover-${Math.floor(Math.random() * 4) + 1}`]}`}>
            <div className={styles.playlistName}>{playlist.name}</div>
            <div className={styles.play}>
                <Image src={play} alt="play icon" />
            </div>
            <div className={styles.playlistLength}>{playlist.MusicCount} musics</div>
        </Link>
    )
}
