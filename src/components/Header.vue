<template>
  <div class="m-content">
    <h3>blog website test</h3>
    <div class="block">
      <el-avatar :size="80" :src="user.avatar"></el-avatar>
      <div>{{ user.userEmail }}</div>
    </div>
    <div class="maction">
      <el-link href="/blogs">主页</el-link>
      <el-divider direction="vertical"></el-divider>
      <span>
          <el-link type="success" href="/blog/add" :disabled="!hasLogin">发表文章</el-link>
        </span>
      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin">
          <el-link type="primary" href="/login">登陆</el-link>
        </span>
      <span v-show="hasLogin">
          <el-link type="danger" @click="logout">退出</el-link>
        </span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Header",
    data() {
      return {
        hasLogin: false,
        user: {
          userEmail: '请先登录',
          avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        },
        blogs: {},
        currentPage: 1,
        total: 0
      }
    },
    methods: {
      logout() {
        const _this = this
        this.$axios.get('/user/logout', {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then((res) => {
          _this.$store.commit('REMOVE_INFO')
          _this.$router.push('/login')
        });
      }
    },
    created() {
      if(this.$store.getters.getUser.userEmail) {
        this.user.userEmail = this.$store.getters.getUser.userEmail
        this.user.avatar = 'http://localhost:7777/static/cheems.png'
        this.hasLogin = true
      }
    }
  }
</script>
