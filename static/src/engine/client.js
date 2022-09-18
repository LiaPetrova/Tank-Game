/* globals.io */

export async function connect(username, roomId, player) {
    return new Promise((resolve, reject) => {
        const socket = io.connect();

        const client = {
            position(player) {
                socket.emit('position', player);
            },
            onPlayerJoined() {},
            onPlayerLeft() {}
        }

        socket.on('connect', () => {
            console.log('connected');
            resolve(client);
        });

        socket.emit('join', {
            username,
            roomId, 
            player
        });

        socket.on('playerJoined', data => client.onPlayerJoined(data));
        socket.on('playerLeft', data => client.onPlayerLeft(data))
    });
}