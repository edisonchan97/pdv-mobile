import React, { Component } from 'react';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './navbar.less';

class NavBar extends Component {
  //利用context实现跳转要加上这个
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static propTypes = {
    record: PropTypes.any,
    title: PropTypes.string.isRequired,
    confirm: PropTypes.any,
    path: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  goBack = () => {
    // this.context.router.history.listen((location )=>{
    //   console.log(location)
    // });
    if (this.props.path) {
      //有些操作需要跳转到首页而不是后退
      const { path, state } = this.props;
      this.context.router.history.replace(path, state)
    } else {
      this.context.router.history.goBack();//利用context实现跳转
    }
    //this.props.history.goBack();//
  }
  func = () => {
    var isChanging = 0;
    if (isChanging--) {
      return false;
    }
    if (window.location.hash === "#backButtonClick") {
      window.location = "#xx链接"
      isChanging = 1;
    }
    else {
      isChanging = 2;
      window.location.hash = "#backButtonClick";
    }
    window.location.hash = "#forward"
  }
  componentDidMount() {
    //window.addEventListener('hashchange', this.func, false);
  }
  componentWillUnmount() {
    //window.removeEventListener('hashchange');
  }
  render() {
    return (
      <header className="navbar-container">
        <span className="navbar-slide-icon" onClick={this.goBack}>返回</span>
        <span className="navbar-title">{this.props.title}</span>
        {
          this.props.record && <NavLink to="/pdv-mobile/record" exact className="navbar-link icon-jilu"></NavLink>
        }
        {
          this.props.confirm && <NavLink to="/pdv-mobile" exact className="navbar-link navbar-link-confim">确定</NavLink>
        }
      </header>
    );
  }
}
export default connect(state => ({
  userData: state.userData
}))(NavBar);
