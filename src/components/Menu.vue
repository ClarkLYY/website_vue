<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2" v-on:mousemove="" >聊天室</el-menu-item>
      <el-menu-item index="3"><a href="https://github.com/ClarkLYY" target="_blank">github</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
require("../viewStyle/menu.scss");
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },

  methods: {
    handleSelect(activeIndex) {
      if(activeIndex==1){
        this.$router.push("/blog")
      }
    }
  }
};
</script>

