'use client'

import { useSelector } from "react-redux";

export default function MusicList() {
    const musics = useSelector((state) => state.musics.musics);

    return (
        <div>
            <h1>Music List</h1>
            <ul>
                {musics.map((music) => (
                    <li key={music.id}>{music.musicTitle}</li>
                ))}
            </ul>
        </div>
    );
}
