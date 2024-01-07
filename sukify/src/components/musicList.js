'use client'

import { getMusics } from "@/utils/api";
import { useState } from "react";

export default function musicList() {
    const [musics, setMusics] = useState([]);

    useEffect(() => {
        getMusics(10, 0).then((res) => {
            setMusics(res.data);
        });
    }, []);

    return (
        <p>{musics.length}</p>
    );
}
