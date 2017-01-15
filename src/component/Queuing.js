/**
 * Created by 19016 on 2017/1/15.
 */
import React from "react"
import Login from "./Login"
import Socket from "../socket/Socket"


const QueueRow = (props) => {
    return <p>{props.name} order: {props.index}</p>
};

const QueueCurrentRow = (props) => {
    return <p>{props.name === undefined ? "空闲中。。。" : props.name.user + "正在使用中。。。" } </p>
};

class QueueContent extends React.Component {

    render() {
        let rows = [];
        this.props.list.forEach((item) => {
            if (!(item.state === "0")) {
                rows.push(<QueueRow name={item.user} index={item.state} key={item.user}/>)
            }
        });
        let current = this.props.list[0];

        return (
            <div>
                <QueueCurrentRow name={current}/>
                <div>
                    <span>等候区：</span>
                    {rows}
                </div>
            </div>
        )
    }
}

class QueueButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.texts = ["完成", "预定", "取消预定"];
    }

    handleOnClick() {
        switch (this.props.will) {
            case "0" :
                this.props.onDone();
                break;
            case "1":
                this.props.onWill();
                break;
            case "2":
                this.props.onCancel();
                break;
        }
    }

    render() {
        return <button
            onClick={this.handleOnClick}>{this.texts[this.props.will]}</button>
    }
}

class Queuing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [], will: "1"};
        this.handleOnLogin = this.handleOnLogin.bind(this);
        this.handleOnLogout = this.handleOnLogout.bind(this);
        this.handleOnWill = this.handleOnWill.bind(this);
        this.handleOnCancel = this.handleOnCancel.bind(this);
        this.handleOnDone = this.handleOnDone.bind(this);
    }

    componentWillMount() {
        Socket.setMsgHandler((msg) => this.handleMsg(msg));
        Socket.open();
    }

    handleOnLogin(msg) {
        //TODO 对象化
        const _msg = {"action": "login", "user": msg};
        Socket.send(_msg);
    }

    handleOnLogout() {
        this.setState({will: "1"});
        const _msg = {"action": "logout"};
        Socket.send(_msg);
    }

    handleOnWill() {
        const _msg = {"action": "will"};
        Socket.send(_msg);
    }

    handleOnCancel() {
        const _msg = {"action": "cancel"};
        Socket.send(_msg);
    }

    handleOnDone() {
        const _msg = {"action": "done"};
        Socket.send(_msg);
    }

    handleMsg(msg) {
        console.log("handleMsg=" + msg);
        if (msg instanceof Array) {
            console.log("handleMsg in instanceof=" + msg);
            this.setState({data: msg});
        } else {
            const rs = msg.rsType;
            console.log("rs=" + rs);
            switch (rs) {
                case "willSuccess" :
                    this.setState({will: "2"});
                    break;
                case "cancelSuccess" :
                    this.setState({will: "1"});
                    break;
                case "doneSuccess" :
                    this.setState({will: "1"});
                    break;
                case "loginSuccess" :
                    break;
                case "logoutSuccess" :
                    console.log("logoutSuccess");
                    break;
                case "loginFail" :
                    this.setState({user: ""});
                    break;
                case "onOrder":
                    this.setState({will: "0"});
                    break;
                case "willFail":
                    console.log("willFail");
                    break;
            }
        }
    }

    render() {
        return (
            <div>
                <Login onLogin={this.handleOnLogin} onLogout={this.handleOnLogout}/>
                <QueueContent list={this.state.data}/>
                <QueueButton onWill={this.handleOnWill} onCancel={this.handleOnCancel} onDone={this.handleOnDone}
                             will={this.state.will}/>
            </div>
        )
    }
}
export default Queuing

