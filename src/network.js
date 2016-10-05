class Network {
    constructor(listener) {
        this.listener = listener;

        var socket = io();

        socket.on('connect_failed', function () {
            console.log('ERROR - Connection to the server failed');
        });
        socket.on('connect', this.onConnect.bind(this));
        socket.on('disconnect', this.onDisconnect.bind(this));

        socket.on('data', this.onData.bind(this));
        socket.on('gameJoined', this.onGameJoined.bind(this));

        this._socket = socket;
    }

    emit(type, data) {
        data = JSON.stringify(data);
        this._socket.emit(type, data);
    }

    onConnect() {
        console.log('Connected to the server');
        this.listener.emit('connection');
    }

    onData(data) {
        console.log('Received data');
        this.listener.emit('data', JSON.parse(data));
    }

    onGameJoined(data) {
        console.log('Received gameJoined');
        this.listener.emit('gameJoined', JSON.parse(data));
    }

    onDisconnect() {
        console.log('Disconnected from the server');
        this.listener.emit('disconnection');
    }
}

export default Network;
