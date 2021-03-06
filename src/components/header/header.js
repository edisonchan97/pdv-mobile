import React, { Component } from 'react';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './header.less';

class PublicHeader extends Component {
  static propTypes = {
    record: PropTypes.any,
    title: PropTypes.string.isRequired,
    confirm: PropTypes.any,
  }

  state = {
    navState: false, //导航栏是否显示
  };

  // 切换左侧导航栏状态
  toggleNav = () => {
    this.setState({ navState: !this.state.navState });
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
      <header className="header-container">
        <span className="header-slide-icon icon-catalog" onClick={this.toggleNav}></span>
        <span className="header-title">{this.props.title}</span>
        {
          this.props.record && <NavLink to="/pdv-mobile/record" exact className="header-link icon-jilu"></NavLink>
        }
        {
          this.props.confirm && <NavLink to="/pdv-mobile/index" exact className="header-link header-link-confim">确定</NavLink>
        }
        <ReactCSSTransitionGroup
          component={this.FirstChild}
          transitionName="nav"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {
            this.state.navState &&
            <aside key='nav-slide' className="nav-slide-list" onClick={this.toggleNav}>
              <NavLink to="/pdv-mobile/index" exact className="nav-link icon-jiantou-copy-copy">首页</NavLink>
              <NavLink to="/pdv-mobile/production" exact className="nav-link icon-jiantou-copy-copy">商品列表</NavLink>
              <NavLink to="/pdv-mobile/balance" exact className="nav-link icon-jiantou-copy-copy">提现</NavLink>
              <NavLink to="/pdv-mobile/helpcenter" exact className="nav-link icon-jiantou-copy-copy">帮助中心</NavLink>
              {
                !this.props.userData.isLogin && <NavLink to="/pdv-mobile/login" exact className="nav-link icon-jiantou-copy-copy">登录</NavLink>
              }
              {
                this.props.userData.isLogin && <NavLink to="/pdv-mobile/userCenter" exact className="nav-link icon-jiantou-copy-copy">用户中心</NavLink>
              }
            </aside>
          }
        </ReactCSSTransitionGroup>
      </header>
    );
  }
}
export default connect(state => ({
  userData: state.userData
}))(PublicHeader);
