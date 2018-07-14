import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is, fromJS } from 'immutable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './spin.less';
/*
@param delay 延迟显示加载效果的时间（防止闪烁）
@param indicator
@param size
@param spinning
@param tip
@param wrapperClassName
*/
export default class Spin extends Component {
    static propTypes = {
        tip: PropTypes.string,
        spinning: PropTypes.bool.isRequired,
    }
    static defaultProps = {
        tip: 'Loading...'
    }
    // css动画组件设置为目标组件
    FirstChild = props => {
        const childrenArray = React.Children.toArray(props.children);
        return childrenArray[0] || null;
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    render() {
        return (
            <ReactCSSTransitionGroup
                component={this.FirstChild}
                transitionName="spin"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                {
                    this.props.spinning && <div className="spin-con">
                        {this.props.tip}
                    </div>
                }
            </ReactCSSTransitionGroup>
        );
    }
}