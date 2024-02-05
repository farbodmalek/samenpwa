<template>
  <Carddetails />
  <div class="transition">
    <div v-if="loanSurvey == 1">
    <!--    وضعیت اماری دامی-->
    <div class="flex-column px-1">
      <div class="col col-12 d-flex align-center pt-1">
        <hr class="v-divider theme--light" />
        <strong class="mx-2 text-black text-center col-5"
        >وضعیت اماری دامی
        </strong>
        <hr class="v-divider v-theme--light" />
      </div>
      <div
        class="middle mb-1 d-flex col-12 font1 fw-bold bg-white px-2 py-2 flex-row-reverse"
      >
        <label
          v-for="(animal, index) in animals.livestockTypes"
          :key="index"
          class="col-4 p-1"
          @click="setanimalsTab(animal.key)"
        >
          <input
            type="radio"
            name="ownership"
            v-model="formAnimalHusbandry.LivestockTypeId"
            :value="animal.key"
          />
          <div
            class="front-end boxownership px-2 border border-secondary col-12 rounded-4 py-3"
          >
            <span>{{ animal.value }}</span>
          </div>
        </label>
      </div>
      <div class="flex-column">
        <div
          class="mb-3 px-0 d-flex p-2 col-12 flex-wrap justify-content-center pos"
          v-if="1 === formAnimalHusbandry.LivestockTypeId"
        >
          <input
            type="text "
            placeholder="گاو گوشتی"
            style="height: 40px"
            class="form-control input-group text-end col-12 border-1 border-black rounded-3 text-end"
            v-model="formAnimalHusbandry.NumberOfMaleLivestock"
            inputmode="numeric"
            @input="formAnimalHusbandry.NumberOfMaleLivestock = convertPersianNumbersToEnglish(formAnimalHusbandry.NumberOfMaleLivestock)"
          />
          <input
            type="text "
            placeholder=" گاو شیرده  "
            style="height: 40px"
            class="form-control input-group text-end col-12 border-1 border-black rounded-3 text-end mt-3"
            v-model="formAnimalHusbandry.NumberOfFemaleLivestock"
            inputmode="numeric"
            @input="formAnimalHusbandry.NumberOfFemaleLivestock = convertPersianNumbersToEnglish(formAnimalHusbandry.NumberOfFemaleLivestock)"
          />
        </div>
      </div>
      <div class="flex-column">
        <div
          class="mb-3 px-0 d-flex p-2 col-12 flex-wrap justify-content-center pos"
          v-if="2 === formAnimalHusbandry.LivestockTypeId"
        >
          <input
            type="text "
            placeholder="تعداد نرها"
            style="height: 40px"
            class="form-control input-group text-end col-12 border-1 border-black rounded-3 text-end"
            v-model="formAnimalHusbandry.NumberOfMaleLivestock"
            inputmode="numeric"

          />
          <input
            type="text "
            placeholder=" تعداد ماده ها "
            style="height: 40px"
            class="form-control input-group text-end col-12 border-1 border-black rounded-3 text-end mt-3"
            v-model="formAnimalHusbandry.NumberOfFemaleLivestock"
            inputmode="numeric"
          />
        </div>
      </div>
      <div class="flex-column">
        <div
          class="mb-3 px-0 d-flex p-2 col-12 flex-wrap justify-content-center pos"
          v-if="6 === formAnimalHusbandry.LivestockTypeId"
        >
          <input
            type="text "
            placeholder="تعداد کندو"
            style="height: 40px"
            class="form-control input-group text-end col-12 border-1 border-black rounded-3 text-end"
            v-model="formAnimalHusbandry.NumberOfMaleLivestock"
            inputmode="numeric"
            @input="formAnimalHusbandry.NumberOfMaleLivestock = convertPersianNumbersToEnglish(formAnimalHusbandry.NumberOfMaleLivestock)"

          />
        </div>
      </div>
      <div class="flex-column">
        <div
          class="mb-3 px-0 d-flex p-2 col-12 flex-wrap justify-content-center pos"
          v-if="
              formAnimalHusbandry.LivestockTypeId === 4 ||
              formAnimalHusbandry.LivestockTypeId === 5 ||
              formAnimalHusbandry.LivestockTypeId === 3 ||
              formAnimalHusbandry.LivestockTypeId === 7 ||
              formAnimalHusbandry.LivestockTypeId === 7 ||
              formAnimalHusbandry.LivestockTypeId === 8 ||
              formAnimalHusbandry.LivestockTypeId === 9
            "
        >
          <input
            type="text "
            placeholder="دام ها"
            style="height: 40px"
            class="form-control input-group text-end col-12 border-1 border-black rounded-3 text-end"
            v-model="formAnimalHusbandry.NumberOfMaleLivestock"
            inputmode="numeric"
            @input="formAnimalHusbandry.LivestockTypeId = convertPersianNumbersToEnglish(formAnimalHusbandry.LivestockTypeId)"

          />
        </div>
        <p
          v-if="
              errorHusbandry3 && formAnimalHusbandry.LivestockTypeId === null
            "
          class="error text-center pt-2 pt-4"
        >
          تعداد دام صحیح نیست
        </p>
      </div>
    </div>
    <p
      v-if="
          errorHusbandry3 &&
          formAnimalHusbandry.NumberOfFemaleLivestock.trim() === ''
        "
      class="error text-center pt-2 pt-4"
    >
      تعدا دام صحیح نیست
    </p>

    <p
      v-if="
          errorHusbandry3 &&
          formAnimalHusbandry.NumberOfFemaleLivestock.trim() === ''
        "
      class="error text-center pt-2 pt-4"
    >
      تعدا دام صحیح نیست
    </p>

    <p
      v-if="
          errorHusbandry3 &&
          formAnimalHusbandry.NumberOfFemaleLivestock.trim() === ''
        "
      class="error text-center pt-2 pt-4"
    >
      تعداد دام درست نیست
    </p>
    <p
      v-if="errorHusbandry && formAnimalHusbandry.livestockType === ''"
      class="error text-center pt-2 pt-4"
    >
      وضعیت اماری دامی نمیتواند خالی باشد
    </p>
    <!-- section وضعیت بیمه  -->
    <div class="col col-12 d-flex align-center pt-1 flex-column mb-2">
      <!-- name form -->
      <div class="col col-12 d-flex align-center pt-1">
        <hr class="v-divider theme--light" />
        <strong class="mx-2 text-black text-center" style="width: 250px"
        >وضعیت بیمه
        </strong>
        <hr class="v-divider v-theme--light" />
      </div>
      <!-- form لیست بیمه  -->
      <div class="mx-3">
        <div class="d-flex justify-content-center bg-white p-2 pt-3">
          <div class="middle col-9 d-flex mb-3 ms-2 ms-3 mb-3 px-1 col-9">
            <label class="col-6 border">
              <input
                type="radio"
                name="Insurance"
                :value="0"
                v-model="formAnimalHusbandry.insuranceTab"
              />
              <div
                class="back-end boxInsurance col-12 py-2"
                @click="insuranceTabHusbandry(0)"
              >
                <span>ندارد</span>
              </div>
            </label>
            <label class="col-6 border border-end-0 col-6">
              <input
                type="radio"
                name="Insurance"
                :value="1"
                v-model="formAnimalHusbandry.insuranceTab"
              />
              <div
                class="front-end boxInsurance col-12 py-2"
                @click="insuranceTabHusbandry(1)"
              >
                <span>دارد</span>
              </div>
            </label>
          </div>
          <p class="py-2 col-3 text-center">لیست بیمه</p>
        </div>

        <!-- form نوع بیمه  -->
        <div
          class="d-flex justify-content-center bg-white p-2 col-12"
          v-if="currentTabHusbandry === 1"
        >
          <div
            class="nav nav-pills px-2 col-9"
            id="pills-tab"
            role="tablist "
          >
            <select
              class="form-select form-select-sm form-control input-group border-1 border-black rounded-3 text-start"
              style="height: 45px"
              v-model="formAnimalHusbandry.insuranceTypeId"
            >
              <option class="text-end" value="1">تامین اجتماعی</option>
              <option class="text-end" value="2">عشایری</option>
            </select>
          </div>
          <p class="py-2 text-center col-3">نوع بیمه</p>
        </div>

        <!-- form کد کارگاه -->
        <div
          class="d-flex justify-content-center bg-white p-2 col-12 flex-wrap"
          v-if="currentTabHusbandry === 1"
        >
          <div class="px-2 col-9">
            <input
              type="text"
              class="form-control input-group border-1 border-black rounded-3"
              v-model="formAnimalHusbandry.workShopCode"
              style="height: 45px"
              inputmode="numeric"
              @input="formAnimalHusbandry.workShopCode = convertPersianNumbersToEnglish(formAnimalHusbandry.workShopCode)"

            />
          </div>
          <p class="py-2 text-center col-3">کد کارگاه</p>
        </div>

        <!-- form تعداد بیمه شده  -->
        <div
          class="d-flex justify-content-center bg-white p-2 col-12 flex-wrap"
          v-if="currentTabHusbandry === 1"
        >
          <div class="px-2 col-9">
            <input
              type="text"
              class="form-control input-group border-1 border-black rounded-3"
              v-model="formAnimalHusbandry.numberOfInsurdPerson"
              inputmode="numeric"
              @input="formAnimalHusbandry.numberOfInsurdPerson = convertPersianNumbersToEnglish(formAnimalHusbandry.numberOfInsurdPerson)"

              style="height: 45px"
            />
          </div>
          <p
            v-if="
                errorHusbandry2 && formAnimalHusbandry.insuranceTypeId === null
              "
            class="error text-center pt-4"
          >
            نوع بیمه نمیتواند خالی باشد
          </p>
          <p class="py-1 text-center col-3">تعداد بیمه شده</p>
        </div>
      </div>
      <p
        v-if="errorHusbandry2 && formAnimalHusbandry.workShopCode === ''"
        class="error text-center pt-4"
      >
        کد گارگاه نمیتواند خالی باشد
      </p>
      <p
        v-if="
            errorHusbandry2 &&
            formAnimalHusbandry.numberOfInsurdPerson.trim() === ''
          "
        class="error text-center pt-4"
      >
        تعداد افراد بیمه شده نمیتواند خالی باشد
      </p>
    </div>
    <p
      v-if="errorHusbandry && formAnimalHusbandry.insuranceTab === null"
      class="error text-center pt-4"
    >
      وضعیت بیمه نمیتواند خالی باشد
    </p>
    <!-- section  وضعیت اشتغال -->
    <div class="flex-column">
      <div class="col col-12 d-flex align-center pt-1">
        <hr class="v-divider theme--light" />
        <strong class="mx-2 text-black text-center col-4"
        >وضعیت اشتغال</strong
        >
        <hr class="v-divider v-theme--light" />
      </div>
      <div
        class="mb-3 px-3 d-flex p-2 col-12 flex-wrap justify-content-center pos"
      >
        <input
          type="text "
          placeholder=" نفر"
          style="height: 50px"
          class="form-control input-group text-end col-12 border-1 border-black rounded-3 text-center"
          v-model="formAnimalHusbandry.numberOfJobsCreated"
          inputmode="numeric"
          @input="formAnimalHusbandry.numberOfJobsCreated = convertPersianNumbersToEnglish(formAnimalHusbandry.numberOfJobsCreated)"

        />
      </div>
      <p
        v-if="
            errorHusbandry &&
            formAnimalHusbandry.numberOfJobsCreated.trim() === ''
          "
        class="error text-center pt-2 pt-4"
      >
        تعداد اشتغال افراد نمی تواند خالی باشد
      </p>
    </div>
    <!-- section دفترچه دامداری -->
    <div class="flex-column">
      <div class="col col-12 d-flex align-center pt-1">
        <hr class="v-divider theme--light" />
        <strong class="mx-2 text-black text-center col-4"
        >دفترچه دامداری
        </strong>
        <hr class="v-divider v-theme--light" />
      </div>

      <div class="px-3">
        <div
          class="middle col-12 mb-3 d-flex justify-content-center bg-white py-2 px-2 col-md-12 pb-4 pt-2 rounded-4"
        >
          <label class="col-6 px-1">
            <input
              type="radio"
              name="LivestockBooklet"
              :value="0"
              v-model="formAnimalHusbandry.LivestockBooklet"
            />
            <div
              class="back-end boxPermit rounded-pill p-3 col-12 border border-end-0 px-1"
            >
              <span>ندارد</span>
            </div>
          </label>
          <label class="col-6 px-1">
            <input
              type="radio"
              name="LivestockBooklet"
              :value="1"
              v-model="formAnimalHusbandry.LivestockBooklet"
            />
            <div
              class="front-end boxPermit rounded-pill p-3 col-12 border border-end-0 px-1"
            >
              <span>دارد</span>
            </div>
          </label>
        </div>
      </div>
    </div>
    <p
      v-if="errorHusbandry && formAnimalHusbandry.LivestockBooklet === null"
      class="error text-center pt-4"
    >
      دفترچه دامداری نمی تواند خالی باشد
    </p>
    <!-- section  پروانه دامداری-->
    <div class="flex-column">
      <div class="col col-12 d-flex align-center pt-1">
        <hr class="v-divider theme--light" />
        <strong class="mx-2 text-black text-center col-4"
        >پروانه دامداری</strong
        >
        <hr class="v-divider v-theme--light" />
      </div>

      <div class="px-3">
        <div
          class="middle col-12 mb-3 d-flex justify-content-center bg-white py-2 px-2 col-md-12 pb-4 pt-2 rounded-4"
        >
          <label class="col-6 px-1">
            <input
              type="radio"
              name="LivestockLicense"
              :value="0"
              v-model="formAnimalHusbandry.LivestockLicense"
            />
            <div
              class="back-end boxPermit rounded-pill p-3 col-12 border border-end-0 px-1"
            >
              <span>ندارد</span>
            </div>
          </label>
          <label class="col-6 px-1">
            <input
              type="radio"
              name="LivestockLicense"
              :value="1"
              v-model="formAnimalHusbandry.LivestockLicense"
            />
            <div
              class="front-end boxPermit rounded-pill p-3 col-12 border border-end-0 px-1"
            >
              <span>دارد</span>
            </div>
          </label>
        </div>
      </div>
    </div>
    <p
      v-if="errorHusbandry && formAnimalHusbandry.LivestockLicense === null"
      class="error text-center pt-4"
    >
      پروانه دامداری نمی تواند خالی باشد
    </p>
    <!-- section  بیمه نامه دام-->
    <div class="flex-column">
      <div class="col col-12 d-flex align-center pt-1">
        <hr class="v-divider theme--light" />
        <strong class="mx-2 text-black text-center col-4"
        >بیمه نامه دام</strong
        >
        <hr class="v-divider v-theme--light" />
      </div>

      <div class="px-3">
        <div
          class="middle col-12 mb-3 d-flex justify-content-center bg-white py-2 px-2 col-md-12 pb-4 pt-2 rounded-4"
        >
          <label class="col-6 px-1">
            <input
              type="radio"
              name="LivestockInsurance"
              :value="0"
              v-model="formAnimalHusbandry.LivestockInsurance"
            />
            <div
              class="back-end boxPermit rounded-pill p-3 col-12 border border-end-0 px-1"
              @click="setcalender(0)"
            >
              <span>ندارد</span>
            </div>
          </label>
          <label class="col-6 px-1">
            <input
              type="radio"
              name="LivestockInsurance"
              :value="1"
              v-model="formAnimalHusbandry.LivestockInsurance"
            />
            <div
              class="front-end boxPermit rounded-pill p-3 col-12 border border-end-0 px-1"
              @click="setcalender(1)"
            >
              <span>دارد</span>
            </div>
          </label>
        </div>
      </div>
      <div v-if="calender === 1">
        <div
          class="d-flex justify-content-between mt-4 pt-1 px-2 col-12 text-center"
        >
          <Calendar
            :date="date"
            class="rounded-5"
            @send-date="handleReceivedDate"
          />

          <p class="py-2 fw-bold text-black data">
            {{ formAnimalHusbandry.InsuranceDate }}:تاریخ بیمه نامه
          </p>
        </div>
        <div
          class="mb-3 px-3 d-flex p-2 col-12 flex-wrap justify-content-center pos"
        >
          <input
            type="text "
            placeholder="تعداد دام بیمه شده"
            style="height: 50px"
            class="form-control input-group text-end col-12 border-1 border-black rounded-3 text-center"
            v-model="formAnimalHusbandry.NumberOfInsuredLivestock"
            inputmode="numeric"
            @input="formAnimalHusbandry.NumberOfInsuredLivestock = convertPersianNumbersToEnglish(formAnimalHusbandry.NumberOfInsuredLivestock)"
          />
        </div>
      </div>
    </div>
    <p
      v-if="errorHusbandry && formAnimalHusbandry.LivestockInsurance === null"
      class="error text-center pt-4"
    >
      بیمه نامه نمی تواند خالی باشد
    </p>

    <!-- button بعدی  -->
    <div class="d-grid col-11 mx-auto mb-5 mt-3">
      <button
        class="btn btn-primary rounded-pill p-3"
        type="button"
        @click="validateRadioSelectionhusbandry"
      >
        بعدی
      </button>
    </div>
  </div>
    <div v-if="loanSurvey == 2">
      <!-- section نوع مالکیت-->
      <div class="flex-column px-1">
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center col-3">نوع مالکیت</strong>
          <hr class="v-divider v-theme--light" />
        </div>

        <div class="middle mb-3 d-flex col-12 font1 fw-bold bg-white px-2 py-2">
          <label class="col-4 p-1">
            <input
              type="radio"
              name="ownership "
              v-model="formAgricultural.OwnerTypeId"
              :value="3"
            />
            <div
              class="front-end boxownership px-2 border border-secondary col-12 rounded-4 py-3"
            >
              <span>شراکتی</span>
            </div>
          </label>

          <label class="col-4 p-1">
            <input
              type="radio"
              name="ownership "
              v-model="formAgricultural.OwnerTypeId"
              :value="2"
            />
            <div
              class="front-end boxownership px-2 border border-secondary col-12 rounded-4 py-3"
            >
              <span> استیجاری</span>
            </div>
          </label>

          <label class="col-4 p-1">
            <input
              type="radio"
              name="ownership "
              v-model="formAgricultural.OwnerTypeId"
              :value="1"
            />

            <div
              class="front-end boxownership px-2 border border-secondary col-12 rounded-4 py-3"
            >
              <span> شخصی </span>
            </div>
          </label>
        </div>
      </div>
      <p
        v-if="errorAgricultural && formAgricultural.OwnerTypeId === null"
        class="error text-center pt-2 pt-4"
      >
        نوع مالکیت را مشخص کنید
      </p>
      <!-- section وضعیت بیمه  -->
      <div class="col col-12 d-flex align-center pt-1 flex-column mb-2">
        <!-- name form -->
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center" style="width: 250px"
            >وضعیت بیمه
          </strong>
          <hr class="v-divider v-theme--light" />
        </div>
        <!-- form لیست بیمه  -->
        <div class="mx-3">
          <div class="d-flex justify-content-center bg-white p-2 pt-3">
            <div class="middle col-9 d-flex mb-3 ms-2 ms-3 mb-3 px-1 col-9">
              <label class="col-6 border">
                <input
                  type="radio"
                  name="Insurance"
                  :value="0"
                  v-model="formAgricultural.insuranceTabAgricultural"
                />
                <div
                  class="back-end boxInsurance col-12 py-2"
                  @click="insuranceTabAgricultura(0)"
                >
                  <span>ندارد</span>
                </div>
              </label>
              <label class="col-6 border border-end-0 col-6">
                <input
                  type="radio"
                  name="Insurance"
                  :value="1"
                  v-model="formAgricultural.insuranceTabAgricultural"
                />
                <div
                  class="front-end boxInsurance col-12 py-2"
                  @click="insuranceTabAgricultura(1)"
                >
                  <span>دارد</span>
                </div>
              </label>
            </div>
            <p class="py-2 col-3 text-center">لیست بیمه</p>
          </div>

          <!-- form نوع بیمه  -->
          <div
            class="d-flex justify-content-center bg-white p-2 col-12"
            v-if="currentTabAgricultura === 1"
          >
            <div
              class="nav nav-pills px-2 col-9"
              id="pills-tab"
              role="tablist "
            >
              <select
                class="form-select form-select-sm form-control input-group border-1 border-black rounded-3 text-start"
                style="height: 45px"
                v-model="formAgricultural.insuranceTypeId"
              >
                <option class="text-end" value="1">تامین اجتماعی</option>
                <option class="text-end" value="2">عشایری</option>
              </select>
            </div>
            <p class="py-2 text-center col-3">نوع بیمه</p>
          </div>

          <!-- form کد کارگاه -->
          <div
            class="d-flex justify-content-center bg-white p-2 col-12 flex-wrap"
            v-if="currentTabAgricultura === 1"
          >
            <div class="px-2 col-9">
              <input
                type="text"
                class="form-control input-group border-1 border-black rounded-3"
                v-model="formAgricultural.workShopCode"
                style="height: 45px"
                inputmode="numeric"
                @input="formAgricultural.workShopCode = convertPersianNumbersToEnglish(formAgricultural.workShopCode)"
              />
            </div>
            <p class="py-2 text-center col-3">کد کارگاه</p>
          </div>

          <!-- form تعداد بیمه شده  -->
          <div
            class="d-flex justify-content-center bg-white p-2 col-12 flex-wrap"
            v-if="currentTabAgricultura === 1"
          >
            <div class="px-2 col-9">
              <input
                type="text"
                class="form-control input-group border-1 border-black rounded-3"
                v-model="formAgricultural.numberOfInsurdPerson"
                inputmode="numeric"
                style="height: 45px"
                @input="formAgricultural.numberOfInsurdPerson = convertPersianNumbersToEnglish(formAgricultural.numberOfInsurdPerson)"
              />
            </div>
            <p
              v-if="
                errorAgricultural1 && formAgricultural.insuranceTypeId === null
              "
              class="error text-center pt-4"
            >
              نوع بیمه نمیتواند خالی باشد
            </p>
            <p class="py-1 text-center col-3">تعداد بیمه شده</p>
          </div>
        </div>
        <p
          v-if="
            errorAgricultural1 && formAgricultural.workShopCode.trim() === ''
          "
          class="error text-center pt-4"
        >
          کد گارگاه نمیتواند خالی باشد
        </p>
        <p
          v-if="
            errorAgricultural1 &&
            formAgricultural.numberOfInsurdPerson.trim() === null
          "
          class="error text-center pt-4"
        >
          تعداد بیمه شده نمیتواند خالی باشد
        </p>
      </div>
      <p
        v-if="
          errorAgricultural && formAgricultural.insuranceTabAgricultural == null
        "
        class="error text-center pt-4"
      >
        وضعیت بیمه نمیتواند خالی باشد
      </p>
      <!-- section  وضعیت اشتغال -->
      <div class="flex-column">
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center col-4"
            >وضعیت اشتغال</strong
          >
          <hr class="v-divider v-theme--light" />
        </div>
        <div
          class="mb-3 px-3 d-flex p-2 col-12 flex-wrap justify-content-center pos"
        >
          <input
            type="text "
            placeholder=" نفر"
            style="height: 50px"
            class="form-control input-group text-end col-12 border-1 border-black rounded-3 text-center"
            v-model="formAgricultural.numberOfJobsCreated"
            inputmode="numeric"
            @input="formAgricultural.numberOfJobsCreated = convertPersianNumbersToEnglish(formAgricultural.numberOfJobsCreated)"
          />
        </div>
      </div>
      <p
        v-if="
          errorAgricultural &&
          formAgricultural.numberOfJobsCreated.trim() === ''
        "
        class="error text-center pt-2 pt-4"
      >
        تعداد افراد شاغل نمی تواند خالی باشد
      </p>

      <div class="flex-column">
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center col-4">نوع محصول</strong>
          <hr class="v-divider v-theme--light" />
        </div>

        <div class="px-3">
          <div
            class="middle col-12 mb-3 d-flex justify-content-center bg-white py-2 px-2 col-md-12 pb-4 pt-2 rounded-4"
          >
            <label class="col-6 px-1">
              <input
                type="radio"
                name="producType"
                :value="2"
                v-model="formAgricultural.ProductTypeId"
              />
              <div
                class="front-end boxPermit rounded-pill p-3 col-12 border border-end-0 px-1"
              >
                <span>باغی</span>
              </div>
            </label>

            <label class="col-6 px-1">
              <input
                type="radio"
                name="producType"
                :value="1"
                v-model="formAgricultural.ProductTypeId"
              />
              <div
                class="back-end boxPermit rounded-pill p-3 col-12 border border-end-0 px-1"
              >
                <span>زراعی</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <p
        v-if="errorAgricultural && formAgricultural.ProductTypeId === null"
        class="error text-center pt-4"
      >
        نوع محصول نمی تواند خالی باشد
      </p>
      <!--    اطلاعت زمین-->
      <div class="flex-column">
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center col-4"
            >اطلاعات زمین</strong
          >
          <hr class="v-divider v-theme--light" />
        </div>
        <div
          class="mb-3 px-3 d-flex p-2 col-12 flex-wrap justify-content-center pos"
        >
          <input
            type="text "
            placeholder=" وسعت زمین"
            style="height: 50px"
            class="form-control input-group text-end col-12 border-1 border-black rounded-3 text-end mt-0 bg-white"
            v-model="formAgricultural.LandArea"
            inputmode="numeric"
            @input="formAgricultural.LandArea = convertPersianNumbersToEnglish(formAgricultural.LandArea)"
          />
          <input
            type="text "
            placeholder="میزان کشت"
            style="height: 50px"
            class="form-control input-group text-end col-12 border-1 border-black rounded-3 text-end mt-3 bg-white"
            v-model="formAgricultural.CultivatedLandArea"
            inputmode="numeric"
            @input="formAgricultural.CultivatedLandArea = convertPersianNumbersToEnglish(formAgricultural.CultivatedLandArea)"
          />
        </div>
      </div>
      <p
        v-if="errorAgricultural && formAgricultural.LandArea.trim() === ''"
        class="error text-center pt-2 pt-4"
      >
        وسعت زمین نمی تواند خالی باشد
      </p>
      <p
        v-if="
          errorAgricultural && formAgricultural.CultivatedLandArea.trim() === ''
        "
        class="error text-center pt-2 pt-4"
      >
        میزان کشت نمیتواند خالی باشد
      </p>
      <p v-if="errorAgricultural3" class="error text-center pt-2 pt-4">
        میزان کشت نمیتواند از وسعت زمین بیشتر باشد
      </p>
      <!-- section  بیمه نامه محصولات-->
      <div class="flex-column">
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center col-4"
            >بیمه محصولات
          </strong>
          <hr class="v-divider v-theme--light" />
        </div>

        <div class="px-3">
          <div
            class="middle col-12 mb-3 d-flex justify-content-center bg-white py-2 px-2 col-md-12 pb-4 pt-2 rounded-4"
          >
            <label class="col-6 px-1">
              <input
                type="radio"
                name="LivestockInsurance"
                :value="true"
                v-model="formAgricultural.HasAgriculturalInsurance"
              />
              <div
                class="front-end boxPermit rounded-pill p-3 col-12 border border-end-0 px-1"
                @click="setCalenderForAgricultural(2)"
              >
                <span>دارد</span>
              </div>
            </label>

            <label class="col-6 px-1">
              <input
                type="radio"
                name="LivestockInsurance"
                :value="false"
                v-model="formAgricultural.HasAgriculturalInsurance"
              />
              <div
                class="back-end boxPermit rounded-pill p-3 col-12 border border-end-0 px-1"
                @click="setCalenderForAgricultural(1)"
              >
                <span>ندارد</span>
              </div>
            </label>
          </div>
        </div>
        <div v-if="AgriculturalCalender === 2">
          <div
            class="d-flex justify-content-between mt-4 pt-1 px-2 col-12 text-center"
          >
            <Calendar
              :date="date"
              class="rounded-5"
              @send-date="handleReceivedDate"
            />

            <p class="py-2 fw-bold text-black data">
              {{ formAgricultural.EndOfAgriculturalInsurance }}:تاریخ بیمه نامه
            </p>
          </div>
        </div>
      </div>
      <p
        v-if="
          errorAgricultural &&
          formAgricultural.HasAgriculturalInsurance === null
        "
        class="error text-center pt-4"
      >
        بیمه نامه نمی تواند خالی باشد
      </p>
      <!-- button بعدی  -->
      <div class="d-grid col-11 mx-auto mb-5 mt-3">
        <button
          class="btn btn-primary rounded-pill p-3"
          type="button"
          @click="validateRadioSelectionAgricultural"
        >
          بعدی
        </button>
      </div>
    </div>
    <div v-if="loanSurvey == 3 || loanSurvey == 4">
      <!-- section  مجوزکار-->
      <div class="flex-column">
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center col-2">مجوز کار</strong>
          <hr class="v-divider v-theme--light" />
        </div>

        <div class="px-3">
          <div
            class="middle col-12 mb-3 d-flex justify-content-center bg-white py-2 px-2 col-md-12 pb-4 pt-2 rounded-4"
          >
            <label class="col-6 px-1">
              <input
                type="radio"
                name="Permit"
                :value="0"
                v-model="form.HasWorkPermission"
              />
              <div
                class="back-end boxPermit rounded-pill p-3 col-12 border border-end-0 px-1"
              >
                <span>ندارد</span>
              </div>
            </label>
            <label class="col-6 px-1">
              <input
                type="radio"
                name="Permit"
                :value="1"
                v-model="form.HasWorkPermission"
              />
              <div
                class="front-end boxPermit rounded-pill p-3 col-12 border border-end-0 px-1"
              >
                <span>دارد</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <p
        v-if="error && form.HasWorkPermission === null"
        class="error text-center pt-4"
      >
        مجوز کار نمی تواند خالی باشد
      </p>
      <!-- section وضعیت بیمه  -->
      <div class="col col-12 d-flex align-center pt-1 flex-column mb-2">
        <!-- name form -->
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center" style="width: 250px"
          >وضعیت بیمه
          </strong>
          <hr class="v-divider v-theme--light" />
        </div>
        <!-- form لیست بیمه  -->
        <div class="mx-3">
          <div class="d-flex justify-content-center bg-white p-2 pt-3">
            <div class="middle col-9 d-flex mb-3 ms-2 ms-3 mb-3 px-1 col-9">
              <label class="col-6 border">
                <input
                  type="radio"
                  name="Insurance"
                  :value="0"
                  v-model="form.modal"
                />
                <div
                  class="back-end boxInsurance col-12 py-2"
                  @click="setCurrentTab(0)"
                >
                  <span>ندارد</span>
                </div>
              </label>

              <label class="col-6 border border-end-0 col-6">
                <input
                  type="radio"
                  name="Insurance"
                  :value="1"
                  v-model="form.modal"
                />
                <div
                  class="front-end boxInsurance col-12 py-2"
                  @click="setCurrentTab(1)"
                >
                  <span>دارد</span>
                </div>
              </label>
            </div>
            <p class="py-2 col-3 text-center">لیست بیمه</p>
          </div>
          <!-- form نوع بیمه  -->
          <div
            class="d-flex justify-content-center bg-white p-2 col-12"
            v-if="currentTab == 1"
          >
            <div
              class="nav nav-pills px-2 col-9"
              id="pills-tab"
              role="tablist "
            >
              <select
                class="form-select form-select-sm form-control input-group border-1 border-black rounded-3 text-start"
                style="height: 45px"
                v-model="form.insuranceTypeId"
              >
                <option class="text-end" value="1">تامین اجتماعی</option>
                <option class="text-end" value="2">عشایری</option>
              </select>
            </div>
            <p class="py-2 text-center col-3">نوع بیمه</p>
          </div>

          <!-- form کد کارگاه -->
          <div
            class="d-flex justify-content-center bg-white p-2 col-12 flex-wrap"
            v-if="currentTab == 1"
          >
            <div class="px-2 col-9">
              <input
                type="text"
                class="form-control input-group border-1 border-black rounded-3"
                v-model="form.workShopCode"
                style="height: 45px"
                inputmode="numeric"
                @input="form.workShopCode = convertPersianNumbersToEnglish(form.workShopCode)"
              />
            </div>
            <p class="py-2 text-center col-3">کد کارگاه</p>
          </div>

          <!-- form تعداد بیمه شده  -->
          <div
            class="d-flex justify-content-center bg-white p-2 col-12 flex-wrap"
            v-if="currentTab == 1"
          >
            <div class="px-2 col-9">
              <input
                type="text"
                class="form-control input-group border-1 border-black rounded-3"
                v-model="form.numberOfInsurdPerson"
                inputmode="numeric"
                style="height: 45px"
                @input="form.numberOfInsurdPerson = convertPersianNumbersToEnglish(form.numberOfInsurdPerson)"
              />
            </div>
            <p
              v-if="error1 && form.insuranceTypeId === null"
              class="error text-center pt-4"
            >
              نوع بیمه نمیتواند خالی باشد
            </p>
            <p class="py-1 text-center col-3">تعداد بیمه شده</p>
          </div>
        </div>
        <p
          v-if="error1 && form.workShopCode == '' "
          class="error text-center pt-4"
        >
          کد گارگاه نمیتواند خالی باشد
        </p>
        <p
          v-if="error1 && form.numberOfInsurdPerson === null"
          class="error text-center pt-4"
        >
          تعداد بیمه شده نمیتواند خالی باشد
        </p>
      </div>
      <p v-if="error && form.modal === null" class="error text-center pt-4">
        وضعیت بیمه نمیتواند خالی باشد
      </p>
      <!-- section  وضعیت اشتغال -->
      <div class="flex-column">
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center col-4"
          >وضعیت اشتغال</strong
          >
          <hr class="v-divider v-theme--light" />
        </div>
        <div
          class="mb-3 px-3 d-flex p-2 col-12 flex-wrap justify-content-center pos"
        >
          <input
            type="text "
            placeholder=" نفر"
            style="height: 50px"
            class="form-control input-group text-end col-12 border-1 border-black rounded-3 text-center"
            v-model="form.numberOfJobsCreated"
            inputmode="numeric"
            @input="form.numberOfJobsCreated = convertPersianNumbersToEnglish(form.numberOfJobsCreated)"
          />
        </div>
        <p
          v-if="error && form.numberOfJobsCreated === ''"
          class="error text-center pt-2 pt-4"
        >
          تعداد افراد شاغل نمی تواند خالی باشد
        </p>

        <p v-if="error2" class="error text-center pt-2 pt-4">
          تعداد بیمه شده نمیتواند بیشتر از اشغال ایجاد شده باشد
        </p>
      </div>
      <!-- section نوع مالکیت-->
      <div class="flex-column px-1">
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center col-3">نوع مالکیت</strong>
          <hr class="v-divider v-theme--light" />
        </div>

        <div class="middle mb-3 d-flex col-12 font1 fw-bold bg-white px-2 py-2">
          <label class="col-4 p-1">
            <input
              type="radio"
              name="ownership "
              v-model="form.OwnerTypeId"
              :value="3"
            />
            <div
              class="front-end boxownership px-2 border border-secondary col-12 rounded-4 py-3"
            >
              <span>شراکتی</span>
            </div>
          </label>

          <label class="col-4 p-1">
            <input
              type="radio"
              name="ownership "
              v-model="form.OwnerTypeId"
              :value="2"
            />
            <div
              class="front-end boxownership px-2 border border-secondary col-12 rounded-4 py-3"
            >
              <span> استیجاری</span>
            </div>
          </label>

          <label class="col-4 p-1">
            <input
              type="radio"
              name="ownership "
              v-model="form.OwnerTypeId"
              :value="1"
            />

            <div
              class="front-end boxownership px-2 border border-secondary col-12 rounded-4 py-3"
            >
              <span> شخصی </span>
            </div>
          </label>
        </div>
      </div>
      <p
        v-if="error && form.OwnerTypeId === null"
        class="error text-center pt-2 pt-4"
      >
        نوع مالکیت را مشخص کنید
      </p>
      <!-- section five  حضور وام گیرنده -->
      <div class="flex-column px-1">
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center col-9 col-lg-5 col-sm-5"
          >حضور وام گیرنده در محل کسب کار</strong
          >
          <hr class="v-divider v-theme--light" />
        </div>

        <div class="middle mb-3 d-flex col-12 font1 fw-bold bg-white px-2 py-2">
          <label class="col-4 p-1">
            <input
              type="radio"
              name="Borrower "
              v-model="form.PresenceTypeId"
              :value="3"
            />
            <div
              class="front-end boxBorrower px-2 border border-secondary col-12 rounded-4 py-3"
            >
              <span>عدم حضور</span>
            </div>
          </label>

          <label class="col-4 p-1">
            <input
              type="radio"
              name="Borrower "
              v-model="form.PresenceTypeId"
              value="2"
            />
            <div
              class="front-end boxBorrower px-2 border border-secondary col-12 rounded-4 py-3"
            >
              <span> موقت</span>
            </div>
          </label>

          <label class="col-4 p-1">
            <input
              type="radio"
              name="Borrower "
              v-model="form.PresenceTypeId"
              value="1"
            />

            <div
              class="front-end boxBorrower px-2 border border-secondary col-12 rounded-4 py-3"
            >
              <span> ثابت </span>
            </div>
          </label>
        </div>
      </div>
      <p
        v-if="error && form.PresenceTypeId === null"
        class="error text-center pt-2 pt-4"
      >
        حضور وام گیرنده را مشخص کنید
      </p>
      <!-- button بعدی  -->
      <div class="d-grid col-11 mx-auto mb-5 mt-3">
        <button
          class="btn btn-primary rounded-pill p-3"
          type="button"
          @click="validateRadioSelection"
        >
          بعدی
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Carddetails from "./CardHeader.vue";
import { ref, defineEmits } from "vue";
import axios from "axios";
import Calendar from "~/pages/componenet/Calendar.vue";


