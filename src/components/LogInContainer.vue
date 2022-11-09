<script src="../controllers/login.controller.js"></script>
<template>
  <div class="col-12 mt-4">
    <h5>Log in to EasyNote</h5>
  </div>
  <form id="login_form" name="formName" @submit.prevent="submit">
    <div class="col-12">
      <div class="form-floating mb-3 login_inputs">
        <input
          type="email"
          name="email"
          v-model="email"
          @click="hideErrorBox"
          class="form-control"
          :disabled="isValidEmail"
          placeholder="name@example.com" />
        <label for="email">Email address</label>
      </div>
    </div>
    <div v-if="isValidEmail" class="col-12 mb-3" id="pwd_container">
      <div class="form-floating login_inputs">
        <input type="password" v-model="password" @click="hideErrorBox" class="form-control" ref="pwd_inp" placeholder="Password" />
        <label for="password">Password</label>
      </div>
    </div>

    <div id="error_box" class="mb-3" style="display: none"></div>

    <div class="col-12" v-if="!isValidEmail">
      <button type="button" id="continue" class="btn btn_login" @click="continueLogin" ref="continue">Continue</button>
      <hr class="mt-4 m-auto" style="width: 90%" />
    </div>
    <div class="col-12" v-if="isValidEmail">
      <button type="submit" id="login" form="login_form" class="btn btn_login">Log In</button>
      <button @click="changeEmail" class="changeAccount">I want to use another account</button>
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
    <router-link to="/login">Can not log in ?</router-link>
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

.btn_login,
#gg_login {
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
.changeAccount {
  width: 300px;
  border-radius: 0.5rem;
  background: none;
  border: none;
  margin-top: 10px;
  padding: 5px;
  font-size: 17px;
  font-weight: 500;
}
.changeAccount:hover {
  background-color: rgb(230, 230, 230);
  color: green;
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
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
