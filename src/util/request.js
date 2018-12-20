import axios from 'axios'

const $http = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
})

export function fetchAlbumList(cb) {
  $http.get('/playlists/')
    .then(res => {
      const items = res.data
      cb(items)
    })
}

export function fetchMusic(id, cb) {
  const url = '/playlists/' + id
  $http.get(url,)
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