const   currentTab = ref();
const currentTabAgricultura=ref()
const currentTabHusbandry=ref()
const animalsTab = ref(1);
const calender = ref();
const AgriculturalCalender= ref()
const Tab = ref(1);
const emit = defineEmits(["showComponent"]);
const error = ref(false);
const error1 = ref(false);
const error2 = ref(false);
const errorHusbandry = ref(false);
const errorHusbandry2 = ref(false);
const errorHusbandry3 = ref(false);
const errorAgricultural = ref(false);
const errorAgricultural1 = ref(false);
const errorAgricultural2 = ref(false);
const errorAgricultural3 = ref(false);
const model = ref();
const insuranceTab = ref();
const insuranceTabAgricultural = ref();
const router = useRouter();
const SurveyBaseInfo = localStorage.getItem("SurveyBaseInfo");
const animals = JSON.parse(SurveyBaseInfo);
const data = localStorage.getItem("GetCartables");
const dataArray = JSON.parse(data);
const target = router.currentRoute._value.query.cardName;
let customerName = ref("");
const targetObject = dataArray.find((item) => item.id === Number(target));
if (targetObject) {
  customerName = targetObject.survayList[0];
}
const loanSurvey = router.currentRoute._value.query.loanEconomicTypeId;
const completionform = localStorage.getItem("completionform");
const completionForm = completionform ? JSON.parse(completionform) : {};
const GetALLSurveysList = localStorage.getItem("GetSurveysList");
const SurveysList = JSON.parse(GetALLSurveysList);
const LastSurveyIndex = SurveysList.findIndex((item) => item.id === Number(targetObject.loanId));
const LasteSurvey = LastSurveyIndex !== -1 ? SurveysList[LastSurveyIndex] : null;

