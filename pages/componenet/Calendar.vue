<template>
  <button type="button" class="btn btn-primary btn btn-primary rounded-5 data" @click="show = true">
    انتخاب تاریخ
  </button>

  <div>
    <date-picker
        v-model="cal"
        :show="show"
        :editable="true"
        format="YYYY-MM-DD"
        display-format="jYYYY/jMM/jDD"
        custom-input="#my-custom-editable-input"
        @close="show=false"
    />

  </div>
</template>

<script>
import DatePicker from 'vue3-persian-datetime-picker';

export default {
  props: ['date'],
  data() {
    return {
      cal: '',
      show: false
    }
  },
  components: {
    DatePicker
  },
  methods: {
    sendDateToOtherComponent() {
      this.$emit('send-date', this.cal);
    }
  },
  mounted() {

    this.cal = this.date;
  },
  watch: {
    cal(newCal, oldCal) {

      this.$emit('send-date', newCal);
    }
  }
};
</script>

