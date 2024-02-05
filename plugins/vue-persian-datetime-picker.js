import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
const app = createApp({})
app.use(Vue3PersianDatetimePicker, {
    name: 'custom-date-picker',
    props: {
        format: 'YYYY-MM-DD HH:mm',
        displayFormat: 'jYYYY-jMM-jDD',
        editable: true,
        inputClass: 'form-control my-custom-class-name',
        placeholder: 'Please select a date',
        altFormat: 'jYYYY/jMM/jDD',
        color: '#6400c1',
        autoSubmit: false,
    }
})
