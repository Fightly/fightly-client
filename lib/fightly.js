import EntityManager from 'ensy';
import EventEmitter from 'events';

import ActionsFactory from './actions';
import Engine from './engine';
import Network from './network';

function createApplication() {
    var emitter = new EventEmitter();
    var network = new Network(emitter);
    var engine = new Engine(emitter, network);
    var manager = new EntityManager();
    var actions = ActionsFactory(network);

    emitter.manager = manager;
    emitter.network = network;
    emitter.actions = actions;

    Object.defineProperty(emitter, 'games', {
        get: function () {
            return engine.games;
        }
    });

    return emitter;
}

export default createApplication;
