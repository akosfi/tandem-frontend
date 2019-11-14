import React from "react";
import {Button, Intent, IToasterProps, IToastProps, Position, Toaster} from "@blueprintjs/core";

class ErrorToaster extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            autoFocus: false,
            canEscapeKeyClear: true,
            position: Position.TOP,
        };

        this.renderToastIfAny = this.renderToastIfAny.bind(this);
        this.addToast = this.addToast.bind(this);
    }

    // @ts-ignore
    private toaster: Toaster;
    private refHandlers = {
        toaster: (ref: Toaster) => (this.toaster = ref),
    };

    private addToast(message: string) {
        //toast.className = this.props.data.themeName;
        let toast = {} as IToastProps;

        toast.icon = "ban-circle";
        toast.intent = Intent.DANGER;
        toast.message = message;

        toast.timeout = 2000;
        this.toaster.show(toast);
    }

    renderToastIfAny() {

    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any){
        if(this.props.toasts.length > 0) {
            this.addToast(this.props.toasts[0]);
            return this.props.toasts.shift();
        }
    }

    render() {
        return (<div>
            <Toaster {...this.state} ref={this.refHandlers.toaster} />
            {this.renderToastIfAny()}
        </div>);
    }
}
export default ErrorToaster;
