'use client'

import { getPlaylists } from "@/utils/api";
import { useState } from "react";

export default function playlistList() {
    const [ playlists, setPlaylists ] = useState([]);

    useEffect(() => {
        getPlaylists(10, 0).then((res) => {
            setPlaylists(res.data);
        });
    }, []);

    return (
        <p>{playlists.length}</p>
    );
}
