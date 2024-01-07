import styles from './page.module.css'

export default function Playlist({ params }) {
  return (
    <p>This is the playlist route : { params.id}</p>
  )
}