const form = ref({
  HasWorkPermission: completionForm.hasOwnProperty("HasWorkPermission") ? completionForm.HasWorkPermission : LasteSurvey ? LasteSurvey.hasWorkPermission :null,
  insuranceTypeId: completionForm.hasOwnProperty("insuranceTypeId") ? completionForm.insuranceTypeId : LasteSurvey ? LasteSurvey.insuranceTypeId :null,
  workShopCode: completionForm.hasOwnProperty("workShopCode") ? completionForm.workShopCode :LasteSurvey ? LasteSurvey.workShopCode : "",
  numberOfInsurdPerson: completionForm.hasOwnProperty("numberOfInsurdPerson") ? completionForm.numberOfInsurdPerson :LasteSurvey ? LasteSurvey.numberOfInsurdPerson : null,
  numberOfJobsCreated: completionForm.hasOwnProperty("numberOfJobsCreated") ? completionForm.numberOfJobsCreated :LasteSurvey ? LasteSurvey.numberOfJobsCreated: "",
  OwnerTypeId: completionForm.hasOwnProperty("OwnerTypeId") ? completionForm.OwnerTypeId :LasteSurvey ? LasteSurvey.ownerTypeId : null,
  PresenceTypeId: completionForm.hasOwnProperty("PresenceTypeId") ? completionForm.PresenceTypeId :LasteSurvey ? LasteSurvey.presenceTypeId : null,
  modal: completionForm.hasOwnProperty("modal") ? completionForm.modal :LasteSurvey ?  LasteSurvey.numberOfJobsCreated==0?0:1:null,});



