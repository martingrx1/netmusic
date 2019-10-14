 <template>
  <div id="tabBar">
    <ul>
      <router-link tag="li" to="/find">
        <div class="switch-icons">
          <i class="el-icon-s-opportunity"></i>
        </div>
        <div class="switch-word">发现</div>
      </router-link>
      <router-link tag="li" to="/video">
        <div class="switch-icons">
          <i class="el-icon-video-camera-solid"></i>
        </div>
        <div class="switch-word">视频</div>
      </router-link>
      <router-link tag="li" to="/mine">
        <div class="switch-icons">
          <i class="el-icon-headset"></i>
        </div>
        <div class="switch-word">我的</div>
      </router-link>
      <router-link tag="li" to="/account">
        <div class="switch-icons">
          <i class="el-icon-s-custom"></i>
        </div>
        <div class="switch-word">账号</div>
      </router-link>
    </ul>
  </div>
</template>
 
 <script>
export default {
  name: "tabBar"
};
</script>
 
 <style>
#tabBar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  padding-bottom: 4px;
  background-color: white;
}
#tabBar ul {
  display: flex;
  height: 25px;
}

#tabBar ul li {
  flex: 1;
  height: 25px;
  text-align: center;
}

#tabBar ul li.router-link-active{color: #f03d37;}
.switch-icons {
  width: 100%;
  height: 17px;
  font-size: 20px;
  line-height: 24px;
}
.switch-word {
  height: 8px;
  margin-top: 3px;
  font-size: 8px;
}
</style>