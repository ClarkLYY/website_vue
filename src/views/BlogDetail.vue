<template>
  <div class="m-container">
    <menu-list></menu-list>
    <div class="blogDetail">
      <h2>{{ blog.title }}</h2>

      <el-row v-if="ownBlog">
        <el-button type="primary" icon="el-icon-edit" circle @click="toBlogEdit(blog.id)"></el-button>
        <el-button  type="danger" icon="el-icon-delete" circle @click="deleteBlog(blog.id)"></el-button>
      </el-row>

      <el-divider></el-divider>

      <link href="https://cdn.bootcdn.net/ajax/libs/highlight.js/11.0.0-alpha1/styles/stackoverflow-dark.min.css" rel="stylesheet">
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>


<script>
  import 'github-markdown-css/github-markdown.css' // 然后添加样式markdown-body
  import menuList from "../components/Menu";
  require("../viewStyle/blogDetail.scss")
  export default {
    name: "BlogDetail",
    components: {
      menuList
    },
    data() {
      return {
        blog: {
          id:null,
          userId: null,
          title: "",
          description: "",
          content: ""
        },
        ownBlog: false
      }
    },
    methods: {
      getBlog() {
        const blogId = this.$route.params.blogId
        const _this = this
        this.$axios.get('/blog/' + blogId).then((res) => {
          console.log(res)
          console.log(res.data.data)
          _this.blog = res.data.data
          const MarkdownIt = require('markdown-it')
          const hljs = require('highlight.js')
          const md = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true,
            highlight: function (str, lang) {
              // 此处判断是否有添加代码语言
              if (lang && hljs.getLanguage(lang)) {
                try {
                  // 得到经过highlight.js之后的html代码
                  const preCode = hljs.highlight(lang, str, true).value
                  return '<pre style="background: rgba(29,27,27,0.84)" class="hljs"><code>' +
                      preCode +
                      '</code></pre>'
                } catch (__) {}
              }
              // 未添加代码语言，此处与上面同理
              const preCode = md.utils.escapeHtml(str)
              return '<pre style="background: rgba(29,27,27,0.84)" class="hljs"><code>' +
                  preCode +
                  '</code></pre>'
            }
          })
          var result = md.render(_this.blog.content);
          _this.blog.content = result
          // 判断是否是自己的文章，能否编辑
          _this.ownBlog =  (_this.blog.userId === _this.$store.getters.getUser.id)
        });
      },

      deleteBlog(id){
        this.$confirm('请确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(()=>{
              this.$axios.post('/blog/delete/' + id)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$router.push("/blog")
            })
      },

      toBlogEdit(id){
        this.$router.push({name: 'BlogEdit', params: {blogId: id}})
      }
    },

    created() {
      this.getBlog()
    }
  }
</script>
