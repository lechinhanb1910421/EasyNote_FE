<script src="../controllers/signup.controller.js"></script>

<template>
  <div class="col-12 mt-4">
    <h5>Sign up for EverNote account</h5>
  </div>
  <form ref="signUpForm" id="login_form" name="formName" @submit.prevent="submit">
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
  <div class="modal fade" id="signUpModal" ref="signUpModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title" id="exampleModalLabel">Congratulations!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>
            Welcome on board <span class="modal_userName"> {{ userName }}</span>
          </p>
          <p>Your EverNote account was successfully created.</p>
        </div>
        <div class="modal-footer m-auto">
          <button type="button" class="btn btn-success" @click="logInAndGoHome">Go to Dash Board now</button>
        </div>
      </div>
    </div>
  </div>
  <!-- <CustomModal :name="userName" @go-home="logInAndGoHome"></CustomModal> -->
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
.modal-title {
  font-size: 24px;
  font-weight: bold;
}
.modal-body {
  padding-left: 30px;
  text-align: left;
  font-size: 18px;
  font-weight: 400;
}
.modal-body p {
  margin-bottom: 0.5rem;
}
.modal_userName {
  font-size: 20px;
  font-weight: bold;
}
</style>
