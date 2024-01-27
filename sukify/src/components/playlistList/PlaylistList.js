'use client'

import { useSelector } from "react-redux";
import styles from "./PlaylistList.module.css";
import Playlist from "../playlist/Playlist";

export default function PlaylistList() {
  const playlists = useSelector((state) => state.playlists.playlists);

  return (
    <div className={styles.playlists}>
        { playlists.length ? playlists.map((playlist) => <Playlist key={playlist.id} playlist={playlist} /> ) : <p className={styles.empty}>No playlists :/</p> }
    </div>
  );
}
