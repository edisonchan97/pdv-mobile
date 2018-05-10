import React, { Component } from 'react';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.less';

class NavBar extends Component {
  static propTypes = {
    record: PropTypes.any,
    title: PropTypes.string.isRequired,
    confirm: PropTypes.any,
    history:PropTypes.object.isRequired,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  render() {
    return (
      <header className="navbar-container">
        <span className="navbar-slide-icon" onClick={()=>this.props.history.goBack()}>返回</span>
        <span className="navbar-title">{this.props.title}</span>
        {
          this.props.record && <NavLink to="/my-react-app/record" exact className="navbar-link icon-jilu"></NavLink>
        }
        {
          this.props.confirm && <NavLink to="/my-react-app" exact className="navbar-link navbar-link-confim">确定</NavLink>
        }
      </header>
    );
  }
}
export default connect(state => ({
  userData: state.userData
}))(NavBar);
