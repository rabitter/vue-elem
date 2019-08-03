<template>  
  <div class='login'>
    <el-form class='container' ref="form" :model="form" :rules='rules'>
      <el-form-item>
        <div class='avatar'>
          <img src="../assets/img/avatar.jpg" alt="头像">
        </div>
      </el-form-item>
      <el-form-item prop='username'>
        <el-input v-model="form.username" placeholder="账户" prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item  prop='password'>
        <el-input type='password' v-model="form.password" placeholder="密码" prefix-icon="myicon myicon-key"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class='login-btn' type="primary" @click='loginSubmit("form")'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* 图片预加载 */
var headSculpture = new Image()
headSculpture.src = '../assets/img/avatar.jpg'
headSculpture.addEventListener('load',function(){
  // var avatar = querySelector('.avatar').appendChild(headSculpture)
  console.log('加载完成')
})

// 导入登录请求接口
import {checkUser} from '@/api'

export default {
  data(){
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /* 登录请求验证 */
    loginSubmit(formName){
      // 进行表单验证、验证通过才发送登录请求
      this.$refs[formName].validate(valid => {
        if(valid){
          // console.log('校验通过');
          checkUser(this.form).then(res => {
            console.log(res)
           
           // 1.接收到数据判断请求是否正确响应.
            if(res.meta.status == 200){
              // 2.若正确，将服务端发送过来的token保存到localStorage中
              localStorage.setItem('mytoken',res.data.token)
              
              // 3.将username保存到vuex中的state中
              this.$store.commit('setUserName',res.data.username)

              // 4.并且跳转到登录页
              this.$router.push({name: 'Home'})
             
             // 若接收到数据判断请求是否正确响应，若不正确，提示错误信息
            }else {
              this.$message({
                type: 'error',
                message: res.meta.msg
              })
            }
          })
        }else {
          console.log('校验不通过');
          return false;
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .el-input--prefix {
      .el-input__inner {
        padding-left: 25px;
      }
      .el-input__prefix {
        vertical-align: baseline;
        line-height: 42px;
      }
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
