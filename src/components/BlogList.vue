<template>
  <div>
    <div>
      <el-form :inline="true" :model="searchBlog" class="blogSearch">
        <el-form-item label="内容">
          <el-input v-model="searchBlog.title" placeholder="请输入查询内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="esSearch(1, searchBlog.title)">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="blogList">
        <el-card v-for="blog in blogs" :key="blog" class="blogListCard">
          <div @click="toBlogDetail(blog.id)">
            <div class="blogTitle">{{ blog.title }}</div>
            <div class="updateTime">{{blog.created}}</div>
            <div class="briefContent">{{ blog.description }}</div>
          </div>
        </el-card>
      </div>


    </div>
    <el-pagination
        class="pageStyle"
        background
        style=""
        layout="prev, pager, next"
        :current-page=pageNo
        :page-size=pageSize
        @current-change=page
        :total="total">
    </el-pagination>
  </div>
</template>
<script>
import "../viewStyle/blogList.scss";

export default {
  name: "Blogs",
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
      this.$axios.get('/blogs?pageNo=' + pageNo + '&pageSize=' + this.pageSize).then((res) => {
        console.log(res.data.data)
        _this.blogs = res.data.data.list
        _this.total = res.data.data.total
      })
    },

    toBlogDetail(blogId) {
      this.$router.push({name: 'BlogDetail', params: {blogId: blogId}})
    },

    esSearch(pageNo, title) {
      const _this = this
      this.$axios.get('/es/search?title=' + title + '&pageNum=' + pageNo + '&pageSize=' + 999).then((res) => {
        console.log(res.data.data)
        _this.blogs = res.data.data.list
        _this.total = res.data.data.total
        _this.pageSize = 999
      })
    }
  },
  mounted() {
    this.page(1, 5);
  }
}
</script>
