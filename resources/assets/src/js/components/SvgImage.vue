<template>
    <svg :class="className"
         :width="width"
         :height="height"
         :view-box.camel="viewBox"
         v-html="content"
         xmlns="http://www.w3.org/2000/svg"
         @click="handleClick">
    </svg>
</template>

<script>
    export default {
        props: {
            data: {
                required: true,
                type: Object
            }
        },
        computed: {
            className() {
                return {
                    [this.$props.data.attributes.class]: true
                };
            },
            width() {
                return this.$props.data.attributes.width;
            },
            height() {
                return this.$props.data.attributes.height;
            },
            viewBox() {
                return this.$props.data.attributes.viewBox;
            },
            content() {
                return this.$props.data.content;
            }
        },
        methods: {
            handleClick($event) {
                this.$emit('click', $event);
            }
        }
    }
</script>
