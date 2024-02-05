<template>
  <div v-if="UpdateModal==true" class="modal-container">
    <div class="modal-home col-10 text-center">
      <div class="col-12 d-flex justify-content-end">
        <div class="col-12 d-flex justify-content-start gap-2">
          <span
            class=" rounded-5 font1 col-1 text-black   "
            type="button"
            @click="CloseUpdateModalButton"
          >
   &#9932;
          </span>

        </div>
      </div>
      <h1 class="text-center fs-6 my-3">
        نسخه جدید اپلیکیشن نظارت
      </h1>
      <p class="text-center">
        بهبود عملکرد
      </p>
      <p class="text-center">
        اضافه شدن مسیر یابی
      </p>
      <p class="text-center">
        بهبود عملکرد در حالت آفلاین
      </p>
      <p class="text-center">
        گرفتن عکس از دوربین وآپلود
      </p>   <p class="text-center">
      انتخاب چند تایی عکس از گالری
    </p>
     <p class="text-center">
اضافه شدن آخرین نظارت ثبت شده به پرونده ها    </p>

    </div>
  </div>
  <div class="page-heading">
    <div class="page-title position-sticky top-0 z-index bg-body">
      <div class="">
        <form class="d-flex pb-2 pt-2" role="search">
          <input
            class="form-control mx-5 p-2 text-center rounded-5 border-secondary text-black data"
            type="search"
            placeholder="جستوجو بر اساس نام یا شماره قرداد "
            v-model="searchQuery"
          />
        </form>
      </div>
    </div>
    <div class="overlay" v-if="isLoading">
      <div class="spinner-container">
        <div class="spinner-border text-warning" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <p class="error text-end" v-if="searchError">
      !کاربر مورد نظر یافت نشد
    </p>

    <!-- Basic card section start -->
    <section id="content-types " class="mx-3">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div
            class="card shadow-lg"
            v-for="(item, index) in Data"
            :key="index"
          >
            <div
              class="card-content transition-card overflow-hidden bg-white border-top"
              @click="navigateToCardDetail(item.id,item.loanPlan.id,item.loanDetail.loanEconomicTypeId)"
              :class="getItemClass(item.loanPlan.id)"

            >
              <div class="card-body p-3 ">
                <div class="d-flex justify-content-between text-black ">
                  <img src="/img/contact.png" style="width: 50px;height: 50px" v-if="item.loanPlan.id==0 ">
                  <img class=" px-2   " src="/img/icons8-location-96.png" v-if="item.loanPlan.id" style="height: 50px">


                  <span class="card-title light d-flex  ">

              <p class=" mt-3 mb-0 truncate-text  ">  {{ toPersianNumber(item.loanDetail.customerName) }}</p>

                <img class="  ms-2  mb-1 mx-2 " src="/img/person.png" style="width: 50px;height: 50px "
                     v-if="typeof item.loanDetail.guid== 'string' ">

                    <img class="  ms-3  mb-1 mx-2 " src="~/assets/images/man.png" style="width: 50px;height: 50px "
                         v-if="item.loanDetail.guid==null&& item.customerGenderType===false ">
                    <img class="  ms-3  mb-1 mx-2 " src="/img/muslim.png" style="width: 50px;height: 50px "
                         v-if="item.loanDetail.guid==null&& item.customerGenderType===true ">
                  </span>
                </div>
              </div>
              <p class="card-text text-end  text-black title-font px-3 py-2  ">
                {{ item.loanDetail.loanMinorTypeDesc }}
              </p>
              <div class="background d-flex card-text text-center text-danger bg-gray justify-content-center p-1">
                <span class="">  {{ toPersianNumber(item.loanDetail.loanNumber) }} </span>

                <p class="card-text text-center text-danger bg-gray fw-bold px-1 ">
                  :شماره قرارداد </p>
              </div>
              <div class="d-flex justify-content-between pt-3 px-3">
                <p class="text-success  date-font "
                   :class="{'text-danger':convert(item.loanPlan.loanSurveyEconomidTypeId) === ':ثبت نشده' }"><strong>نوع
                  نظارت </strong>{{ convert(item.loanPlan.loanSurveyEconomidTypeId) }}</p>
                <p class="text-black date-font">
                  مهلت پرداخت
                  <strong class="data"> {{ toPersianNumber(item.expireDateFa) }}</strong>
                </p>
              </div>
            </div>
            <div v-for="(item1 ,i) in showsend " :key="i" class='d-flex position-relative'>
              <div v-if="index===item1" class="d-flex col-12">
                <button @click="SendToServer(item)"
                        class="bg-white btn btn-light  col-4 d-flex p-2 date-font gap-2 py-4 cursor-pointer justify-content-center button-animation ">
                  ارسال به سرور
                  <i class="bi bi-cloud-arrow-up"></i>
                </button>
                <p class="errorserver text-center pt-2  pt-4 date-font data ">
                  نظارت انجام شده را حتما پس از برقراری اینترنت ارسال نمایید
                </p>
                <p class="errorserver text-center pt-2  pt-4 position-absolute" v-if="sendphoto" style="height: 100%">
                  درحال ارسال عکس لطفا صبر کنید
                </p>
                <p class="errorserver text-center pt-2  pt-4 position-absolute" v-if="getphotofromdatabase"
                   style="height: 100%">
                  درحال دریافت اطلاعات لطفا صبر کنید
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-if="isModalVisible" class="modal-container" @click="handleClickOutside" ref="modal">
    <div class="modal-home col-10 text-center">نوع نظارت را مشخص فرمایید
      <div class="d-flex p-2 justify-content-center">
        <div class="middle col-12 d-flex mb-3 ms-2 ">
          <label class="col-12">
            <input
              type="radio"
              name="gender"
              @click="routerhusbandry(1)"
            />
            <div
              class="front-end border-end-2 border border-secondary  box col-12 py-1"
            >
              <span>دامپروری</span>
            </div>
          </label>

          <label class="col-12">
            <input
              type="radio"
              name="gender"
              @click="routergarden(2)"
            />
            <div
              class="back-end box col-12 border-end-2 border border-secondary  py-1"
            >
              <span>زراعی/باغی</span>
            </div>
          </label>
          <label class="col-12">
            <input
              type="radio"
              name="gender"
              @click="routerservice(3)"
            />
            <div
              class="back-end box col-12 border-end-2 border border-secondary  py-1"
            >
              <span>خدمات</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
  <p v-if="sucssec" class="errorsucssec text-center pt-4">
    نظارت با موفقیت ارسال شد
  </p>
  <div v-if="sucssec" class="modal-backdrop">
    <div class="modal-home col-10">
      <p class="text-center">فرم شما ارسال شد </p>
      <div class="col-12 d-flex justify-content-center">
        <div class="col-12 d-flex justify-content-center gap-2">
          <nuxt-link to="/" class="col-9">
            <button class="btn btn-primary rounded-5 font1 col-12 text-white bg-success py-3 " type="button"
                    @click="modalexite">
              بستن
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>

  <div v-if="condition" class="d-flex justify-content-centerd  flex-column-reverse">
    <p class="text-center">هیچ نظارتی برای شما ثبت نشده</p>


  </div>
  <div class="overlay" v-if="isLoading">
    <div class="spinner-container">
      <div class="spinner-border " role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>

