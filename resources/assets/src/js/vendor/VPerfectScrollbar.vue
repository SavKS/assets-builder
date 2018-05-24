<template>
    <div
        class="ps-container"
        @mouseover.once="update">
        <slot />
    </div>
</template>

<script>
    import PerfectScrollbar from 'perfect-scrollbar';

    export default {
        props: {
            domElType: {
                type: String,
                default: 'div'
            },
            settings: {
                type: Object,
                default: () => {}
            },
            switcher: {
                type: Boolean,
                default: true
            }
        },
        data: () => {
            return {
                scrollBar: null
            };
        },

        watch: {
            switcher(val) {
                if (val && !this._ps_inited) {
                    this.__init();
                }
                if (!val && this._ps_inited) {
                    this.__uninit();
                }
            },

            $route() {
                this.update();
            }

        },

        mounted() {
            // debugger
            this.__init();
        },

        updated() {
            this.$nextTick(this.update);
        },

        activated() {
            this.__init();
        },

        deactivated() {
            this.__uninit();
        },

        beforeDestroy() {
            this.__uninit();
        },
        methods: {
            scrollHandle(evt) {
                this.$emit(evt.type, evt);
            },

            update() {
                this.$data.scrollBar.update(this.$el);
            },

            __init() {
                if (this.switcher) {
                    if (!this._ps_inited) {
                        this._ps_inited = true;
                        this.$data.scrollBar = new PerfectScrollbar(this.$el, this.settings);
                    } else {
                        this.update(this.$el);
                    }
                }
            },

            __uninit() {
                this.$data.scrollBar.destroy(this.$el);
                this._ps_inited = false;
            }
        }
    };
</script>

<style scoped>
    .ps-container {
        position: relative;
    }
</style>
