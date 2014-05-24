var socket = require("socket.io");
var sockets = [];

module.exports = function(app, config){
    var io = socket.listen(app.listen(config.port));

    io.configure(function () {
        io.set("transports", ["xhr-polling"]);
        io.set("polling duration", 20);
    });

    io.sockets.on('connection', function (mysocket) {
        sockets.push(mysocket);
        setListeners(mysocket);
    });
};

function setListeners(mysocket) {
    mysocket.on('line', function (data) {
        console.log("GET LINE EVENT DATA: ", data);
        sendLine(data);
    });
    mysocket.on('disconnect', function() {
        if(sockets.length > 0){
            console.log("SOCKET INFO: ", mysocket);
            console.log("BEFORE REMOVE: ", sockets.length);
            sockets.remove(mysocket);
            console.log("AFTER REMOVE: ", sockets.length);
        }
    });
}

function sendLine(data) {
    for(var i = 0; i < sockets.length; ++i) {
        console.log("EMIT NEW LINE EVENT: ", data);
        sockets[i].emit('new_line', {'line': data});
    }
}


