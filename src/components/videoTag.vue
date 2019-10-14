<template>
  <audio ref="music">
    <source :src="msPlayUrl" />
  </audio>
</template>

<script>
export default {
  name: "videoTag",
  data() {
    return {
      msPlayUrl: " ",
      msDuration: 0,
      currentPlaytime: -1
    };
  },
  methods: {
    chPlayStatus(playStatus) {
      if (playStatus.isPlay == false) {
        this.$refs.music.pause();
      } else {
        this.$refs.music.play();
        this.currentPlaytime = this.$refs.music.currentTime;
      }
    }
  },
  watch: {
    "$store.state.msPlayInfo.currentPlaytime"(value) {
      setTimeout(() => {
        if(this.$store.state.msPlayInfo.isJump == true){
             this.$refs.music.currentTime = this.$store.state.msPlayInfo.currentPlaytime * this.msDuration /100;
        }
   
        this.$store.commit({
          type: "ChmsPlayInfo",
          msPlayInfo: {
            currentPlaytime:
              (this.$refs.music.currentTime / this.msDuration) * 100,
               isJump: false
          }
        });
      }, 1000);
    },
    "$store.state.msPlayUrl"(value) {
      this.msPlayUrl = value;
      this.$refs.music.load();
      this.$refs.music.play();

      setTimeout(() => {
        this.$store.commit({
          type: "ChmsPlayStatus",
          PlayStatus: {
            isPlay: true
          }
        });
        this.$store.commit({
          type: "ChmsPlayInfo",
          msPlayInfo: {
            currentPlaytime: 0
          }
        });
        this.msDuration = this.$refs.music.duration;
      }, 500);
    },

    "$store.state.playStatus"(playStatus) {
      this.chPlayStatus(playStatus);
    }
  }
};
</script>

<style>
</style>