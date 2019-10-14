<template>
  <div id="account">
    <headers>
      <template v-slot:top1>
        <i class="el-icon-full-screen"></i>
      </template>
      <template v-slot:top2></template>
    </headers>
    <div class="account-content">
      <div class="userInfo">
        <div class="topInfo">
          <ul>
            <li class="userPortrait">
              <div>
                <img :src="userInfo.avatarUrl" alt width="100%" height="100%" />
              </div>
            </li>
            <li class="userName">
              <p>{{userInfo.nickname}}</p>
              <div>LV2</div>
            </li>
            <li class="acitive-btn">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </li>
          </ul>
        </div>
        <div class="btmInfo">
          <ul>
            <li class="userSocialInfo">
              <p class="SocialInfo-num">{{userInfo.djStatus}}</p>
              <p class="SocialInfo-name">动态</p>
            </li>
            <li>
              <p class="SocialInfo-num">{{userInfo.follows}}</p>
              <p class="SocialInfo-name">关注</p>
            </li>
            <li>
              <p class="SocialInfo-num">{{userInfo.followeds}}</p>
              <p class="SocialInfo-name">粉丝</p>
            </li>
            <li>
              <p class="SocialInfo-num"></p>
              <p class="SocialInfo-name">编辑资料</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="signInArea">
      <form action>
        <div class="inputBar">
          <el-input ref="userPhone" v-model="userPhone" size="mini" placeholder="请输入手机号"></el-input>
          <el-input
            ref="userPassword"
            v-model="userPassword"
            size="mini"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </div>
        <div class="confirm-btn">
          <el-button @click.native="signIn" type="primary" size="small" plain>登录</el-button>
          <el-button type="success" size="small" plain>联系客服</el-button>
        </div>
      </form>
    </div>
    <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from "../components/TabBar";
import headers from "../components/Headers";
import search from "../components/Search";
export default {
  name: "account",
  components: {
    tabBar,
    headers,
    search
  },
  data() {
    return {
      userPhone: "15527595380",
      userPassword: "qq123456",
      userInfo: {}
    };
  },
  methods: {
    signIn() {
      var submitUrl = "http://localhost:3000/login/cellphone?phone=xxx&password=yyy"
        .replace("xxx", this.userPhone)
        .replace("yyy", this.userPassword);
      this.userPassword = "";
      this.axios.get(submitUrl).then(res => {
        if (res.data.code === 200) {
          this.userInfo = res.data.profile;
          this.$store.commit({
            type: "ChUserInfo",
            userInfo: res.data.profile
          });
          this.$store.commit({
            type: "ChloginStatus",
            islogined: true
          });
        } else {
          alert("登录失败");
        }
      });
    }
  }
};
</script>

<style >
#account {
  padding: 6px;
}
.userInfo {
  width: 100%;
  height: 100px;
  background-color: rgba(212, 211, 211, 0.658);
}
.topInfo {
  width: 100%;
  height: 60px;
}
.topInfo ul {
  display: flex;
  width: 100%;
  height: 60px;
}
.userPortrait {
  flex: 3;
}
.userPortrait div {
  width: 45px;
  height: 45px;
  margin: 0 auto;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
  top: 50%; /*偏移*/
  transform: translateY(-50%);
}
.userName {
  flex: 8;
}
.userName p {
  margin-top: 10px;
  font-size: 12px;
}
.userName div {
  margin-top: 5px;
}
.acitive-btn {
  flex: 2;
}
.acitive-btn button {
  position: relative;
  top: 50%; /*偏移*/
  transform: translateY(-50%);
}
.btmInfo {
  width: 100%;
  height: 40px;
  margin-top: 5px;
}
.btmInfo ul {
  display: flex;
  width: 100%;
  height: 40px;
  text-align: center;
}

.btmInfo ul li {
  flex: 1;
  height: 30px;
  border-right: 1px solid grey;
}
.btmInfo li:last-child {
  border-right: none;
}
.SocialInfo-num {
  height: 20px;
  line-height: 20px;
  font-size: 15px;
}
.SocialInfo-name {
  height: 10px;
  font-size: 9px;
  line-height: 8px;
}
.signInArea {
  width: 100%;
  height: 120px;
  margin-top: 20px;
}
.inputBar {
  margin: 0 auto;
  width: 200px;
}
.inputBar input {
  margin-top: 10px;
  height: 20px;
}
.confirm-btn {
  width: 200px;
  margin: 20px auto;
}
.confirm-btn button:last-child {
  float: right;
}
</style>