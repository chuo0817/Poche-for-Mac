import React from 'react'
// import { Link } from 'react-router-dom'
import './List.css'
import { fetchMusic, fetchAlbumList } from '../../util/request'

let propsEventLoop = false
class List extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      playingMusicList: [],
      previewMusicList: [],
      albumList: [],
      playingAlbum: {},
      previewAlbum: {},
      currentMusicIndex: 0,
    }
  }

  componentDidMount() {
    const index = this.state.currentMusicIndex
    fetchAlbumList(list => {
      this.setState({ albumList: list, previewAlbum: list[index] })
      const firstAlbumId = list[index].id;
      fetchMusic(firstAlbumId, musicList => {
        this.setState({ previewMusicList: musicList, playingMusicList: musicList, playingAlbum: list[index] })
        this.props.onChangeMusic(musicList[0])
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (propsEventLoop) {
      propsEventLoop = false
      return
    }
    if (nextProps.execEvent === 'next') {
      propsEventLoop = true
      let index = ++this.state.currentMusicIndex
      if (index >= this.state.playingMusicList.length) {
        index = 0
      }      
      const music = this.state.playingMusicList[index]
      this.setState({ currentMusicIndex: index })
      this.props.onChangeMusic(music)
    } else if (nextProps.execEvent === 'previous') {
      propsEventLoop = true
      let index = --this.state.currentMusicIndex
      const music = this.state.playingMusicList[index]
      if (index === 0) {
        index = this.state.playingMusicList.length - 1
      }
      this.setState({ currentMusicIndex: index })
      this.props.onChangeMusic(music)
    }
  }

  render() {
    return (
      <div className="list-container">
        <div className="music-list">
          <div className="header">
            <span>{this.state.previewAlbum.title}</span>
          </div>
          <div className="list">
            {this.state.previewMusicList.map((music, index) => (
              <div className={`item ${index === this.state.index ? 'active' : ''}`}
                key={music.id} onDoubleClick={this.handleSelectedMusic.bind(this, music, index)}>
                <div className="content">
                  <span className="cover"><img src={music.cover} alt="" /></span>
                  <div className="info">
                    <div className="title">{music.title}</div>
                    <div className="artist">{music.artist}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="albumlist">
          <div className="list">
            {this.state.albumList.map((album, index) => (
              <div className={`item ${index === this.state.index ? 'active' : ''}`}
                style={{ backgroundImage: `url(${album.cover})` }} key={album.id}
                onClick={this.handlePreviewAlbum.bind(this, index)}>
                <span className="title">{album.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  handleSelectedMusic = (music, index) => {
    if (this.state.previewAlbum.id === this.state.playingAlbum.id) {
      const music = this.state.playingMusicList[index]
      this.props.onChangeMusic(music)
      this.setState({ currentMusicIndex: index })
    } else {
      const music = this.state.previewMusicList[index]
      this.setState({
        playingAlbum: this.state.previewAlbum,
        playingMusicList: this.state.previewMusicList,
        currentMusicIndex: index
      })
      this.props.onChangeMusic(music)
    }
  }

  handlePreviewAlbum = (index) => {
    const selectedAlbum = this.state.albumList[index]
    fetchMusic(selectedAlbum.id, musicList => {
      this.setState({ previewMusicList: musicList, previewAlbum: selectedAlbum })
    })
  }
}
export default List
