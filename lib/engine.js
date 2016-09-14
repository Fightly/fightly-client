import EventEmitter from 'events';


class Engine extends EventEmitter {
    constructor(emitter, network) {
        super();

        this.emitter = emitter;
        this.network = network;

        this.games = [];

        this._setEventListeners();
    }

    _setEventListeners() {
        this.emitter.on('connection', () => {
            this.network.emit('request', { type: 'modules' });
            this.network.emit('request', { type: 'games' });
            this.emitter.emit('ready');
        });

        this.emitter.on('data', (data) => {
            console.log('received data');
            console.log(data);
            switch (data.type) {
                case 'modules':
                    console.log('Modules list received');
                    this.loadModules(data.data);
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
        modules.forEach(module => {
            // download the module's files
            //require()
        })
    }
}

export default Engine;