const setCurrentTab = (tabNumber) => {
  currentTab.value = tabNumber;


};

setCurrentTab(form.value.modal)

console.log(LasteSurvey)


const validateRadioSelection = () => {
  if (
    form.value.HasWorkPermission === null ||
    form.value.OwnerTypeId === null ||
    form.value.PresenceTypeId === null ||
    form.value.modal === null ||
    form.value.numberOfJobsCreated === ""
  ) {
    error.value = true;
    setTimeout(() => {
      error.value = false;
    }, 2000);
  } else {
    if (form.value.modal == 1) {
      if (
        form.value.numberOfInsurdPerson === null ||
        form.value.workShopCode === "" ||
        form.value.insuranceTypeId === null
      ) {
        error1.value = true;
        setTimeout(() => {
          error1.value = false;
        }, 2000);
      } else {
        if (form.value.numberOfInsurdPerson > form.value.numberOfJobsCreated) {
          setTimeout(() => {
            error2.value = false;
          }, 2000);
          error2.value = true;
        } else {
          error2.value = false;
          emit("showComponent", 2, form);
          localStorage.setItem("completionform", JSON.stringify(form.value));
        }
      }
    } else {
      error.value = false;
      emit("showComponent", 2, form);
      localStorage.setItem("completionform", JSON.stringify(form.value));
    }
  }
};

