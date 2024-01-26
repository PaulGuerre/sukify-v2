'use client'

import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./PlaylistList.module.css";
import Image from "next/image";
import play from "@/lib/icons/play.svg";

export default function PlaylistList() {
  const playlists = useSelector((state) => state.playlists.playlists);

  return (
    <div className={styles.playlists}>
        {
          playlists.length ? playlists.map((playlist) => (
            <Link key={playlist.id} href={`/playlists/${playlist.id}`} className={`${styles.playlist} ${styles[`cover-${Math.floor(Math.random() * 4) + 1}`]}`}>
                <div className={styles.playlistName}>{playlist.name}</div>
                <div className={styles.playlistLength}>{playlist.MusicCount} musics</div>
                <div className={styles.play}>
                    <Image src={play} alt="play icon" />
                </div>
            </Link>
          )) : <p className={styles.empty}>No playlists :/</p>
        }
    </div>
  );
}
