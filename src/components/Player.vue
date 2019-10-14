<template>
  <div id="player">
    <div class="flurBackground">
      <img width="100%" height="100%" :src="msInfo.al.picUrl" alt />
    </div>
    <div class="player-content">
      <headers class="headers">
        <template v-slot:top1>
          <i class="el-icon-arrow-left" @click="handleToBack"></i>
        </template>
        <template v-slot:top2>
          <p class="pla-title">{{msInfo.name}}</p>
          <p class="pla-arName">{{arName}}</p>
        </template>
      </headers>
      <div class="player-area">
        <div class="displayArea" @touchstart="hiddenPlayOrder">
          <div class="fixMid">
            <div class="showCover" :class="{'routater-pause' : isPlay}">
              <img width="100%" height="100%" :src="msInfo.al.picUrl" alt />
            </div>
          </div>
        </div>
        <div class="playerControl">
          <div class="postion-mid">
            <div class="slider">
              <div class="block">
                <el-slider
                  @touchmove.native="chPlayTime"
                  @change="sliderChange"
                  @input="sliderInput"
                  v-model="value1"
                ></el-slider>
              </div>
            </div>
            <!-- <audio ref="music">
              <source :src="msPlayUrl" />
            </audio>-->
            <div class="control-btn">
              <ul>
                <li @touchstart="chPlayType" class="playType">
                  <i :class="playTypeIcons"></i>
                </li>
                <li @touchstart="playbackward" class="playbackward">
                  <i class="el-icon-arrow-left"></i>
                </li>
                <li @touchstart="chPlayStatus" class="playbtn">
                  <i :class="playicons"></i>
                </li>
                <li @touchstart="playforward" class="playforward">
                  <i class="el-icon-arrow-right"></i>
                </li>
                <li class="playOption" @touchstart.prevent="chPlayOrderShow">
                  <i class="el-icon-s-unfold"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <transition name="bounce">
        <div class="play-order" v-show="isShowPlayOrder">
          <div class="play-order-list">
            <ul>
              <li
                @click.stop="handleToPlay(ms.id,index)"
                :class="{red:currentIndex===index}"
                v-for="(ms,index) in plInfo"
                class="play-order-item"
                :key="ms.id"
              >
                <ul>
                  <li class="play-order-msInfo">
                    <p class="play-order-msName">{{ms.name}} -</p>
                    <p v-for="ar in ms.ar" class="play-order-arName" :key="ar.id">{{ar.name}}/</p>
                  </li>
                  <li class="removeItem">
                    <i class="el-icon-close"></i>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div @touchstart="hiddenPlayOrder" class="play-order-close">
            <p>关闭</p>
          </div>
        </div>
      </transition>
    </div>
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
      value1: 0,
      arName: "",
      msInfo: {},
      plInfo: {},
      msPlayUrl: " ",
      isPlay: false,
      isJump: false,
      isShowPlayOrder: false,
      playTypeIcons: "el-icon-refresh",
      playicons: "el-icon-video-pause",
      refreshPage: true,
      playType: 0,
      isRandomed: false,
      currentIndex: 0
    };
  },
  methods: {
    playStatusInit() {
      this.plInfo = this.$store.state.playlistInfo;
      this.arName = " ";
      this.isPlay = false;
      this.playicons = "el-icon-video-pause";
      for (var i = 0, len = this.msInfo.ar.length; i < len; i++) {
        this.arName += this.msInfo.ar[i].name + "/";
      }
      this.arName = this.arName.replace(/^\/|\/$/g, " ");
    },
    playforward() {
      switch (this.playType) {
        case 0:
          this.continuousPlay(1);
          break;
        case 1:
          this.continuousPlay(1);
          break;
        case 2:
          this.randomPlay();
          break;
      }
    },
    playbackward() {
      switch (this.playType) {
        case 0:
          this.continuousPlay(-1);
          break;
        case 1:
          this.continuousPlay(-1);
          break;
        case 2:
          this.randomPlay();
          break;
      }
    },
    continuousPlay(step) {
      if (this.isRandomed) {
        var msIndex = this.plInfo.indexOf(this.msInfo);
      } else {
        for (let i = 0, len = this.plInfo.length; i < len; i++) {
          if (this.plInfo[i].id === this.msInfo.id) {
            var msIndex = i;
          }
        }
      }
      if (msIndex + step >= this.plInfo.length) {
        msIndex = -1;
      } else if (msIndex + step < 0) {
        msIndex = this.plInfo.length;
      }
      setTimeout(() => {
        var randomMs = this.plInfo[msIndex + step];
        this.msInfo = randomMs;
        var msPlayUrl = "http://localhost:3000/song/url?id=" + this.msInfo.id;
        this.$store.commit({
          type: "ChmsInfo",
          msInfo: this.msInfo
        });
        this.axios.get(msPlayUrl).then(res => {
          this.msPlayUrl = res.data.data[0].url;
          this.$store.commit({
            type: "ChmsPlayUrl",
            msPlayUrl: res.data.data[0].url
          });
        });
        this.playStatusInit();
      }, 500);
    },
    randomPlay() {
      setTimeout(() => {
        var randomNum = parseInt(Math.random() * this.plInfo.length);
        var randomMs = this.plInfo[randomNum];
        this.msInfo = randomMs;
        var msPlayUrl = "http://localhost:3000/song/url?id=" + this.msInfo.id;
        this.$store.commit({
          type: "ChmsInfo",
          msInfo: this.msInfo
        });
        this.axios.get(msPlayUrl).then(res => {
          this.msPlayUrl = res.data.data[0].url;
          this.$store.commit({
            type: "ChmsPlayUrl",
            msPlayUrl: res.data.data[0].url
          });
        });
        this.playStatusInit();
      }, 500);

      this.isRandomed = true;
    },

    handleToBack() {
      this.$router.back();
    },
    chPlayType() {
      this.playType = this.playType == 2 ? 0 : ++this.playType;
      switch (this.playType) {
        case 0:
          this.playTypeIcons = "el-icon-refresh";
          break;
        case 1:
          this.playTypeIcons = "el-icon-sort";
          break;
        case 2:
          this.playTypeIcons = "el-icon-rank";
          break;
      }
    },
    chPlayStatus() {
      this.isPlay = !this.isPlay;
      if (this.isPlay == false) {
        this.playicons = "el-icon-video-pause";
      } else {
        this.playicons = "el-icon-video-play";
      }
      this.$store.commit({
        type: "ChmsPlayStatus",
        PlayStatus: { isPlay: !this.isPlay }
      });
    },
    chPlayTime() {
      this.isJump = true;
    },
    sliderChange(callback) {
      if (this.isJump) {
        this.$store.commit({
          type: "ChmsPlayInfo",
          msPlayInfo: {
            currentPlaytime: callback,
            isJump: true
          }
        });
        this.isJump = false;
      }
    },
    sliderInput(callback) {
      if (callback >= 100) {
        switch (this.playType) {
          case 0:
            this.continuousPlay(0);
            break;
          case 1:
            this.continuousPlay(1);
            break;
          case 2:
            this.randomPlay();
            break;
        }
      }
    },
    chPlayOrderShow() {
      this.isShowPlayOrder = !this.isShowPlayOrder;
    },
    hiddenPlayOrder() {
      this.isShowPlayOrder = false;
    },
    handleToPlay(msid, index) {
      this.currentIndex = index;
      this.axios
        .get("http://localhost:3000/song/detail?ids=" + msid)
        .then(res => {
          this.msInfo = res.data.songs[0];
          this.plInfo = this.$store.state.playlistInfo;
          this.$store.commit({
            type: "ChmsInfo",
            msInfo: this.msInfo
          });

          var msPlayUrl =
            "http://localhost:3000/song/url?id=" + this.msInfo.id;
          this.axios.get(msPlayUrl).then(res => {
            this.msPlayUrl = res.data.data[0].url;
            this.$store.commit({
              type: "ChmsPlayUrl",
              msPlayUrl: res.data.data[0].url
            });

            this.playStatusInit();
          });
        });
    }
  },
  watch: {
    "$store.state.msPlayInfo.currentPlaytime"(value) {
      if (!this.isJump) this.value1 = value;
    }
  },
  activated() {
    if (this.$route.query.msid != this.msInfo.id) this.refreshPage = true;

    if (this.refreshPage) {
      this.axios
        .get(
          "http://localhost:3000/song/detail?ids=" + this.$route.query.msid
        )
        .then(res => {
          this.msInfo = res.data.songs[0];
          this.plInfo = this.$store.state.playlistInfo;
          console.log(this.plInfo);
          this.$store.commit({
            type: "ChmsInfo",
            msInfo: this.msInfo
          });

          var msPlayUrl =
            "http://localhost:3000/song/url?id=" + this.msInfo.id;
          this.axios.get(msPlayUrl).then(res => {
            this.msPlayUrl = res.data.data[0].url;

            this.$store.commit({
              type: "ChmsPlayUrl",
              msPlayUrl: res.data.data[0].url
            });

            this.playStatusInit();
          });
        });

      this.refreshPage = false;
    } else {
      this.msInfo = this.$store.getters.getmsInfo;
    }
  }
};
</script>