const LiveStock = localStorage.getItem("LiveStock");
const LiveStockInFormation = LiveStock ? JSON.parse(LiveStock) : {};


const formAnimalHusbandry = ref({
  NumberOfMaleLivestock: LiveStockInFormation.hasOwnProperty("NumberOfMaleLivestock") ? LiveStockInFormation.NumberOfMaleLivestock : LasteSurvey ? LasteSurvey.numberOfMaleLivestock   : "",
  NumberOfFemaleLivestock: LiveStockInFormation.hasOwnProperty("NumberOfFemaleLivestock") ? LiveStockInFormation.NumberOfFemaleLivestock : LasteSurvey ? LasteSurvey.numberOfFemaleLivestock : "",
  LivestockTypeId: LiveStockInFormation.hasOwnProperty("LivestockTypeId") ? LiveStockInFormation.LivestockTypeId : LasteSurvey ? LasteSurvey.livestockTypeId : "",
  ID: LiveStockInFormation.hasOwnProperty("ID") ? LiveStockInFormation.ID: LasteSurvey ? LasteSurvey.ID : 0,
  SurveyId: LiveStockInFormation.hasOwnProperty("SurveyId") ? LiveStockInFormation.SurveyId : LasteSurvey ? LasteSurvey.SurveyId : 1,
  LivestockBooklet: LiveStockInFormation.hasOwnProperty("LivestockBooklet") ? LiveStockInFormation.LivestockBooklet : LasteSurvey ? LasteSurvey.livestockBooklet : null,
  LivestockLicense: LiveStockInFormation.hasOwnProperty("LivestockLicense") ? LiveStockInFormation.LivestockLicense : LasteSurvey ? LasteSurvey.livestockLicense : null,
  LivestockInsurance: LiveStockInFormation.hasOwnProperty("LivestockInsurance") ? LiveStockInFormation.LivestockInsurance : LasteSurvey ? LasteSurvey.livestockInsurance : null,
  InsuranceDate: LiveStockInFormation.hasOwnProperty("InsuranceDate") ? LiveStockInFormation.InsuranceDate : LasteSurvey ? LasteSurvey.InsuranceDate : null,
  NumberOfInsuredLivestock: LiveStockInFormation.hasOwnProperty("NumberOfInsuredLivestock") ? LiveStockInFormation.NumberOfInsuredLivestock : LasteSurvey ? LasteSurvey.hasWorkPermission : null,
  workShopCode: LiveStockInFormation.hasOwnProperty("workShopCode") ? LiveStockInFormation.workShopCode : LasteSurvey ? LasteSurvey.workShopCode : "",
  insuranceTypeId: LiveStockInFormation.hasOwnProperty("insuranceTypeId") ? LiveStockInFormation.insuranceTypeId : LasteSurvey ? LasteSurvey.insuranceTypeId : null,
  numberOfJobsCreated: LiveStockInFormation.hasOwnProperty("numberOfJobsCreated") ? LiveStockInFormation.numberOfJobsCreated : LasteSurvey ? LasteSurvey.numberOfJobsCreated : "",
  numberOfInsurdPerson: LiveStockInFormation.hasOwnProperty("numberOfInsurdPerson") ? LiveStockInFormation.numberOfInsurdPerson : LasteSurvey ? LasteSurvey.numberOfInsurdPerson : "",
  insuranceTab: LiveStockInFormation.hasOwnProperty("insuranceTab") ? LiveStockInFormation.insuranceTab : LasteSurvey ? LasteSurvey.numberOfJobsCreated==0?0:1: null,
});

