export default {
    methods: {
        formHandleChange(e) {
            this.formData[e.target.name] = e.target.value;
        },
    },
    computed: {
        formData() {
            return this.$forms[this.formName].data;
        },
        formErrors() {
            return this.$forms[this.formName].errors;
        },
        formName() {
            if (typeof this.$options.form === 'undefined') {
                throw new Error('Form name not defined');
            }

            return this.$options.form;
        },
        currentForm() {
            return this.$forms[this.formName];
        }
    }
};
