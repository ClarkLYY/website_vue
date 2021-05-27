<template>
  <div>
    <el-card class="personalInfoCard">
      <el-avatar shape="circle" :size="100" :src="user.avatar"></el-avatar>
      <div class="name"><p>{{user.userNickName}}</p></div>
      <div class="label">
        <el-link class="home" href="/blog">主页</el-link>
        <span>
          <el-link class="push" type="success" href="/blog/add" :disabled="!hasLogin">发表</el-link>
        </span>

        <span v-show="!hasLogin">
          <el-link class="loginOrOut" type="primary" href="/login">登录</el-link>
        </span>
        <span v-show="hasLogin">
          <el-link class="loginOrOut" type="danger" @click="logout">退出</el-link>
        </span>
      </div>

      <div class="logoGroup">
        <Icon type="logo-github" size="18" />
        <Icon type="md-aperture" size="18" />
        <Icon type="logo-facebook" size="18" />
        <Icon type="md-globe" size="18" />
      </div>
    </el-card>
  </div>
</template>
<script>
  import "../viewStyle/personalInfo.scss"
  export default {
    name: "header",
    data() {
      return {
        hasLogin: false,
        user: {
          userNickName: '请先登录',
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
      if(this.$store.getters.getUser.userNickName) {
        this.user.userEmail = this.$store.getters.getUser.userEmail
        this.user.userNickName = this.$store.getters.getUser.userNickName
        this.user.avatar = 'http://localhost:7777/cheems.png'
        this.hasLogin = true
      }
    }
  }
</script>
