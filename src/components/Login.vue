<script>
export default {
  props: {},
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit() {
      
    }
  }
}
</script>
<template>
  <div style="position: relative; background-color: #a0e7e5">
    <h2 id="login_title">EverNote</h2>
    <div class="container" id="login_main">
      <div id="login_container" class="bg-light row text-center">
        <div class="col-12">
          <h5>Log in to EverNote</h5>
        </div>
        <form ref="form" id="login_form" name="formName" @submit.prevent="submit">
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
          <div class="col-12">
            <button type="submit" id="continue" form="login_form" class="btn">Continue</button>
            <hr class="mt-4 m-auto" style="width: 90%" />
          </div>
        </form>

        <div class="col-12 my-2">
          <span id="or">Or</span>
        </div>
        <div class="col-12">
          <button type="butto" id="gg_login" class="btn otherLogin">
            <span id="google_icon"></span>Continue with Google
          </button>
          <hr class="mt-4 m-auto" style="width: 90%" />
        </div>
        <div class="col-12 mt-3">
          <router-link to="/forgot">Can not log in ?</router-link>
          <i class="fa-solid fa-circle mx-3" style="top: -2px; color: hsla(160, 100%, 37%, 1); font-size: 8px"></i>
          <router-link to="/signup">Sign up for free </router-link>
        </div>
        <!-- <button type="button" class="btn">Continue</button> -->
      </div>
    </div>
  </div>
</template>

<style>
#login_main {
  height: 100vh;
}
#login_title {
  position: absolute;
  left: 50%;
  margin-top: 20px;
  font-size: 60px;
  font-weight: 1000;
  font-family: cursive;
  transform: translateX(-50%);
}
#login_container {
  display: block;
  position: absolute;
  top: 110px;
  left: 50%;
  transform: translateX(-50%);
  width: 35%;
  height: 520px;
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

/* #login_container > h5 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  opacity: 90%;
} */
/* #login_container > .otherLogin {
  background-color: white;
} */
/* #login_container > .otherLogin:hover {
  background-color: white;
  box-shadow: rgba(20, 164, 183, 0.2) 5px 5px 5px 0;
} */
/* #continue {
  top: 34%;
} */
/* #gg_login {
  top: 57%;
} */

/* #login_container > #or {
  position: absolute;
  top: 49%;
  left: 50%;
  height: 45px;
  border-radius: 0.4rem;
  transform: translateX(-50%);
} */
/* #login_container > hr {
  top: 39%;
  width: 90%;
  left: 5%;
} */

/* #login_form {
  width: 80%;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
} */
</style>
