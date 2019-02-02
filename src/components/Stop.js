import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { StopInput } from './StopInput';
import { StopList } from './StopList';
import * as StopActions from '../actions';

class Stop extends Component {

    constructor(props) {
        super(props);
        const { dispatch } = props;
        bindActionCreators(StopActions, dispatch);

        this.state = { newStop: '' };
        this.onEnter = this.onEnter.bind(this);
        this.onRemoveStop = this.onRemoveStop.bind(this);
    }

    onEnter (target) {
        if (target.charCode === 13) {
            this.props.dispatch(StopActions.addStop(this.state.newStop, this.props.dispatch));
            this.setState({newStop: ''})
        }
    }

    onTextChange (text) {
        this.setState({ newStop: text })
    }

    onRemoveStop (index) {
        this.props.dispatch(StopActions.removeStop(index));
    }

    render() {
        return (
            <div className="stopSection">
                <StopInput
                    placeholder="Новая точка маршрута"
                    onEnter={this.onEnter}
                    onTextChange={(e) => this.onTextChange(e.target.value)}
                    value={this.state.newStop}
                />
                <StopList source={this.props.stops} onRemove={this.onRemoveStop}/>
            </div>
        )
    }
}

const mapStateToProps = ({ stop }) => {
    const { stops } = stop;
    return { stops };
};

export default connect(mapStateToProps)(Stop);