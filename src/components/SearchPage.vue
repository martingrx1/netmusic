<template>
  <div id="searchPage">
    <div class="search-bar">
      <ul>
        <li class="searchBox">
          <el-input
            size="mini"
            placeholder="请输入搜索内容"
            suffix-icon="el-icon-date"
            v-model="searchValue"
          ></el-input>
        </li>
        <li @click="handleToBack" class="cancel-btn">取消</li>
        <li class="classify-btn">
          <i class="el-icon-user"></i>
        </li>
      </ul>
    </div>
    <div class="search-display">
      <div class="search-word">搜索: {{searchValue}}</div>
      <ul>
        <router-link
          tag="li"
          :to="{path:'/player',query:{msid:item.id}}"
          v-for="item in searchResult.songs"
          class="result-item"
          :key="item.id"
          @touchstart.native="apendMs(item.id)"
        >
          <ul>
            <li class="result-icon">
              <i class="el-icon-search"></i>
            </li>
            <li class="result-name">
              <p class="result-msName">{{item.name}}</p>
              <p v-for="msAr in item.artists" class="result-msInfo-ar" :key="msAr.id">{{msAr.name}}</p>
              <p class="result-msInfo-al">- {{item.album.name}}</p>
            </li>
          </ul>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchPage",
  data() {
    return {
      searchValue: "",
      baseRequestUrl: "http://192.168.2.112:3000",
      searchResult: {},
      msInfo: {}
    };
  },
  watch: {
    searchValue(value) {
      var that = this; //将this的值保留
      this.cancelRequest(); //防抖 在快速多次请求时只保留最后一次请求
      this.axios
        .get(this.baseRequestUrl + "/search?keywords=" + value, {
          //防抖 在快速多次请求时只保留最后一次请求
          cancelToken: new this.axios.CancelToken(function(c) {
            that.source = c;
          })
        })
        .then(res => {
          if (res.data.code === 200) {
            this.msInfo = res.data.result.songs;
            this.searchResult = res.data.result;
          } else {
            alert("网络请求失败");
          }
        })
        .catch(err => {
          //防抖 在快速多次请求时只保留最后一次请求
          if (axios.isCancel(err)) {
            console.log("Rquest canceled", err.message); //请求如果被取消，这里是返回取消的message
          } else {
            //handle error
            console.log(err);
          }
        });
    }
    //   this.axios
    //     .get(this.baseRequestUrl + "/search?keywords=" + value)
    //     .then(res => {
    //       if (res.data.code === 200) {
    //         this.msInfo = res.data.result.songs;
    //         this.searchResult = res.data.result;
    //       } else {
    //         alert("网络请求失败");
    //       }
    //     });
    // }
  },
  methods: {
    apendMs(msid) {
      var temPlaylist = this.$store.state.playlistInfo;
      this.axios
        .get("http://localhost:3000/song/detail?ids=" + msid)
        .then(res => {
          temPlaylist = [res.data.songs[0]].concat(temPlaylist);
          this.$store.commit({
            type: "ChplaylistInfo",
            playlistInfo: temPlaylist
          });
        });
    },
    handleToBack() {
      this.$router.go(-1);
    },
    cancelRequest() {
      //防抖 在快速多次请求时只保留最后一次请求
      if (typeof this.source === "function") {
        this.source("终止请求");
      }
    }
  }
};
</script>

<style>
#searchPage {
  padding: 6px;
}
.search-bar {
  width: 100%;
  height: 40px;
}
.search-bar ul {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  text-align: center;
}
.searchBox {
  flex: 6;
  padding-left: 5px;
}
.cancel-btn {
  flex: 1;
  font-size: 12px;
}
.classify-btn {
  flex: 1;
  font-size: 18px;
}
.search-display {
  width: 100%;
  margin-top: 10px;
  font-size: 11px;
}
.search-word {
  width: 100%;
  padding-left: 7px;
  height: 20px;
}
.result-item::before {
  content: " ";
  width: 95%;
  margin: 0 auto;
  display: block;
  border-top: 1px solid rgb(230, 226, 226);
}
.result-item {
  width: 100%;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
}
.result-item ul {
  display: flex;
  width: 100%;
  height: 40px;
}
.result-icon {
  flex: 1;
  text-align: center;
}
.result-name {
  flex: 9;
  height: 40px;
  overflow: hidden;
}
.result-msName {
  height: 25px;
  line-height: 30px;
  color: rgb(31, 87, 192);
  font-weight: bold;
}
.result-msInfo-ar {
  height: 15px;
  line-height: 8px;
  margin-left: -4px;
  font-size: 9px;
  float: left;
  color: rgb(136, 136, 128);
}
.result-msInfo-ar::before {
  content: "/";
  display: inline-block;
}

.result-msInfo-al {
  height: 15px;
  line-height: 8px;
  font-size: 9px;
  float: left;
  overflow: hidden;
  color: rgb(136, 136, 128);
}
</style>