import axios from "axios";
import {BaseUrl} from "~/store/BaseApi"

const Data = ref();
const photocondition = ref()
const searchQuery = ref('');
const searchError = ref()
const router = useRouter();
const SupervisoryInfo = localStorage.getItem("SupervisoryInfo");
const supervisoryInfo =SupervisoryInfo ?JSON.parse(SupervisoryInfo):{}
const isLoading = ref(false);
const condition = ref(false)
const sendphoto = ref(false)
const getphotofromdatabase = ref(false)
const showsend = ref([]);
const sucssec = ref(false)
const Url=BaseUrl


const UpdateModal = ref(localStorage.getItem('updatemodal') ? localStorage.getItem('updatemodal') : true)
const CloseUpdateModalButton = () => {
  localStorage.setItem('updatemodal', false)
  UpdateModal.value = false
}
const findindex = (id) => {
  const Date = localStorage.getItem('GetCartables');
  const dataArray = JSON.parse(Date);
  const filteredData = dataArray.filter(item => item.cartableStatusTypeId == 1);
  const targetObject = filteredData.findIndex((item) => item.id === Number(id));
  showsend.value.push(targetObject);
};

const SendToServer = (item) => {
  const DB_NAME = '"offlineImagesDB"';
  const DB_VERSION = 1;
  let db;
  const openDatabase = () => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("Error opening indexedDB:", event);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      db.createObjectStore("offlineImages", {autoIncrement: true});
    };

    request.onsuccess = (event) => {
      db = event.target.result;

      getSavedImagesFromIndexedDB();
    };
  };

  const getSavedImagesFromIndexedDB = () => {
    if (!db) {
      console.error("IndexedDB is not initialized.");
      return;
    }

    const transaction = db.transaction(["offlineImages"], "readonly");
    const objectStore = transaction.objectStore("offlineImages");
    const images = [];
    const request = objectStore.openCursor();
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        images.push(cursor.value);
        cursor.continue();
      } else {
        sendImagesToBackend(images);
      }
    };
    request.onerror = (event) => {
      console.error("Error fetching images from IndexedDB:", event);
    };
  };


  const removeFileFromDB = async (userId) => {
    const transaction = db.transaction(["offlineImages"], "readwrite");
    const objectStore = transaction.objectStore("offlineImages");
    const images = [];
    const request = objectStore.openCursor();
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        images.push(cursor.value);
        images.forEach(() => {
          if (cursor.value.userId == userId) {
            const deleteRequest = objectStore.delete(cursor.primaryKey);
            console.log(`File "${userId}" has been deleted from the database.`);
            return;
          }
        })
        cursor.continue();
      }
    };
    request.onerror = (event) => {
      console.error("Error finding file in IndexedDB:", event);
    };
  };

  const sendImagesToBackend = (images) => {
    const token = localStorage.getItem("localStorageTokenKey");
    let responses = [];
    let body = "";
    const currentUserId = item.id
    Promise.all(
      images.filter((image) => image.userId == currentUserId).map((image, index) => {
        getphotofromdatabase.value = true
        return new Promise((resolve, reject) => {
          const currentUserId = item.id
          const loanId = item.loanId;
          const currentUsername = "example_user";
          const key = `user_${currentUserId}_${currentUsername}`;
          const offlineData = localStorage.getItem(key);
          const offlineBody = JSON.parse(offlineData);
          const formData = new FormData();
          formData.append("image", image.file.file);
          const config = {
            headers: {
              Authorization: "Bearer " + supervisoryInfo.token,
              "Content-Type": "multipart/form-data",
            },
          };
          axios
            .post(
              `${Url + 'api/Upload/uploadSurveyImage'}`,
              formData,
              config,
              loanId
            )
            .then((response) => {
              getphotofromdatabase.value = false
              sendphoto.value = true
              const res = response.data.results[0];
              responses.push(res);
              offlineBody.survey.guidList = responses;
              body = offlineBody;
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      })
    )
      .then(() => {
        sendphoto.value = false
        sendDataToBackend(body, currentUserId)
      }).catch((error) => {
      console.error("Error sending image data to the backend:", error);
    });
  };


  const sendDataToBackend = async (body, currentUserId,) => {
    const token = localStorage.getItem("localStorageTokenKey");
    console.log(Body )
    try {
      const response = await axios.post(
        `${Url + 'api/survey/SetLoanPlanSurvey'}`, body, {
        headers: {
          Authorization: "Bearer " + supervisoryInfo.token,
        },
      });

      if (response.status == 200) {
        const keyToDelete = `user_${currentUserId}_example_user`;

        localStorage.removeItem(keyToDelete);
        sucssec.value = true
        removeFileFromDB(currentUserId)
        // location.reload()
      }
    } catch (error) {


      console.error("Error sending data to the backend:", error);

    }
  };
  openDatabase();
};


watchEffect(() => {
  const config = {headers: {Authorization: "Bearer " + supervisoryInfo.token}};
  isLoading.value = true  ;
  axios
    .post(
      `${Url + "api/survey/GetCartables"}`,
      {
        pageNumber: 1,
        take: 1000,
        cartableStatusTypeId:1
      },
      config
    )
    .then((res) => {
      localStorage.setItem("GetCartables", JSON.stringify(res.data.results));
      const items = localStorage.getItem("GetCartables");
      const data = JSON.parse(items)
      if (data && data.length > 0) {
        const currentDate = new Date();
        const todayDateString = currentDate.toISOString().split('T')[0]
        const filteredExpireDate = data.filter(item => item.expireDate.substring(0, 10) >= todayDateString);
        if (filteredExpireDate.length == 0) {
          condition.value = true
        } else {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("user")) {
              const userId = key.substring(5, 11)
              findindex(userId)
            }
          }
          Data.value = filteredExpireDate

        }
      } else {
        condition.value = true
      }
      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false
      const items = localStorage.getItem("GetCartables");
      const data = JSON.parse(items)
      if (data && data.length > 0) {
        const currentDate = new Date();
        const todayDateString = currentDate.toISOString().split('T')[0]
        const filteredExpireDate = data.filter(item => item.expireDate.substring(0, 10) >= todayDateString);
        Data.value = filteredExpireDate;
        if (filteredExpireDate.length === 0) {
          condition.value = true
        } else {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("user")) {
              const userId = key.substring(5, 11)
              findindex(userId)
            }
          }
          Data.value = filteredExpireDate
        }
      } else {
        condition.value = true
      }
      if (err.response.status == 401) {
        localStorage.removeItem("SurveyBaseInfo");
        localStorage.removeItem("SupervisoryInfo");
        localStorage.removeItem("GetSurveysList")
        localStorage.removeItem("nuxt-color-mode");
        localStorage.removeItem("GetCartables");
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("user")) {
            localStorage.removeItem(key)
          }
        }
        router.push("/login");
      }
    })

  axios
    .post(
      `${Url + "api/survey/GetSurveysListForPWA"}`,
      {"pageNumber":1,"take":1000,"userId":supervisoryInfo.id},
      config
    )
    .then((res) => {

      localStorage.setItem("GetSurveysList", JSON.stringify(res.data.results));

    })


});


