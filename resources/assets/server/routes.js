module.exports = router => {
    router.get('/', async ({ db }) => {
        const tmpConnection = await db();
        const layoutsConnection = await db('_global', true);

        return [
            tmpConnection.data,
            layoutsConnection.data
        ];
    });
};
