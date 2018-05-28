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
                    [this.iconData.attributes.class]: true
                };
            },
            width() {
                return this.iconData.attributes.width;
            },
            height() {
                return this.iconData.attributes.height;
            },
            viewBox() {
                return this.iconData.attributes.viewBox;
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
