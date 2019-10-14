 <template>
  <div id="headers">
    <ul>
      <li class="top-1">
        <div class="recommd-btn">
          <slot name="top1"></slot>
        </div>
      </li>
      <li class="top-2">
          <slot name="top2"></slot>
      </li>
      <li class="top-3">
        <router-link tag="div" to="/player" class="playing-btn">
          <i class="el-icon-thumb"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>
 
 <script>
export default {
  name: "headers"
};
</script>
 
 <style >
#headers {
  width: 100%;
  height: 30px;
  font-weight: bold;
}
#headers ul {
  display: flex;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.top-1 {
  flex: 1;
}
.top-2 {
  flex: 8;
  
}
.top-3 {
  flex: 1;
}

.recommd-btn {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
}
.playing-btn {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
}
</style>