import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { StopInput } from './StopInput';
import StopList from './StopList';
import * as StopActions from '../actions';

class StopScreen extends Component {

    constructor(props) {
        super(props);

        const { dispatch } = props;
        bindActionCreators(StopActions, dispatch);

        this.state = { newStop: '' };
        this.onEnter = this.onEnter.bind(this);
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    onEnter (target) {
        if (target.charCode === 13) {
            const { lat, lng } = this.props;
            this.props.dispatch(StopActions.addStop({name: this.state.newStop, lat, lng}));
            this.setState({newStop: ''})
        }
    }

    onTextChange = (text) => this.setState({ newStop: text });

    render() {
        return (
            <div className="stopSection">
                <StopInput
                    placeholder="Новая точка маршрута"
                    onEnter={this.onEnter}
                    ref={this.inputRef}
                    onTextChange={(e) => this.onTextChange(e.target.value)}
                    value={this.state.newStop}
                />
                <StopList/>
            </div>
        )
    }
}

const mapStateToProps = ({ map, stop }) => {
    const { lat, lng } = map;
    const { stops } = stop;
    return { lat, lng, stops };
};

export default connect(mapStateToProps)(StopScreen);