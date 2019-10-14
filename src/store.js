import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogined:false,
    userInfo:{},
    playlistInfo:{},
    msInfo:{},
    msPlayUrl:'',
    playStatus:{
      isPlay:false,
      playType:['cycle','continuous','random']
    },
    msPlayInfo:{
      currentPlaytime: -1,
      isJump:false
    },
  },
  getters:{
    getUserInfo:state=>{
      return state.userInfo
    },
    getplaylistInfo:state=>{
      return state.playlistInfo
    },
    getmsInfo:state=>{
      return state.msInfo
    },
    getmsPlayUrl:state=>{
      return state.msPlayUrl
    },
  },
  mutations: {
    ChUserInfo(state,value){
      state.userInfo = value.userInfo;
    },
    ChloginStatus(state,value){
      state.islogined = value.islogined;
    },
    ChplaylistInfo(state,value){
      state.playlistInfo = value.playlistInfo;
    },
    ChmsInfo(state,value){
      state.msInfo = value.msInfo;
    },
    ChmsPlayUrl(state,value){
      state.msPlayUrl = value.msPlayUrl;
    },
    ChmsPlayStatus(state,value){
      state.playStatus = value.PlayStatus;
    },
    ChmsPlayInfo(state,value){
      state.msPlayInfo = value.msPlayInfo;
    },
  },
  actions: {

  }
})
