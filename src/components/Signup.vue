<script src="../controllers/signup.controller.js"></script>
<template>
  <div class="container-fluid">
    <div id="login_main" class="container">
      <div class="row text-center">
        <div class="col-md-2 col-xl-3"></div>
        <div class="col-12 col-md-8 col-xl-6">
          <h2 id="login_title">EverNote</h2>
        </div>
      </div>

      <div class="row">
        <div class="col-md-2 col-xl-3 col-12"></div>
        <div class="col-12 col-md-8 col-xl-6">
          <div id="login_container" class="bg-light row text-center">
            <div class="col-12">
              <h5>Sign up for your account</h5>
            </div>
            <form ref="form" id="login_form" name="formName" @submit.prevent="submit">
              <div class="col-12">
                <div class="form-floating mb-3 login_inputs">
                  <input type="text" name="firstName" v-model="firstName" class="form-control" placeholder="First Name" />
                  <label for="firstName">First Name</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-floating mb-3 login_inputs">
                  <input type="text" name="lastName" v-model="lastName" class="form-control" placeholder="Last Name" />
                  <label for="lastName">Last Name</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-floating mb-3 login_inputs">
                  <input type="email" name="email" v-model="email" class="form-control" placeholder="name@example.com" />
                  <label for="email">Email address</label>
                </div>
              </div>
              <div class="col-12" id="pwd_container">
                <div class="form-floating login_inputs">
                  <input type="password" v-model="password" class="form-control" placeholder="Password" />
                  <label for="password">Password</label>
                </div>
              </div>
              <div id="error_box" class="mt-2"></div>
              <div class="col-12">
                <button type="submit" id="continue" form="login_form" class="btn">Sign up</button>
                <hr class="mt-4 m-auto" style="width: 90%" />
              </div>
            </form>
            <div class="col-12 mt-3 mb-4">
              <router-link to="/login">Already have an account? Log in</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-fluid {
  background-color: #a0e7e5;
}
#login_main {
  height: 100vh;
}
#login_title {
  margin-top: 20px;
  font-size: 60px;
  font-weight: 1000;
  font-family: cursive;
}
#login_container {
  width: 80%;
  margin-left: 10%;
  margin-top: 10px;
  height: fit-content;
  border-radius: 1.7rem;
  padding-top: 40px;
  box-shadow: rgb(0 0 0 / 20%) 4px 4px 7px 0;
}
#login_form {
  margin-top: 35px;
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
</style>
