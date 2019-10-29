import React from "react";

class SignInType extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (<span onClick={this.props.nextClick}><b>Go to Registration</b></span>);
    }
}

export default SignInType;
