<template>
  <div class=" d justify-content-center container col-lg-6">
    <div class="mt-5" ref="pageContainer">
      <div
        v-if="isMobile"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        style="position: absolute; bottom: 0"
      ></div>
      <div class="card-body pt-5 text-center mb-5">
        <div class="text-primary pb-3">
          <img src="../assets/images/logo%20log%20in.png" alt=""  style="height: 250px;width: 150px"/>
        </div>
      </div>
      <div class="container mt-5">
        <div class="mt-5">
          <div class="col col-12 mt-5">
            <div>

            </div>

            <div class="mt-5">
              <div class="mb-3 col-12 px-2">
                <div class="inputWithIcon" style="height: 50px">
                  <input
                    type="text"
                    placeholder="نام کاربری  "
                    class="text-center"
                    id="username"
                    v-model="form.username"
                    inputmode="numeric"
                    @input="form.username = convertPersianNumbersToEnglish(form.username)"
                  />

                  <i class="bi bi-person-fill"></i>
                </div>
              </div>

              <div class="mb-1 col-12 px-2">
                <div class="inputWithIcon" style="height: 50px">
                  <span class="bi bi-eye-fill bl" @click="togglePasswordVisibility" v-if="showPassword"></span>
                  <span class="bi bi-eye-slash bl" v-else @click="togglePasswordVisibility"></span>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="گذرواژه"
                    class="text-center"
                    v-model="form.password"
                    :class="{ focus: isPasswordFocused, error1: error && form.password.trim() === '' }"
                    @focusin="onPasswordFocusIn"
                    @focusout="onPasswordFocusOut"
                    inputmode="numeric"
                    @input="form.password = convertPersianNumbersToEnglish(form.password)"

                  />
                  <i class="bi bi-lock"></i>
                </div>
              </div>

              <p v-if="error && form.password.trim() === '' " class="error-message error-message text-end  pt-3 px-5 ">
                گذرواژه اجباری است
              </p>
              <div class="overlay" v-if="isLoading">
                <div class="spinner-container">
                  <div class="spinner-border " role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>

              <div class="d-grid col-11 mx-auto pt-3 mt-5" @click="login">
                <button class="btn btn-primary rounded-pill p-3">ورود</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <p v-if="showError" class=" col-12 LogInError text-center pt-4 error-message text-end  px-5  ">
    {{ errorMessage }}
  </p>
  <p v-if="show"  class="col-12 LogInError text-center pt-4 error-message text-end  px-5 ">
    {{ Message }}
  </p>
</template>
<script setup lang="ts">
import axios from "axios";
const router = useRouter();
import { onMounted, ref, watch } from "vue";
import {BaseUrl} from "~/store/BaseApi"



const isMobile = ref(false);

definePageMeta({
  name: "login",
  layout: " ",
});


const isLoading = ref(false);
const error = ref(false);
const errorMessage = ref("");
const Message = ref("");
const Url=BaseUrl
const form = ref({
  password: "",
  username: "",
});



const showError = ref(false);
const show = ref(false);

const errorTimeout =5000;
const userAgent = window.navigator.userAgent;
if (/Mobi/i.test(userAgent)) {
  isMobile.value = true;
}
const onFocusIn = () => {
  window.scroll(0, 200);
};

const onFocusOut = () => {
  window.scroll(0, 0);
};

const onPasswordFocusIn = () => {
  isPasswordFocused = true;
};

const onPasswordFocusOut = () => {
  isPasswordFocused = false;
};



