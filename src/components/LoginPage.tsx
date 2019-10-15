import React, {Dispatch} from "react";
import {loginUserAction} from "../store/user/actions";
import {connect} from "react-redux";

class LoginPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);

        this.state = {
            nameInput: ''
        };

        this.handleNameInputChange = this.handleNameInputChange.bind(this);
        this.handleNameInputSubmit = this.handleNameInputSubmit.bind(this);
    }


    handleNameInputChange(event: any) {
        this.setState({nameInput: event.target.value});
    }

    handleNameInputSubmit(event: any) {
        this.props.loginUser(this.state.nameInput);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleNameInputSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.nameInput} onChange={this.handleNameInputChange} />
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