const setcalender = (tabNumber) => {
  calender.value = tabNumber;
};

setcalender(formAnimalHusbandry.value.LivestockInsurance)


const setanimalsTab = (tabNumber) => {
  animalsTab.value = tabNumber;
};

const insuranceTabHusbandry = (tabNumber) => {
  currentTabHusbandry.value = tabNumber;
};
insuranceTabHusbandry(formAnimalHusbandry.value.insuranceTab)


const validateRadioSelectionhusbandry = () => {
  if (
    formAnimalHusbandry.value.LivestockTypeId === "" ||
    formAnimalHusbandry.value.LivestockBooklet === null ||
    formAnimalHusbandry.value.LivestockLicense === null ||
    formAnimalHusbandry.value.LivestockInsurance === null ||
    formAnimalHusbandry.value.numberOfJobsCreated === "" ||
    formAnimalHusbandry.value.insuranceTab === null
  ) {
    errorHusbandry.value = true;
    setTimeout(() => {
      errorHusbandry.value = false;
    }, 2000);
  } else {
    if (formAnimalHusbandry.value.insuranceTab.value === 1) {
      if (
        formAnimalHusbandry.value.numberOfInsurdPerson === "" ||
        formAnimalHusbandry.value.workShopCode === "" ||
        formAnimalHusbandry.value.insuranceTypeId === null
      ) {
        errorHusbandry2.value = true;
        setTimeout(() => {
          errorHusbandry.value = false;
        }, 2000);
      }
    } else {
      if (
        formAnimalHusbandry.value.livestockType === 2 &&
        formAnimalHusbandry.value.NumberOfMaleLivestock.trim() === ""
      ) {
        errorHusbandry3.value = true;
        setTimeout(() => {
          errorHusbandry3.value = false;
        }, 2000);
      } else if (
        formAnimalHusbandry.value.livestockType === 3 &&
        formAnimalHusbandry.value.LivestockTypeId.trim() === ""
      ) {
        errorHusbandry3.value = true;
        setTimeout(() => {
          errorHusbandry3.value = false;
        }, 2000);
      } else if (
        formAnimalHusbandry.value.livestockType === 1 &&
        formAnimalHusbandry.value.NumberOfMaleLivestock.trim() === ""
      ) {
        errorHusbandry3.value = true;
        setTimeout(() => {
          errorHusbandry3.value = false;
        }, 2000);
      } else if (
        [4, 5, 6, 7, 8, 9].includes(formAnimalHusbandry.value.livestockType) &&
        formAnimalHusbandry.value.LivestockTypeId === ""
      ) {
        errorHusbandry3.value = true;
        setTimeout(() => {
          errorHusbandry3.value = false;
        }, 2000);
      } else {
        if (formAnimalHusbandry.value.livestockType === 2) {
          formAnimalHusbandry.value.LivestockTypeId = 0;
          emit("showComponent", 2, formAnimalHusbandry);
          localStorage.setItem(
            "LiveStock",
            JSON.stringify(formAnimalHusbandry.value)
          );
        } else if (formAnimalHusbandry.value.livestockType === 3) {
          formAnimalHusbandry.value.NumberOfMaleLivestock = 0;
          emit("showComponent", 2, formAnimalHusbandry);
          localStorage.setItem(
            "LiveStock",
            JSON.stringify(formAnimalHusbandry.value)
          );
        } else if (formAnimalHusbandry.value.livestockType === 1) {
          localStorage.setItem(
            "LiveStock",
            JSON.stringify(formAnimalHusbandry.value)
          );
          formAnimalHusbandry.value.LivestockTypeId = 0;
          emit("showComponent", 2, formAnimalHusbandry);
          localStorage.setItem(
            "LiveStock",
            JSON.stringify(formAnimalHusbandry.value)
          );
        } else if (
          [4, 5, 6, 7, 8, 9].includes(formAnimalHusbandry.value.livestockType)
        ) {
          formAnimalHusbandry.value.NumberOfMaleLivestock = 0;
          emit("showComponent", 2, formAnimalHusbandry);
          localStorage.setItem(
            "LiveStock",
            JSON.stringify(formAnimalHusbandry.value)
          );
        } else {
          emit("showComponent", 2, formAnimalHusbandry);
          localStorage.setItem(
            "LiveStock",
            JSON.stringify(formAnimalHusbandry.value)
          );
        }
      }
    }
  }
};