const getItemClass = (item: number) => {
  return {
    'background-card': item == 0
  };
};
watch(searchQuery, (newVal, oldVal) => {
  const items = localStorage.getItem("GetCartables");
  const data = JSON.parse(items);
  const filteredData = data.filter((item) => item.cartableStatusTypeId == 1);
  const currentDate = new Date();
  const todayDateString = currentDate.toISOString().split('T')[0]
  const filteredExpireDate = filteredData.filter(item => item.expireDate.substring(0, 10) >= todayDateString);
  searchError.value = false

  if (newVal) {
    const foundData = filteredExpireDate.filter((item) => {

      return (
        item.loanDetail.customerName.toString().includes(newVal) ||
        item.loanDetail.customerNumber.toString().includes(newVal)
      );
    });
    Data.value = foundData;

    if (foundData.length === 0) {
      searchError.value = true

    }
  } else {
    searchError.value = false
    const filteredData = data.filter((item) => item.cartableStatusTypeId == 1);
    const currentDate = new Date();
    const todayDateString = currentDate.toISOString().split('T')[0]
    const filteredExpireDate = filteredData.filter(item => item.expireDate.substring(0, 10) >= todayDateString);
    Data.value = filteredExpireDate;
  }
});
const isModalVisible = ref(false);

const showModal = () => {
  isModalVisible.value = true;
  document.body.addEventListener('click', handleBodyClick);
};

