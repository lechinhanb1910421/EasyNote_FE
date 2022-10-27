<script src="../controllers/login.controller.js"></script>
<template>
  <div class="col-12 mt-4">
    <h5>Log in to EverNote</h5>
  </div>
  <form id="login_form" name="formName" @submit.prevent="submit">
    <div class="col-12">
      <div class="form-floating mb-3 login_inputs">
        <input type="email" name="email" v-model="email" @click="hideErrorBox" class="form-control" placeholder="name@example.com" />
        <label for="email">Email address</label>
      </div>
    </div>
    <div class="col-12 mb-3" id="pwd_container">
      <div class="form-floating login_inputs">
        <input type="password" v-model="password" @click="hideErrorBox" class="form-control" placeholder="Password" />
        <label for="password">Password</label>
      </div>
    </div>

    <div id="error_box" style="display: none"></div>

    <div class="col-12">
      <button type="submit" id="continue" form="login_form" class="btn">Log In</button>
      <hr class="mt-4 m-auto" style="width: 90%" />
    </div>
  </form>

  <div class="col-12 my-2">
    <span id="or">Or</span>
  </div>
  <div class="col-12">
    <button type="butto" id="gg_login" class="btn otherLogin" @click="googleClick"><span id="google_icon"></span>Continue with Google</button>
    <hr class="mt-4 m-auto" style="width: 90%" />
  </div>
  <div class="col-12 mt-3 mb-4">
    <router-link to="/forgot">Can not log in ?</router-link>
  </div>
</template>

<style scoped>
#login_form {
  margin-top: 15px;
  height: fit-content;
}
#login_form .login_inputs {
  width: 80%;
  margin: auto;
}

#continue,
#gg_login {
  margin-top: 15px;
  width: 80%;
  height: 45px;
  font-size: 17px;
  font-weight: 600;
  background-color: #b4f8c8;
  border-radius: 0.4rem;
  box-shadow: rgb(0 0 0 / 20%) 2px 2px 5px 0;
}
#gg_login {
  background-color: white;
}
#gg_login:hover {
  box-shadow: #9acca9 0px 0px 0px 4px;
}
#continue:hover {
  box-shadow: #9acca9 0px 0px 0px 4px;
  background-color: #b4f8c8;
}
#google_icon {
  display: inline-block;
  width: 25px;
  height: 25px;
  vertical-align: middle;
  margin-right: 15px;
  background: url('src/assets/icons/google_icon.png');
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
