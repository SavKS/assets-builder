<script>
    import { v4 as uuidV4 } from 'uuid';

    export default {
        provide() {
            return {
                vForm: this,
                $form: this.model
            };
        },
        form: {
            current() {
                return this.$props.name;
            },
            clearable: true
        },
        props: {
            name: {
                required: true,
                type: String
            },
            data: {
                type: Object,
                default: null
            },
            mode: {
                type: String,
                default: null
            },
            forceDisabled: {
                type: Boolean,
                default: null
            }
        },
        computed: {
            model: self => self.$thisForm(),

            disabled: self => self.$props.forceDisabled !== null ?
                self.$props.forceDisabled || self.model.processing :
                self.model.processing
        },
        beforeMount() {
            if (this.$props.data) {
                this.setData(this.$props.data);
            }
        },
        methods: {
            setData(data, remember = true) {
                return this.model.setData(data || {}, remember);
            },

            restore() {
                return this.model.restore();
            },

            reset() {
                return this.model.reset();
            },

            async submit() {
                this.$emit('submit', this.model);
            },

            isMode(mode) {
                if (this.$props.mode === null) {
                    throw new Error('Mode not defined');
                }

                return this.$props.mode === mode;
            }
        },
        render() {
            return this.$scopedSlots.default({
                vForm: this,
                $form: this.model,
                submit: this.submit
            });
        }
    };
</script>