const handleBodyClick = (event) => {
  if (!refs.modal.contains(event.target)) {
    closeModal();
  }
};

const handleClickOutside = () => {
  closeModal();
};

const closeModal = () => {
  isModalVisible.value = false;
  document.body.removeEventListener('click', handleBodyClick);
};
let globalCardName = "";

const navigateToCardDetail = (cardName: string, data, loanEconomicTypeId) => {
  if (data == 0 && loanEconomicTypeId == 1) {
    showModal();
    globalCardName = cardName;
  } else if (data == 0) {
    const updatedLoanEconomicTypeId = loanEconomicTypeId === 4 ? 3 : loanEconomicTypeId === 3 ? 4 : loanEconomicTypeId;
    // router.push({path: "/MonitoringRegistrationPage", query: {cardName, loanEconomicTypeId: loanEconomicTypeId}});
    router.push({path: "/MonitoringRegistrationPage", query: {cardName, loanEconomicTypeId: updatedLoanEconomicTypeId}});
  } else {
    router.push({path: "/MapPage", query: {cardName, loanEconomicTypeId}});
  }
};

const routergarden = (loanEconomicTypeId) => {
  router.push({path: "/MonitoringRegistrationPage", query: {cardName: globalCardName, loanEconomicTypeId}});
}

const routerhusbandry = (loanEconomicTypeId) => {
  router.push({path: "/MonitoringRegistrationPage", query: {cardName: globalCardName, loanEconomicTypeId}});
}

