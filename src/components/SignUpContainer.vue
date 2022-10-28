<script src="../controllers/signup.controller.js"></script>

<template>
  <div class="col-12 mt-4">
    <h5>Sign up for EverNote account</h5>
  </div>
  <form ref="form" id="login_form" name="formName" @submit.prevent="submit">
    <div class="col-12 login_inputs">
      <div class="row mb-3">
        <div class="col-6" style="padding-right: 5px">
          <div class="form-floating">
            <input type="text" name="firstName" v-model.lazy="firstName" id="fname" @click="hideErr" class="form-control" placeholder="First Name" />
            <label for="firstName">First Name</label>
          </div>
        </div>
        <div class="col-6" style="padding-left: 5px">
          <div class="form-floating">
            <input type="text" name="lastName" v-model.lazy="lastName" id="lname" @click="hideErr" class="form-control" placeholder="Last Name" />
            <label for="lastName">Last Name</label>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="form-floating mb-3 login_inputs">
        <input type="email" name="email" v-model.lazy="email" @click="hideErr" id="email" class="form-control" placeholder="name@example.com" />
        <label for="email">Email address</label>
      </div>
    </div>
    <div class="col-12" id="pwd_container">
      <div class="form-floating mb-3 login_inputs">
        <input type="password" v-model.lazy="password" @click="hideErr" id="pwd" class="form-control" placeholder="Password" />
        <label for="password">Password</label>
      </div>
    </div>
    <div class="col-12 mb-3" id="">
      <div class="form-floating login_inputs">
        <input type="password" v-model.lazy="confirmPassword" @click="hideErr" id="cpwd" class="form-control" placeholder="Confirm Password" />
        <label for="password">Confirm Password</label>
      </div>
    </div>
    <div id="error_box" style="display: none"></div>
    <div class="col-12 mb-5">
      <button type="submit" id="continue" form="login_form" class="btn">Sign Up</button>
    </div>
  </form>
  <CustomModal :name="userName" @go-home="logInAndGoHome"></CustomModal>
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
  margin-right: 5px;
  background: url('src/assets/icons/google_icon.png');
  background-size: contain;
  background-repeat: no-repeat;
}
.outline-danger {
  outline: solid;
  outline-width: 4px;
  outline-color: rgba(255, 0, 0, 0.4);
}
</style>
