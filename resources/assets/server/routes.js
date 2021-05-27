module.exports = router => {
    router.get('/cart', async ({ db }) => {
        const connection = await db();

        // connection.data = {y: 1};
        //
        // await connection.write();

        const connection1 = await db('_global', true);

        return [
            connection.data,
            connection1.data
        ];
    });
};