const routerservice = (loanEconomicTypeId) => {
  router.push({path: "/MonitoringRegistrationPage", query: {cardName: globalCardName, loanEconomicTypeId}});
}
const toPersianNumber = (number) => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number.toString().replace(/\d/g, (digit) => persianNumbers[digit]);
};

const convert = (number) => {
  switch (number) {
    case 0:
      return ":ثبت نشده";
    case 1  :
      return ":دامپروری"
    case 2:
      return ":زراعی";
    case 3:
      return ":خدمات";
    case 4:
      return ":صنعتی";
  }
}

const modalexite = () => {
  location.reload()
  sucssec.value = false
}


window.addEventListener('online', async () => {
  // sendphotoRequest()
  // location.reload()
});


</script>
<style lang="scss">
.background {
  background-color: #c2c0c0;
}


.card {
  border-radius: 0px 50px 0px 0px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.spinner-container {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0000004d;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); */
}

.background-card {
  background-color: #e5e5e5 !important;
  border-top-right-radius: 50px;
}

.border-top {
  border-top-right-radius: 50px;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* پس زمینه تاریک پشت مدال */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}


.modal-home {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}


$font: "Inter", sans-serif;
$white: #fff;
$green: #fca40f;


.middle {
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;

  h1 {
    font-family: $font;
    color: $white;
  }

  input[type="radio"] {
    display: none;

    &:checked {
      + .box {
        background-color: $green;
        color: white;
        //span {
        //  color: white;
        //  transform: translateY(70px);
        //  &:before {
        //    transform: translateY(0px);
        //    opacity: 1;
        //  }
        //}
      }

      + .boxeducation {
        background-color: $green;
        color: white;
        //span {
        //  color: white;
        //  transform: translateY(70px);
        //  &:before {
        //    transform: translateY(0px);
        //    opacity: 1;
        //  }
        //}
      }

      + .boxLoan {
        background-color: $green;
        color: white;
        //span {
        //  color: white;
        //  transform: translateY(70px);
        //  &:before {
        //    transform: translateY(0px);
        //    opacity: 1;
        //  }
        //}
      }
    }
  }

  .box {
    height: 38px;
    transition: all 250ms ease;
    will-change: transition;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    position: relative;

    &:active {
      transform: translateY(10px);
    }

    span {
      transform: translate(0, 60px);
      left: 0;
      right: 0;
      transition: all 300ms ease;
      font-size: 1em;
      user-select: none;

      &:before {
        font-size: 1.2em;
        font-family: FontAwesome;
        display: block;
        transform: translateY(-80px);
        opacity: 0;
        transition: all 300ms ease-in-out;
        font-weight: normal;
        color: white;
      }
    }
  }

  .boxeducation {
    transition: all 250ms ease;
    will-change: transition;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    position: relative;

    &:active {
      transform: translateY(10px);
    }

    span {
      transform: translate(0, 60px);
      left: 0;
      right: 0;
      transition: all 300ms ease;
      font-size: 1em;
      user-select: none;

      &:before {
        font-size: 1.2em;
        font-family: FontAwesome;
        display: block;
        transform: translateY(-80px);
        opacity: 0;
        transition: all 300ms ease-in-out;
        font-weight: normal;
        color: white;
      }
    }
  }

  .boxLoan {
    transition: all 250ms ease;
    will-change: transition;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    position: relative;

    &:active {
      transform: translateY(10px);
    }

    span {
      transform: translate(0, 60px);
      left: 0;
      right: 0;
      transition: all 300ms ease;
      font-size: 1em;
      user-select: none;

      &:before {
        font-size: 1.2em;
        font-family: FontAwesome;
        display: block;
        transform: translateY(-80px);
        opacity: 0;
        transition: all 300ms ease-in-out;
        font-weight: normal;
        color: white;
      }
    }
  }
}

.errorserver {

  bottom: 0;
  padding: 13px;
  width: 100%;
  margin-bottom: 0; /* این خط اضافه شده */
  z-index: 999;

  background-color: #fca40f;
  color: white;
}


.errorsucssec {
  position: fixed;
  bottom: 0;
  padding: 13px;
  width: 100%;
  margin-bottom: 0; /* این خط اضافه شده */
  z-index: 999;
  animation: moveUp 0.5s forwards;
  background-color: #00b515;
  color: white;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
