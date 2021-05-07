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
          <el-form-item label="用户邮箱" prop="userEmail">
            <el-input type="text" maxlength="50" v-model="ruleForm.userEmail"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
    data:{
        
    }
}
</script>