function createActions(network, modulesActions) {
    function action(data) {
        network.emit('action', data)
    }

    let actions = {};

    Object.keys(modulesActions).forEach(namespace => {
        actions[namespace] = {};
        Object.keys(modulesActions[namespace]).forEach(actionName => {
            actions[namespace][actionName] = function () {
                action({
                    type: `${namespace}.${actionName}`,
                    params: [...arguments],
                });
            };
        });
    });

    actions.core = {
        createGame: function () {
            action({
                type: 'core.createGame',
                params: [],
            });
        },
        joinGame: function (gameId) {
            action({
                type: 'core.joinGame',
                params: [gameId],
            });
        },
    };

    return actions;
}

export default createActions;
