function createActions(network) {
    function action(data) {
        network.emit('action', data)
    }

    return {
        createGame: function () {
            action({
                type: 'createGame',
            });
        },
        joinGame: function (game) {
            action({
                type: 'joinGame',
                game,
            });
        },
    };
}

export default createActions;
