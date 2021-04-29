<template>
  <div class="m-container">
    <Header></Header>
    <div class="m-content">
      <el-form ref="editForm" status-icon :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="editForm.description"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mavon-editor ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="editForm.content"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">立即创建</el-button>
          <el-button @click="goback()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import Header from "@/components/Header";
  export default {
    name: "BlogEdit",
    components: {Header},
    data() {
      return {
        editForm: {
          id: null,
          title: '',
          description: '',
          content: ''
        },
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入摘要', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      const blogId = this.$route.params.blogId
      const _this = this
      if(blogId) {
        this.$axios.get('/blog/' + blogId).then((res) => {
          const blog = res.data.data
          _this.editForm.id = blog.id
          _this.editForm.title = blog.title
          _this.editForm.description = blog.description
          _this.editForm.content = blog.content
        });
      }
    },
    methods: {
      submitForm() {
        const _this = this
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$axios.post('/blog/edit', this.editForm, {
              headers: {
                "Authorization": localStorage.getItem("token")
              }
            }).then((res) => {
              _this.$alert('操作成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push("/blogs")
                }
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },

      goback(){
        const _this = this
        _this.$router.push("/blog/"+this.editForm.id)
      },

      $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           const _this = this
           var formdata = new FormData();
           formdata.append('fileName', $file);
           this.$axios.post('/img/upload' ,formdata).then((res) => {
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */
              console.log(res)
              this.$refs.md.$img2Url(pos, res.data.data);
              console.log(res)
           }).catch(() => {})
      },

      $imgDel(pos) {
        delete this.img_file[pos];
      }
    }
  }
</script>
