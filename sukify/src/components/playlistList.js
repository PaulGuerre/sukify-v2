'use client'

import { useSelector } from "react-redux";

export default function PlaylistList() {
    const playlists = useSelector((state) => state.playlists.playlists);
    
    return (
        <div>
            <h1>Playlist List</h1>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>{playlist.name}</li>
                ))}
            </ul>
        </div>
    );
}
