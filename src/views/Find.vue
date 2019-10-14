<template>
  <div id="find">
    <headers>
      <template v-slot:top1>
        <i class="el-icon-microphone"></i>
      </template>
      <template v-slot:top2>
        <router-link tag="div" to="/search">
          <search></search>
        </router-link>
      </template>
    </headers>
    <Scroller>
      <div class="find-content">
        <div class="banner">
          <div class="block">
            <el-carousel arrow="never" height="320px" :interval="3000" indicator-position="none">
              <el-carousel-item v-for="item in bannerImg" :key="item.bannerId">
                <img width="100%" height="100%" class="small" :src="item.pic" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <recomBtn>
          <i slot="1" class="el-icon-edit"></i>
          <i slot="2" class="el-icon-star-on"></i>
          <i slot="3" class="el-icon-info"></i>
          <i slot="4" class="el-icon-help"></i>
          <i slot="5" class="el-icon-s-release"></i>
        </recomBtn>
        <div class="recomd-area">
          <div class="recomd-mslist">
            <div class="recomd-mslist-title">推荐歌单</div>
            <div class="recomd-mslist-content">
              <ul>
                <li v-for="item in recomdMsList" :key="item.id">
                  <img :src="item.picUrl" alt width="100%" height="80%" />
                  <p class="recomd-mslist-content-name">{{item.name}}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="recomd-mslist">
            <div class="recomd-mslist-title">推荐歌单</div>
            <div class="recomd-mslist-content">
              <ul>
                <li v-for="item in recomdMsList" :key="item.id">
                  <img :src="item.picUrl" alt width="100%" height="80%" />
                  <p class="recomd-mslist-content-name">{{item.name}}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="recomd-mslist">
            <div class="recomd-mslist-title">推荐歌单</div>
            <div class="recomd-mslist-content">
              <ul>
                <li v-for="item in recomdMsList" :key="item.id">
                  <img :src="item.picUrl" alt width="100%" height="80%" />
                  <p class="recomd-mslist-content-name">{{item.name}}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="recomd-mslist">
            <div class="recomd-mslist-title">推荐歌单</div>
            <div class="recomd-mslist-content">
              <ul>
                <li v-for="item in recomdMsList" :key="item.id">
                  <img :src="item.picUrl" alt width="100%" height="80%" />
                  <p class="recomd-mslist-content-name">{{item.name}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
         
    </Scroller>
 <div class="stone"></div>
    <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from "../components/TabBar";
import headers from "../components/Headers";
import search from "../components/Search";
import recomBtn from "../components/RecomBtn";
export default {
  name: "find",
  components: {
    tabBar,
    headers,
    search,
    recomBtn
  },
  data() {
    return {
      bannerImg: [],
      recomdMsList: []
    };
  },
  mounted() {
    this.axios.get("http://localhost:3000/banner?type=2").then(res => {
      if (res.request.statusText === "OK") {
        this.bannerImg = res.data.banners;
      } else {
        console.log("网络请求失败");
      }
    });
    this.axios.get("http://localhost:3000/personalized").then(res => {
      if (res.status === 200) {
        for (let i = 0; i < 6; i++) {
          this.recomdMsList.push(res.data.result[i]);
        }
      } else {
        console.log("网络请求失败");
      }
    });
  }
};
</script>

<style >
#find {
  padding: 6px;
  height: 100%;
}
.find-content {
  width: 100%;
  margin-top: 10px;
  background-color: white;
}
.banner {
  width: 100%;
  margin-bottom: 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.recomd-area {
  width: 100%;
  margin-top: 10px;
}
.recomd-mslist {
  width: 100%;
}
.recomd-mslist-title {
  width: 100%;
  height: 20px;
  line-height: 25px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
}
.recomd-mslist-content {
  width: 100%;
}
.recomd-mslist-content ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.recomd-mslist-content ul li {
  width: 30%;
  flex-grow: 1;
  margin-right: 4px;
  margin-top: 8px;
}
.recomd-mslist-content ul li:nth-child(3) {
  margin-right: 0;
}
.recomd-mslist-content ul li:nth-child(6) {
  margin-right: 0;
}
.stone {
  height: 30px;
}

</style>