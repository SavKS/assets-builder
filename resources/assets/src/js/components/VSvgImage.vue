<template>
    <svg :class="className"
         :width="width"
         :height="height"
         :view-box.camel="viewBox"
         xmlns="http://www.w3.org/2000/svg"
         @click="handleClick"
         v-html="content" />
</template>

<script>
    export default {
        props: {
            icon: {
                type: String,
                default: null
            },
            data: {
                type: Object,
                default: null
            }
        },
        computed: {
            iconData() {
                return this.$props.data || this.$helpers.icon(this.$props.icon);
            },

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
                return this.iconData.content;
            }
        },
        methods: {
            handleClick($event) {
                this.$emit('click', $event);
            }
        }
    }
</script>
