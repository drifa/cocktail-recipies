import React from 'react'
import { AppContext } from './ContextProvider'

export default function withContext(Component) {

    class ContextComponent extends React.Component {
        render() {
            return (
                <AppContext.Consumer>
                    {(context) => {
                        return (<Component {...this.props} context={context} />);
                    }}
                </AppContext.Consumer>);
        }
    }
    return ContextComponent;
}