<style  scoped>
#player {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: aliceblue;
}
.headers {
  padding-top: 6px;
  font-weight: normal !important;
}
.pla-arName {
  margin-top: -14px;
  width: 100%;
  overflow: hidden;
}
.pla-title {
  font-size: 12px;
}
.flurBackground {
  position: absolute;
  z-index: -1;
  background-size: 100% 100%;
  filter: blur(14px);
  width: 100%;
  height: 100%;
}
.player-content {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 10;
}
.player-area {
  width: 100%;
  height: 98%;
}
.displayArea {
  width: 100%;
  height: 80%;
}
.fixMid {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.showCover {
  border-radius: 50%;
  overflow: hidden;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  animation: que 18s linear infinite;
  box-shadow: 1px 1px 15px rgb(29, 28, 28);
}
.routater-pause {
  animation-play-state: paused;
  -webkit-animation-play-state: paused; /* Safari 和 Chrome */
}
@keyframes que {
  /*以百分比来规定改变发生的时间 也可以通过"from"和"to",等价于0% 和 100%*/
  0% {
    /*rotate(2D旋转) scale(放大或者缩小) translate(移动) skew(翻转)*/
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.playerControl {
  width: 100%;
  height: 20%;
}
.slider {
  width: 80%;
  height: 30px;
  margin: 0 auto;
}
.control-btn {
  width: 100%;
  height: 50px;
  padding-bottom: 20px;
}
.control-btn ul {
  display: flex;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: aliceblue;
}
.control-btn ul li {
  flex: 1;
  height: 50px;
  font-size: 18px;
}
.playbtn {
  font-size: 35px !important;
}
.postion-mid {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.play-order {
  position: absolute;
  bottom: 0;
  left: 0px;

  height: 80%;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-top: 20px;
  color: black;
  background-color: white;
}
.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(100%);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.play-order-list {
  width: 100%;
  height: 90%;
  overflow-y: scroll;
}

.play-order-list ul {
  width: 100%;
}
.play-order-item {
  width: 100%;
  height: 30px;
}
.red {
  color: red;
}

.play-order-item::before {
  content: " ";
  display: block;
  margin: 0 auto;
  padding-left: -6px;
  width: 95%;
  border-top: 1px solid rgba(207, 198, 198, 0.534);
}
.play-order-item ul {
  display: flex;
  width: 100%;
  height: 30px;
}
.play-order-msInfo {
  flex: 9;
  padding-left: 12px;
  overflow: hidden;
}
.removeItem {
  flex: 1;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
}
.play-order-msName {
  float: left;
  height: 30px;
  font-size: 11px;
  line-height: 30px;
}
.play-order-arName {
  float: left;
  height: 30px;
  color: grey;
  font-size: 10px;
  line-height: 30px;
}
.play-order-close::before {
  content: " ";
  display: block;
  margin: 0 auto;
  padding-left: -6px;
  width: 600px;
  border-top: 1px solid rgba(207, 198, 198, 0.534);
}
.play-order-close {
  width: 100%;
  height: 10%;
  color: rgb(36, 26, 26);
  font-size: 18px;
  text-align: center;
}
.play-order-close p {
  position: relative;
  margin: 0 auto;
  width: 30%;
  top: 50%;
  transform: translateY(-50%);
}
</style>