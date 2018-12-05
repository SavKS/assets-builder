<template>
    <div class="form-group">
        <input
            :id="fieldId"
            :type="type"
            :value="value"
            :class="{ 'is-invalid': errors }"
            :name="name"
            class="form-control form-control-lg"
            @input="handleInput"
        >

        <div
            v-if="errors"
            class="invalid-feedback"
        >
            {{ errors }}
        </div>
        <label
            v-if="label"
            :for="fieldId"
            class="form-group-label"
        >{{ label }}</label>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: null
            },
            name: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            },
            value: {
                required: true,
                default: ''
            },
            errors: {
                type: String,
                default: null
            }
        },
        computed: {
            fieldId() {
                return this.$props.id || this.$props.name;
            }
        },
        methods: {
            handleInput(e) {
                this.$emit('input', e.target.value);
            }
        }
    };
</script>
