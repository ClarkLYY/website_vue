<template>
  <div class="m-container">
    <Header></Header>
    <div class="block">
      <el-form :inline="true" :model="searchBlog" class="demo-form-inline">
        <el-form-item label="内容">
          <el-input v-model="searchBlog.title" placeholder="请输入查询内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(1, searchBlog.title)">查询</el-button>
        </el-form-item>
      </el-form>

      <el-timeline>
        <el-timeline-item v-bind:timestamp="blog.created" placement="top" v-for="blog in blogs " :key="blog">
          <el-card>
            <h4><router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">{{blog.title}}</router-link></h4>
            <p>{{blog.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
     
    </div>
    <el-pagination class="mpage"
      background
      layout="prev, pager, next"
      :current-page=pageNo
      :page-size=pageSize
      @current-change=page
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import Header from "@/components/Header";
  export default {
    name: "Blogs",
    components: {Header},
    data() {
      return {
        blogs: {},
        pageNo: 1,
        total: 0,
        pageSize: 5,
        searchBlog: {
          title: "",
        }

      }
    },
    methods: {
      page(pageNo, pageSize) {
        const _this = this
        this.$axios.get('/blogs?pageNo=' + pageNo + '&pageSize=' +this.pageSize).then((res) => {
          console.log(res.data.data)
          _this.blogs = res.data.data.list
        //   _this.pageNo = res.data.data.current
          _this.total = res.data.data.total
        //   _this.pageSize = res.data.data.size
        })
      },

      onSubmit(pageNo, title){
        const _this = this
        this.$axios.get('/es/search?title='+ title + '&pageNum=' + pageNo + '&pageSize=' + 999 ).then((res) => {
          console.log(res.data.data.content)
          _this.blogs = res.data.data.content
        //   _this.pageNo = res.data.data.current
          _this.total = res.data.data.totalElements
          _this.pageSize = 999
        })
      }
    },
    mounted () {
      this.page(1,5);
    }
  }
</script>
