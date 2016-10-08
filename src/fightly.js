import EntityManager from 'ensy';
import EventEmitter from 'events';

import Engine from './engine';
import Network from './network';

function createApplication(modules) {
    var emitter = new EventEmitter();
    var network = new Network(emitter);
    var manager = new EntityManager();
    var engine = new Engine(emitter, network, manager, modules);

    emitter.manager = manager;
    emitter.network = network;
    emitter.actions = {};

    Object.defineProperty(emitter, 'games', {
        get: function () {
            return engine.games;
        }
    });

    return emitter;
}

export default createApplication;
