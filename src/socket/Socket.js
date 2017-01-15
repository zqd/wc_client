/**
 * Created by 19016 on 2017/1/15.
 */

class Socket{

    constructor() {
        this._isClosed = true;
        this._waitOpen = false;
        this._tmpMessages = [];
    }

    setMsgHandler(handler) {
        this.msgHandler = handler;
    }

    open() {
        if (this._isClosed && !this._waitOpen) {
            try {
                this._waitOpen = true;
                this.webSocket = new WebSocket("ws://127.0.0.1:9000/socket");
                this.webSocket.onopen = (event) => {
                    this._isClosed = false;
                    this._waitOpen = false;
                    console.log("socket open");
                    this._tmpMessages.forEach(msg => Socket.prototype.send.call(this, msg));
                    this._tmpMessages = [];
                };
                this.webSocket.onclose = (event) => {
                    this._isClosed = true;
                    console.log("socket close");
                };

                this.webSocket.onmessage = (event) => {
                    this.msgHandler(JSON.parse(event.data));
                    console.log("socket onmessage=" +event.data);
                };

                this.webSocket.onerror = this.handleErr;
            } catch (e) {
                console.log(e);
            }
        }
    }

    close() {
        if (!this._isClosed) {
            this.webSocket.close();
            this._isClosed = true;
            this._tmpMessages = [];
        }
    }

    send(msg) {
        console.log(JSON.stringify(msg));
        if(this._isClosed){
           return;
        }
        if (this._waitOpen) {
            this._tmpMessages.push(_msg);
        } else {
            this.webSocket.send(JSON.stringify(msg));
        }
    }

    handleErr(err) {
        console.log(err);
    }
}

export default new Socket()
