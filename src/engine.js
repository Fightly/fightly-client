import EventEmitter from 'events';

import ActionsFactory from './actions';


class Engine extends EventEmitter {
    constructor(emitter, network, manager, modules) {
        super();

        this.emitter = emitter;
        this.manager = manager;
        this.network = network;
        this._available_modules = modules;

        this._modules = [];
        this._components = [];
        this._processors = [];
        this._actions = [];

        this.games = [];

        this._setEventListeners();
    }

    _setEventListeners() {
        this.emitter.on('connection', () => {
            this.network.emit('request', { type: 'modules' });
            this.network.emit('request', { type: 'games' });
        });

        this.emitter.on('data', (data) => {
            console.log('received data');
            console.log(data);
            switch (data.type) {
                case 'modules':
                    console.log('Modules list received');
                    this.loadModules(data.data);
                    this.emitter.emit('ready');
                    break;
                case 'games':
                    console.log('Games list received');
                    this.games = data.data;
                    break;
            }
        });

        this.emitter.on('gameJoined', (data) => {
            console.log('Game joined!');
        });
    }

    loadModules(modules) {
        let actions = {};

        console.log('Loading modules...');
        console.log(modules);
        modules.forEach(name => {
            let module = this._available_modules[name];
            this._modules.push(name);

            console.log(module);

            module.components.forEach(comp => this.manager.addComponent(comp.name, comp));
            actions[name] = module.actions;
        });

        this.emitter.actions = ActionsFactory(this.network, actions);
    }
}

export default Engine;
