<template>
  <div id="recomBtn">
    <ul>
      <li v-for="item in btnNum">
        <div class="bgc-circular">
          <slot :name="item"></slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "recomBtn",
  props: {
    btnNum: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      btnNum: ""
    };
  }
};
</script>

<style>
#recomBtn {
  width: 100%;
  height: 40px;
}
#recomBtn ul {
  display: flex;
  height: 40px;
  text-align: center;
}
#recomBtn ul li {
  position: relative;
  flex: 1;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  color: whitesmoke;
}
.bgc-circular {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: red;
  border-radius: 50%;
}
</style>