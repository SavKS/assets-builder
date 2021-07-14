export const form = {
    methods: {
        formHandleChange(e) {
            this.$thisForm('data')[ e.target.name ] = e.target.value;
        },
        formHandleMaskedChange(value, name) {
            this.$thisForm('data')[ name ] = value;
        }
    }
};

export const formField = {
    data() {
        return {
            fillStatus: false,
            hover: false
        };
    },
    props: {
        forceFill: {
            default: false
        }
    },
    methods: {
        handleInput(e) {
            this.$emit('input', e);
        },

        toggleHover(flag = false) {
            this.$data.hover = flag;
        },

        toggleFocus(flag = false) {
            this.$data.fillStatus = flag;
        },

        isFill() {
            return this.$props.forceFill
                || (this.$props.value && this.$props.value.length)
                || this.fillStatus;
        }
    },
    computed: {
        errorsText() {
            return this.$props.errors ? this.$props.errors.join('. ') : false;
        }
    }
};
