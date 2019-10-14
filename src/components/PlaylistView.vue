 <template>
  <div id="pl-view">
    <headers>
      <template v-slot:top1>
        <i class="el-icon-microphone"></i>
      </template>
      <template v-slot:top2>
        <p class="title">我的音乐</p>
      </template>
    </headers>

    <div class="recomd-btn-rapper">
      <div class="recomd-btn">
        <recomBtn :btnNum="7">
          <i slot="1" class="el-icon-edit"></i>
          <i slot="2" class="el-icon-star-on"></i>
          <i slot="3" class="el-icon-info"></i>
          <i slot="4" class="el-icon-help"></i>
          <i slot="5" class="el-icon-s-release"></i>
          <i slot="6" class="el-icon-edit"></i>
          <i slot="7" class="el-icon-star-on"></i>
        </recomBtn>
      </div>
    </div>
    <div class="playSelect">
      <ul>
        <li class="optonsItem">
          <ul>
            <li class="optItem-icons">
              <i class="el-icon-headset"></i>
            </li>
            <li class="optItem-name">本地音乐</li>
            <li class="optItem-num">0</li>
          </ul>
        </li>
        <li class="optonsItem">
          <ul>
            <li class="optItem-icons">
              <i class="el-icon-time"></i>
            </li>
            <li class="optItem-name">最近播放</li>
            <li class="optItem-num">0</li>
          </ul>
        </li>
        <li class="optonsItem">
          <ul>
            <li class="optItem-icons">
              <i class="el-icon-loading"></i>
            </li>
            <li class="optItem-name">我的电台</li>
            <li class="optItem-num">0</li>
          </ul>
        </li>
        <li class="optonsItem">
          <ul>
            <li class="optItem-icons">
              <i class="el-icon-user"></i>
            </li>
            <li class="optItem-name">我的收藏</li>
            <li class="optItem-num">0</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="playlistArea">
      <div class="playlistTitle">
        <ul>
          <li class="hiddenMslist">
            <div>
              <i class="el-icon-arrow-down"></i>
            </div>
          </li>
          <li class="mslistTitle">我创建的歌单</li>
          <li class="createNewList">
            <div>
              <i class="el-icon-plus"></i>
            </div>
          </li>
          <li class="moreOption">
            <div>
              <i class="el-icon-more"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="playlistBox">
        <ul>
          <router-link
            tag="li"
            :to="{path:'/mine/pld',query:{plid:item.id}}"
            v-for="item in userPlaylist"
            class="playlistItem"
            :key="item.id"
          >
            <div class="playlistCover">
              <img :src="item.coverImgUrl" width="100%" height="100%" alt />
            </div>
            <div class="playlistInfo">
              <div class="playlistName">{{item.name}}</div>
              <div class="msNum">{{item.trackCount}}首</div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>
 
 <script>
import headers from "./Headers";
import recomBtn from "../components/RecomBtn";
export default {
  name: "playlistView",
  components: {
    headers,
    recomBtn
  },
  data() {
    return {
      userInfo: {},
      userPlaylist: []
    };
  },
  activated() {
    this.userInfo = this.$store.getters.getUserInfo;
    var requestUrl =
      "http://localhost:3000/user/playlist?uid=" + this.userInfo.userId;
    this.axios.get(requestUrl).then(res => {
      if (res.data.code === 200) {
        this.userPlaylist = res.data.playlist;
      } else {
        console.log("请求失败");
      }
    });
  },
  methods: {}
};
</script>
 
 <style>
#pl-view {
  overflow: hidden;
  height: 100%;
  
}
.title {
  font-size: 12px;
}
.recomd-btn-rapper {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  overflow-x: scroll;
  /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
  -ms-overflow-style: none;
  /*火狐下隐藏滚动条*/
  overflow: -moz-scrollbars-none;
}
.recomd-btn-rapper::-webkit-scrollbar {
  display: none;
}
.recomd-btn {
  width: 500px;
  height: 50px;
}
.playSelect {
  width: 100%;
  height: 160px;
  margin-top: 10px;
}
.playSelect ul {
  width: 100%;
  height: 100%;
}
.optonsItem {
  width: 100%;
  height: 40px;
}
.optonsItem::before {
  content: " ";
  width: 600px;
  margin-left: -5px;
  display: block;
  border-top: 1px solid rgb(230, 226, 226);
}
.optonsItem ul {
  display: flex;
  width: 100%;
  height: 100%;
  line-height: 40px;
}
.optItem-icons {
  height: 40px;
  flex: 2;
  font-size: 18px;
  text-align: center;
}
.optItem-name {
  flex: 7;
  font-size: 12px;
  height: 30px;
}
.optItem-num {
  flex: 2;
  font-size: 12px;
  text-align: center;
}
.playlistArea::before {
  content: " ";
  width: 600px;
  margin-left: -5px;
  display: block;
  border-top: 6px solid rgb(230, 226, 226);
}
.playlistArea {
  width: 100%;
  padding: 0 6px 0 6px;
  margin-top: 5px;
}
.playlistTitle {
  width: 100%;
  height: 30px;
}
.playlistTitle ul {
  display: flex;
  width: 100%;
  height: 30px;
}
.playlistTitle ul li {
  height: 30px;
  line-height: 30px;
}

.hiddenMslist {
  flex: 1;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}
.mslistTitle {
  flex: 7;
  font-size: 12px;
}
.createNewList {
  flex: 1;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}
.moreOption {
  flex: 1;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}

.playlistBox {
  width: 100%;
  margin-top: 5px;
}

.playlistBox ul {
}
.playlistItem {
  display: flex;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
}
.playlistCover {
  flex: 2;
  border-radius: 4px;
  overflow: hidden;
}
.playlistInfo {
  flex: 12;
  padding-top: 2px;
  padding-left: 10px;
}
.playlistName {
  font-size: 10px;
}
.msNum {
  font-size: 8px;
  color: grey;
}
</style>