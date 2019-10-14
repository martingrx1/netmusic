 <template>
  <div class="warpper" ref="warpper">
    <slot></slot>
  </div>
</template>
 
 <script>
import BScroll from "better-scroll";
export default {
  name: "scroller",
  data() {
    return {};
  },
  mounted() {
    var scroll = new BScroll(this.$refs.warpper, {
      tap: true,
      probeType: 1
    });
  }
  //  better-srcoll工作原理  要生效必须 content的height大于warpper的height高度
  //   <warpper>
  //      <content>
  //      ......内容
  //      </content>
  //   </warpper>
};
</script>
 
 <style scoped>
.warpper {
  height: 82%;
}
</style>
 