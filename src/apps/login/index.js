import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import BackHeader from '@/components/back/back';
import './style.less';

class Login extends Component {
    state = {
        isLogin: false,
        loading: false,
        alertStatus: false, //弹框状态
        alertTip: '', //弹框提示文字,
        cur: 'nav1'
    }
    navChange = (e) => {
        const { cur } = this.state;
        const new_cur = e.target.getAttribute('id');
        if (cur !== new_cur) {
            this.setState({
                cur: new_cur
            })
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        const { cur } = this.state;
        return (
            <main className="login-container">
            <BackHeader title='登录'/>
                <nav className="login-nav">
                    <div className={cur === 'nav1' ? 'login-nav-item cur' : 'login-nav-item'} id='nav1' onClick={this.navChange.bind(this)}>手机登录</div>
                    <div className={cur === 'nav2' ? 'login-nav-item cur' : 'login-nav-item'} id='nav2' onClick={this.navChange.bind(this)}>密码登录</div>
                </nav>
                <form className='login-form'>
                    {
                        cur === 'nav1' && <div className='login-form-item'>
                            <span>手机号</span>
                            <input type="text" placeholder='请输入手机号' />
                        </div>
                    }
                    {
                        cur === 'nav1' && <div className='login-form-item'>
                            <span>验证码</span>
                            <input type="text" placeholder='请输入手机验证码' />
                            <input type="button" value='获取验证码' className='get-code-button' />
                        </div>
                    }
                    {
                        cur === 'nav2' && <div className='login-form-item'>
                            <span>用户名</span>
                            <input type="text" placeholder='请输入用户名' />
                        </div>
                    }
                    {
                        cur === 'nav2' && <div className='login-form-item'>
                            <span>密码</span>
                            <input type="text" placeholder='请输入密码' />
                        </div>
                    }


                    <div className='found-password'>
                        <a href="" className='found-password-item'>找回密码</a>
                    </div>
                    <div className='login-button-box'>
                        <input type="submit" value='登录' className='login-button' />
                    </div>
                </form>
                <div className='login-tips'>
                    <a href="">还不是会员？点此快速注册账号</a>
                </div>
            </main>
        )
    }
}

export default Login;