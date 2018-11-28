import axios from 'axios'

export function fetchAlbumList(cb) {
  axios
      .get('/playlists/', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        const items = res.data
        cb(items)
      })
}

export function fetchMusic(id, cb) {
  const url = '/playlists/' + id
  axios
      .get(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        const items = res.data.map(i => {
          return {
            id: i.id,
            cover: i.cover,
            artist: i.artist,
            title: i.name,
            url: i.url,
          }
        })
        cb(items)
      })
}

