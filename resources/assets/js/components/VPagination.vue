<template>
    <nav
        v-if="data.pages.last > 1"
        aria-label="Page navigation"
        class="text-center"
    >
        <ul class="pagination justify-content-center">

            <!-- Previous Page Link -->
            <li
                :class="{disabled: data.pages.current === 1}"
                class="page-item page-prev"
            >
                <a
                    :href="data.links.prev"
                    class="page-link"
                    @click.prevent="fetch(1)"
                >
                    <span>{{ $t('Назад') }}</span>
                </a>
            </li>

            <template v-for="(item, index) in data.items">
                <li
                    v-if="typeof item === 'string'"
                    :key="`${item}-${index}`"
                    class="page-item"
                >
                    <span class="page-link page-divider">...</span>
                </li>

                <template
                    v-for="page in item"
                    v-else
                >
                    <li
                        :key="page.page"
                        :class="{active: data.pages.current === page.page}"
                        class="page-item"
                        @click.prevent="fetch(page.page)"
                    >
                        <a
                            :href="page.url"
                            class="page-link"
                        >{{ page.page }}</a>
                    </li>
                </template>
            </template>

            <!-- Next Page Link -->
            <li
                :class="{disabled: data.pages.current === data.pages.last}"
                class="page-item page-prev"
            >
                <a
                    :href="data.links.next"
                    class="page-link"
                    @click.prevent="fetch(data.pages.last)"
                >
                    <span>{{ $t('Вперед') }}</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            data: {
                required: true,
                type: Object
            }
        },
        methods: {
            fetch(page) {
                if (page === this.$props.data.pages.current) {
                    return;
                }

                this.$emit('change', page);
            }
        }
    };
</script>