const gardenig = localStorage.getItem("gardenig");
const gardenigInFormation = gardenig ? JSON.parse(gardenig) : {};
const formAgricultural = ref({
  Id: gardenigInFormation.hasOwnProperty("Id") ? gardenigInFormation.Id : LasteSurvey ? LasteSurvey.Id : 0,
  SurveyId: gardenigInFormation.hasOwnProperty("SurveyId") ? gardenigInFormation.SurveyId : LasteSurvey ? LasteSurvey.SurveyId : 0,
  OwnerTypeId: gardenigInFormation.hasOwnProperty("OwnerTypeId") ? gardenigInFormation.OwnerTypeId : LasteSurvey ? LasteSurvey.ownerTypeId : null,
  ProductTypeId: gardenigInFormation.hasOwnProperty("ProductTypeId") ? gardenigInFormation.ProductTypeId : LasteSurvey ? LasteSurvey.productTypeId : null,
  LandArea: gardenigInFormation.hasOwnProperty("LandArea") ? gardenigInFormation.LandArea : LasteSurvey ? LasteSurvey.landArea : "",
  CultivatedLandArea: gardenigInFormation.hasOwnProperty("CultivatedLandArea") ? gardenigInFormation.CultivatedLandArea : LasteSurvey ? LasteSurvey.cultivatedLandArea : "",
  HasAgriculturalInsurance: gardenigInFormation.hasOwnProperty("HasAgriculturalInsurance") ? gardenigInFormation.HasAgriculturalInsurance : LasteSurvey ? LasteSurvey.hasAgriculturalInsurance : null,
  EndOfAgriculturalInsurance: gardenigInFormation.hasOwnProperty("EndOfAgriculturalInsurance") ? gardenigInFormation.EndOfAgriculturalInsurance : LasteSurvey ? LasteSurvey.EndOfAgriculturalInsurance : null,
  insuranceTypeId: gardenigInFormation.hasOwnProperty("insuranceTypeId") ? gardenigInFormation.insuranceTypeId : LasteSurvey ? LasteSurvey.insuranceTypeId : null,
  workShopCode: gardenigInFormation.hasOwnProperty("workShopCode") ? gardenigInFormation.workShopCode : LasteSurvey ? LasteSurvey.workShopCode : "",
  numberOfInsurdPerson: gardenigInFormation.hasOwnProperty("numberOfInsurdPerson") ? gardenigInFormation.numberOfInsurdPerson : LasteSurvey ? LasteSurvey.numberOfInsurdPerson : "",
  numberOfJobsCreated: gardenigInFormation.hasOwnProperty("numberOfJobsCreated") ? gardenigInFormation.numberOfJobsCreated : LasteSurvey ? LasteSurvey.numberOfJobsCreated : "",
  insuranceTabAgricultural: gardenigInFormation.hasOwnProperty("insuranceTabAgricultural") ? gardenigInFormation.insuranceTabAgricultural : LasteSurvey ? LasteSurvey.numberOfJobsCreated==0?0:1: null,
});
const insuranceTabAgricultura = (tabNumber) => {
  currentTabAgricultura.value = tabNumber;
};
insuranceTabAgricultura(formAgricultural.value.insuranceTabAgricultural)

