'use client'

import styles from './page.module.css';
import PlaylistList from '../../components/PlaylistList';
import { getPlaylists } from "@/utils/api";
import { useState, useEffect } from "react";

export default function Playlists() {
  const [ playlists, setPlaylists ] = useState([]);

  useEffect(() => {
      getPlaylists(10, 0).then((res) => {
          setPlaylists(res.data);
      });
  }, []);

  return (
    <>
      <p>This is the playlists route</p>
      { playlists.length > 0 && <PlaylistList playlists={playlists} /> }
    </>
  );
}
