<template>
  <div>
    <el-container>
      <el-header>
        <router-link to="/blogs">
        <img src="http://localhost:7777/Lark20210127142611.png" style="height: 60%; margin-top: 10px;">
        </router-link>
      </el-header>
      <el-main>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户邮箱" prop="userEmail" label-width="100px">
            <el-input type="text" maxlength="50" v-model="ruleForm.userEmail "></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.userPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="primary" @click="resetForm('ruleForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          userPassword: '',
          userEmail: 'leiyuyang@bytedance.com'
        },
        rules: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          userEmail: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交逻辑
            this.$axios.post('/user/login', this.ruleForm).then((res)=>{
              const token = res.headers['authorization']
              _this.$store.commit('SET_TOKEN', token)
              _this.$store.commit('SET_USERINFO', res.data.data)
              _this.$router.push("/blog")
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
    
  }
</script>