const setCalenderForAgricultural = (tabNumber) => {
  AgriculturalCalender.value = tabNumber;
};
setCalenderForAgricultural(formAgricultural.value.HasAgriculturalInsurance)


const validateRadioSelectionAgricultural = () => {
  if (
    formAgricultural.value.OwnerTypeId === null ||
    formAgricultural.value.numberOfJobsCreated === "" ||
    formAgricultural.value.HasAgriculturalInsurance === null ||
    formAgricultural.value.CultivatedLandArea === "" ||
    formAgricultural.value.LandArea === "" ||
    formAgricultural.value.ProductTypeId === null ||
    formAgricultural.value.insuranceTabAgricultural === null
  ) {
    errorAgricultural.value = true;
    setTimeout(() => {
      errorAgricultural.value = false;
    }, 2000);
  } else {
    if (formAgricultural.value.insuranceTabAgricultural === 1) {
      if (
        formAgricultural.value.numberOfInsurdPerson === "" ||
        formAgricultural.value.workShopCode === "" ||
        formAgricultural.value.insuranceTypeId === null
      ) {
        errorAgricultural1.value = true;
        setTimeout(() => {
          errorAgricultural1.value = false;
        }, 2000);
      } else {
      }
    } else {
      if (
        formAgricultural.value.CultivatedLandArea >
        formAgricultural.value.LandArea
      ) {
        setTimeout(() => {
          errorAgricultural3.value = false;
        }, 2000);
        errorAgricultural3.value = true;
      } else {
        errorAgricultural2.value = false;
        emit("showComponent", 2, formAgricultural);
        localStorage.setItem(
          "gardenig",
          JSON.stringify(formAgricultural.value)
        );
      }
    }
  }
};

const date = ref("");
const handleReceivedDate = (moz) => {
  formAgricultural.value.EndOfAgriculturalInsurance = moz;
  formAnimalHusbandry.value.InsuranceDate = moz;
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

<style lang="scss">
.font {
  font-size: 0.6rem;
}

.v-divider {
  display: block;
  flex: 1 1 100%;
  height: 0px;
  max-height: 0px;
  opacity: var(--v-border-opacity);
  transition: inherit;
  border-style: solid;
  border-width: thin 0 0 0;
}

$font: "Inter", sans-serif;
$white: #fff;
$green: #fca40f;

.middle {
  text-align: center;
  flex-wrap: wrap;

  h1 {
    font-family: $font;
    color: $white;
  }

  input[type="radio"] {
    display: none;

    &:checked {
      + .boxPermit {
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

      + .boxInsurance {
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

      + .boxownership {
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

      + .boxBorrower {
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

  .boxownership {
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

  .boxPermit {
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

  .boxInsurance {
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

  .boxBorrower {
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

.error {
  position: fixed;
  bottom: 0;
  padding: 13px;
  width: 100%;
  margin-bottom: 0; /* این خط اضافه شده */
  z-index: 999;
  animation: moveUp 1s forwards;
  background-color: #fca40f;
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
