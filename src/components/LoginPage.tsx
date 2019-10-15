import React, {Dispatch} from "react";
import {loginUserAction} from "../store/user/actions";
import {connect} from "react-redux";

class LoginPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);


        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event: any) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event: any) {
        this.props.loginUser(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {

    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {

        loginUser: (name: string) => dispatch(loginUserAction(name))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
