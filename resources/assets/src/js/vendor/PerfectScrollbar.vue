<template>
    <div :class="$helpers.classBuilder(className)" @mouseover.once="update">
        <slot></slot>
    </div>
</template>

<script>
    import PerfectScrollbar from 'perfect-scrollbar';

    export default {
        data: () => {
            return {
                scrollBar: null
            }
        },
        props: {
            domElType: {
                type: String,
                default: 'div'
            },
            className: {
                type: String,
                default: 'ps-container'
            },
            settings: {
                default: undefined
            },
            swicher: {
                type: Boolean,
                default: true,
            }
        },
        methods: {
            scrollHandle(evt) {
                this.$emit(evt.type, evt)
            },

            update() {
                this.$data.scrollBar.update(this.$el)
            },

            __init() {
                if (this.swicher) {
                    if (!this._ps_inited) {
                        this._ps_inited = true
                        this.$data.scrollBar = new PerfectScrollbar(this.$el, this.settings);
                    } else {
                        this.update(this.$el)
                    }
                }
            },

            __uninit() {
                this.$data.scrollBar.destroy(this.$el)
                this._ps_inited = false
            },
        },

        watch: {
            swicher(val) {
                if (val && !this._ps_inited) {
                    this.__init()
                }
                if (!val && this._ps_inited) {
                    this.__uninit()
                }
            },

            $route() {
                this.update()
            },

        },

        mounted() {
            // debugger
            this.__init()
        },

        updated() {
            this.$nextTick(this.update)
        },

        activated() {
            this.__init()
        },

        deactivated() {
            this.__uninit()
        },

        beforeDestroy() {
            this.__uninit()
        },
    }
</script>

<style scoped>
    .ps-container {
        position: relative;
    }
</style>