const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const login = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    if (

      form.value.password.trim() === ""
    ) {
      error.value = true;
      isLoading.value = false;
      return;
    }

    const response = await axios.post(
    `${Url + "/api/auth/login"}`,
      {
        userName: form.value.username,
        password: form.value.password,
      }
    );

    const token = response.data.result.token;

    if (!token) {
      errorMessage.value = response.data.serverErrors[0].hint;
      showError.value = true;
      setTimeout(() => {
        showError.value = false;
      }, errorTimeout);
    } else{
      const utcDateTime = new Date();
      const iranDateTimeFormat = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Tehran',
        hour12: true,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });
      const iranDateTimeString = iranDateTimeFormat.format(utcDateTime);
      localStorage.setItem("ArrivalTime",iranDateTimeString.substring(0,9))
      localStorage.setItem("SupervisoryInfo", JSON.stringify(response.data.result))
      router.push("./List");
      const res= axios.get(
        `${Url + "api/survey/GetSurveyBaseInfo"}`,
      ).then((res)=>{
        localStorage.setItem("SurveyBaseInfo", JSON.stringify(res.data.result))
      })
    }




  } catch (err) {
    show.value = true;
    Message.value = "خطا در برقراری ارتباط لطفا بعدا تلاش فرمایید";
    setTimeout(() => {
      show.value = false;
    }, errorTimeout);
  } finally {
    isLoading.value = false;
  }
};

const pageContainer = ref(null);

onMounted(() => {
  // Listen for the keyboard open event
  window.addEventListener("keyboardDidShow", handleKeyboardShow);
  // Listen for the keyboard close event (optional)
  window.addEventListener("keyboardDidHide", handleKeyboardHide);
});

const handleKeyboardShow = () => {

  pageContainer.value.scrollIntoView({ behavior: "smooth", block: "start" });
};

const handleKeyboardHide = () => {

  pageContainer.value.scrollIntoView({ behavior: "smooth", block: "end" });
};

const convertPersianNumbersToEnglish = (input) => {
  const persianToEnglishMap = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9'
  };

  return input.replace(/[۰-۹]/g, (match) => persianToEnglishMap[match]);
};



</script>

<style>
.divider {
  display: block;
  flex: 1 1 100%;
  height: 0px;
  max-height: 0px;
  opacity: var(--v-border-opacity);
  transition: inherit;
  border-style: solid;
  border-width: thin 0 0 0;
}

input[type="text"] {
  width: 100%;
  border: 2px solid #aaa;
  border-radius: 4px;
  margin: 8px 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}

input[type="password"] {
  width: 100%;
  border: 2px solid #aaa;
  border-radius: 4px;
  margin: 8px 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}



input[type="text"]:focus {
  border-color: #13213c;


}

.inputWithIcon input[type="text"] {
  padding-left: 40px;
  padding-right: 35px;
}

.inputWithIcon input[type="password"] {
  padding-left: 40px;
  padding-right: 35px;
}


.inputWithIcon {
  position: relative;
}

.inputWithIcon i {
  position: absolute;
  left: 0;
  top: 8px;
  padding: 9px 8px;
  color: #aaa;
  transition: 0.3s;
}
.bl {
  position: absolute;
  right: 18px !important;
  top: 10px;
  padding: 9px 8px;
  color: #aaa;
  transition: 0.3s;
}
.inputWithIcon input[type="text"]:focus + i {
  color: #13213c;
}

.inputWithIcon.inputIconBg i {
  background-color: #aaa;
  color: #fff;
  padding: 9px 4px;
  border-radius: 4px 0 0 4px;
}


.inputWithIcon input[type="password"].error1 {
  border-color: red;
}

.inputWithIcon.inputIconBg input[type="text"]:focus + i {
  color: #fff;
  background-color: dodgerBlue;
}
.error-message {
  color: red;
  font-size: 14px;
}


.spinner-container {
  width: 100%; /* عرض و ارتفاع مورد نظر برای پیشرفت */
  height: 100%;

  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); */
}

.error-message-bottom {
  position: fixed;
  bottom: 0;
  padding: 13px;
  width: 100%;
  margin-bottom: 0; /* این خط اضافه شده */
  z-index: 999;
  animation: moveUp 1s forwards;
  background-color: red;
  color: white;
}
@keyframes moveUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.inputWithIcon input[type="password"].focus {
  border-color: #13213c; /* رنگ حاشیه آبی در حالت فوکوس */
}

.inputWithIcon input[type="password"].error1 {
  border-color: red; /* رنگ حاشیه قرمز در حالت ورودی خالی */
}

.LogInError {
  position: absolute;
  bottom: 0px;
  padding: 13px;
  margin-bottom: 0;
  z-index: 999;
  animation: moveUp 1s forwards;
  background-color: #ba0303;
  color: white;
}

@keyframes moveUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
