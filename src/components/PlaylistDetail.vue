<template>
  <div id="pl-deatil">
    <div class="headerArea">
      <div class="pld-background">
        <img width="100%" height="100%" :src="plInfo.coverImgUrl " alt />
      </div>
      <div class="pld-content">
        <headers class="headers">
          <template v-slot:top1>
            <i class="el-icon-arrow-left" @click="handleToBack"></i>
          </template>
          <template v-slot:top2>
            <p class="pld-title">歌单</p>
          </template>
        </headers>
        <div class="pld-plInfoArea">
          <div class="pld-plInfo">
            <div class="pld-plInfo-cover">
              <div class="plCover">
                <img :src="plInfo.coverImgUrl" width="100%" height="100%" alt />
              </div>
            </div>
            <div class="pld-plInfo-userInfo">
              <p class="plName">{{plInfo.name}}</p>
              <p class="userName"></p>
            </div>
          </div>
          <div class="pld-option-btn"></div>
        </div>
      </div>
    </div>

    <div class="pld-mslist">
      <div class="mslist-playAll"></div>
      <div class="mslistDeatile">
        <ul>
          <router-link
            tag="li"
            :to="{path:'/player',query:{msid:item.id}}"
            class="msitem"
            v-for="(item,index) in plInfo.tracks"
            :key="item.id"
          >
            <ul>
              <li class="msOrder">{{index}}</li>
              <li class="msDetail">
                <p class="msName">{{item.name}}</p>
                <p
                  v-for="authorName in item.ar"
                  class="msAuthor"
                  :key="authorName.id"
                >/{{authorName.name}}</p>
                <p class="msAuthor">- {{item.al.name}}</p>
              </li>

              <li class="msMore">
                <i class="el-icon-more"></i>
              </li>
            </ul>
          </router-link>
        </ul>
      </div>
    </div>

    <div class="stone"></div>
  </div>
</template>

<script>
import headers from "./Headers";
export default {
  name: "playlistDeatil",
  components: {
    headers
  },
  data() {
    return {
      bgcImg: {},
      plid: "",
      plInfo: {}
    };
  },
  methods: {
    handleToBack() {
      this.$router.go(-1);
    }
  },
  activated() {
    this.plid = this.$route.query.plid;
    var requestUrl = "http://localhost:3000/playlist/detail?id=" + this.plid;
    this.axios.get(requestUrl).then(res => {
      if (res.data.code === 200) {
        this.plInfo = res.data.playlist;
        this.$store.commit({
          type: "ChplaylistInfo",
          playlistInfo: res.data.playlist.tracks
        });
         this.$store.commit({
          type: "ChplaylistInfo",
          playlistInfo: res.data.playlist.tracks
        });
      } else {
        alert("数据请求失败");
      }
    });
  }
};
</script>

<style>
#pl-deatil {
  height: 100%;
}
.headers {
  padding-top: 0;
  color: rgb(238, 238, 238);
}
.pld-title {
  font-size: 14px;
}

.headerArea {
  position: relative;
  width: 100%;
}

.pld-plInfoArea {
  position: relative;
  width: 100%;
  height: 180px;
  margin-top: 8px;
}
.pld-background {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  filter: blur(12px);
}
.pld-plInfo {
  display: flex;
  width: 100%;
  height: 140px;
}
.pld-content {
  position: relative;
  width: 100%;
  height: 100%;
}
.pld-plInfo-cover {
  flex: 4;
  height: 140px;
}
.plCover {
  position: relative;
  top: 50%;
  margin: 0 auto;
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  border-radius: 6px;
  overflow: hidden;
  border-radius: 6px;
}
.pld-plInfo-userInfo {
  flex: 6;
  padding-top: 18px;
}
.plName {
  color: wheat;
  font-size: 12px;
  margin-bottom: 10px;
}
.userName {
  font-size: 8px;
  color: whitesmoke;
}
.pld-mslist {
  width: 100%;
}
.mslist-playAll {
  width: 100%;
  height: 30px;
}
.mslistDeatile {
  width: 100%;
  margin-top: 10px;
}
.msitem {
  width: 100%;
  height: 30px;
  margin-top: 10px;
}
.msitem ul {
  display: flex;
  height: 30px;
  width: 100%;
}
.msitem ul li {
  height: 30px;
}
.msOrder {
  flex: 1;
  text-align: center;
  line-height: 30px;
}
.msDetail {
  flex: 8;
  overflow: hidden;
  line-height: 15px;
}
.msName {
  font-size: 11px;
  height: 15px;
  overflow: hidden;
  font-weight: bold;
}
.msAuthor {
  float: left;
  height: 15px;
  margin-left: -4px;
  margin-right: 5px;
  font-size: 8px;
}
.msMore {
  flex: 1;
  text-align: center;
  line-height: 30px;
}
.stone {
  height: 35px;
}
</style>