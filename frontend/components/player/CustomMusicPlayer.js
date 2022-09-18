import React from "react";
import dynamic from "next/dynamic";
import {getMusicPlayerDuration} from "../../actions/index"
import 'react-jinke-music-player/assets/index.css'
import {connect} from "react-redux";
const MusicPlayer = dynamic(import('react-jinke-music-player'), {ssr: false})
const audioList2 = [
    {
        name: 'Hypo Critical',
        singer: 'Mwosa',
        cover:
            "https://novamdigital.com/media/photos/2020/10/21/reach_remastered.png",
        musicSrc:
            "https://novamdigital.com/media/songs/2020/10/21/Hypo_Critical.mp3"
    }
]
const audioList3 = [
    {
        name: 'Despacito',
        singer: 'Luis Fonsi',
        cover:
            'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
        musicSrc:
            'http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3',
    },
    {
        name: 'Bedtime Stories',
        singer: 'Jay Chou',
        cover:
            'http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg',
        musicSrc:
            'http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3',
    },
    {
        name: 'Dorost Nemisham',
        singer: 'Sirvan Khosravi',
        cover:
            'https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg',
        musicSrc:
            'https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3',
    },
]
const initialState = {
    clearPriorAudioLists: false,
    spaceBar: true,
    params: {},
    autoPlay:true,
    quietUpdate:false,
    songData: [],
    defaultPosition: {
        bottom: 100,
        right: 10
    }
}
class CustomMusicPlayer extends React.Component{
    constructor() {
        super();
        this.audio = null
        this.focusPlayer = React.createRef()
        this.focusPlayerFun = this.focusPlayerFun.bind(this)
    }
    focusPlayerFun(){
        this.focusPlayer.current.focus()
    }

    state = initialState

    componentDidMount() {
        // this.props.playPause ? this.audio.play() :this.audio.pause()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const myPrevProps = prevProps
        console.log("update")
        // this.props.playPause ? this.audio.play() :this.audio.pause()
        if ((this.props.addMusicToList !== myPrevProps.addMusicToList)) {
            const dataAddList = [{
                name: this.props.addMusicToList.data.song_title,
                singer: this.props.addMusicToList.data.description,
                cover: this.props.addMusicToList.data.photo_main,
                musicSrc: this.props.addMusicToList.data.audio_file
            }
            ]
            this.setState({clearPriorAudioLists: false, songData: dataAddList, quietUpdate: true, spaceBar: true,autoPlay:false})
            return;
        }
        if ((this.props.playMusicDetail !== prevProps.playMusicDetail)) {
            const data = [{
                name: this.props.playMusicDetail.data.song_title,
                singer: this.props.playMusicDetail.data.description,
                cover: this.props.playMusicDetail.data.photo_main,
                musicSrc: this.props.playMusicDetail.data.audio_file,
                action: "play"
            }
            ]
            this.setState(initialState)
            this.setState({songData: data, clearPriorAudioLists: true})
            return;
        }
        if ((this.props.songData !== myPrevProps.songData)) {
            this.setState({songData: {}, clearPriorAudioLists: true})
            const data = [{
                name: this.props.songData.data.song_title,
                singer: this.props.songData.data.description,
                cover: this.props.songData.data.photo_main,
                musicSrc: this.props.songData.data.audio_file,
            }
            ]
            // this.setState({songData: data, clearPriorAudioLists: true})

            if (this.props.songData.playlist) {

                let dataAddList = this.props.songData.playlist.map(item => {
                    if (item.song_title !== data[0].name) {
                        return {
                            name: item.song_title,
                            singer: item.description,
                            cover: item.photo_main,
                            musicSrc: item.audio_file
                        }
                    }
                    if (item.song_title === data[0].name) {
                        return {
                            name: "none",
                            singer: "none",
                            cover: "none",
                            musicSrc: "https://raw.githubusercontent.com/anars/blank-audio/master/1-second-of-silence.mp3"
                        }
                    }
                })
                this.setState(initialState)
                this.setState({
                    songData: data.concat(dataAddList),
                    clearPriorAudioLists: true,
                    quietUpdate: true,
                    spaceBar: true,
                    autoPlay: true
                })
                // this.setState({songData: data})
                // return;
            }else{
                this.setState(initialState)
                this.setState({
                    songData: data,
                    clearPriorAudioLists: true,
                    quietUpdate: true,
                    spaceBar: true,
                    autoPlay: true
                })
            }
        }
        if ((this.props.addMusicListToPlaylist !== myPrevProps.addMusicListToPlaylist)){
            let dataAddList = []
            dataAddList = this.props.addMusicListToPlaylist.data.map(item =>{
                return {
                    name: item.song_title,
                    singer: item.description,
                    cover: item.photo_main,
                    musicSrc: item.audio_file
                }
            })
            this.setState(initialState)
            this.setState({clearPriorAudioLists: false, songData: dataAddList})
        }
    }
    getSeekedInfo(audioInfo) {
        console.log(audioInfo)
    }
    render() {
        return (
            <div ref={this.focusPlayer}>
                <MusicPlayer className="music-player-custom" defaultPosition={this.state.defaultPosition}
                             audioLists={this.state.songData}
                             loadAudioErrorPlayNext={true}
                             responsive={false}
                             autoPlay={true}
                             seeked={true}
                             remove={false}
                             spaceBar={true}
                             quietUpdate={false}
                             toggleMode={true}
                             mode="full"
                             playMode="orderLoop"
                             showDestroy={false}
                             showDownload={false}
                             clearPriorAudioLists={this.state.clearPriorAudioLists}
                             showPlayMode={false}
                             onAudioProgress = {(audioInfo) => {
                                 // console.log(audioInfo)
                                 if (Math.trunc(audioInfo.currentTime) === 7){

                                     this.props.getMusicPlayerDuration(audioInfo.currentTime)
                                 }
                             }}
                             onAudioSeeked = {(audioInfo) => this.getSeekedInfo(audioInfo)}
                             getAudioInstance={(audio) => {
                                 this.audio = audio
                             }}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        songData: state.playMusic.musicData,
        addMusicToList: state.playMusic.addMusicToList,
        playMusicDetail: state.playMusic.musicDetailData,
        addMusicListToPlaylist: state.fetchMusicplayerPlaylist.musicPlaylistPlayerData
    }
}
export default connect(mapStateToProps, {getMusicPlayerDuration})(CustomMusicPlayer);