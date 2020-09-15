<script>
    import uuidV4 from 'uuid/v4';

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
                type: String,
                default: () => uuidV4()
            },
            data: {
                type: Object,
                default: null
            },
            mode: {
                type: String,
                default: null
            }
        },
        computed: {
            model() {
                return this.$thisForm();
            }
        },
        beforeMount() {
            if (this.$props.data) {
                this.setData(this.$props.data);
            }
        },
        methods: {
            setData(data) {
                return this.model.setData(data || {});
            },

            restore() {
                return this.model.restore();
            },

            reset() {
                return this.model.reset();
            },

            async submit() {
                this.$emit('submit', this.model);
            }
        },
        render() {
            return this.$scopedSlots.default({
                form: this.model,
                submit: this.submit
            });
        }
    };
</script>
