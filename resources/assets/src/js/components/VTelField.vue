<template>
    <div class="form-group">
        <masked-input
            :id="fieldId"
            :value="value"
            :name="name"
            :placeholder="placeholder"
            :class="{'is-invalid': errors}"
            :guide="false"
            :mask="[ '+', '3', '8', ' ', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/ ]"
            type="tel"
            class="form-control form-control-lg"
            @input="handleInput"
        />

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
    import MaskedInput from 'vue-text-mask';
    import VField from './VField';

    export default {
        components: {
            MaskedInput
        },
        mixins: [ VField ],
        methods: {
            handleInput(value) {
                this.$emit('input', value);
            }
        }
    };
</script>
