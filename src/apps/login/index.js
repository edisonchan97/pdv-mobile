import React, { Component } from 'react';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import PropTypes from 'prop-types';
import md5 from 'md5';
import PublicHeader from '@/components/header/header';
import { login, init } from '@/apps/login/action';
import API from './api';
import './style.less';
import { setToken } from '@/utils/token';

//1、没有输入账户密码时，登录按钮置灰不允许提交表单
//2、提交前先通过接口验证库中是否存在此账号，密码不能为空
//3、登录接口验证密码是否正确
class Login extends Component {
    //利用context实现跳转要加上这个
    static contextTypes = {
        router: PropTypes.object.isRequired,
        user: PropTypes.object
    }
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
    componentWillReceiveProps(nextProps) {
        if (!is(fromJS(this.props.userData), fromJS(nextProps.userData))) {
            //判断是否由未登录--》登录 是跳转到首页 
            if (!this.props.userData.isLogin && nextProps.userData.isLogin) {
                this.props.history.push('/my-react-app')
                //this.context.router.history.push("/my-react-app");//利用context实现跳转
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    login = async (e) => {
        e.preventDefault();
        try {
            let form = {
                mobile: '13691222319',
                password: md5('123456!@#$%^&*()_+'),
                remember: true,
                type: 'passed'
            }
            let response = await API.getRecord(form);//缺少登录接口模拟登录
            response = {
                result: true,
                value: {
                    nickname: 'liviuscn',
                    token: '0123456789',
                    currentOrgStatus: '12341',
                    skin: '#00B38A'
                }
            }
            if (!response.result) {
                if (response.error.code === 50111) {
                    this.metaAction.sf('data.other.error.password', '密码不正确，请重新输入')
                }
                return
            }

            this.setCookie('THE_LAST_LOGIN', form.mobile, 7);//登录手机号存到cookie中
            this.context.user = response.value;//设置上下文
            setToken(response.value.token)
            //判断是否保存登录信息 存到localStorage中
            if (form.remember) {
                let time = (new Date()).getTime() + 7 * 24 * 60 * 60 * 1000
                localStorage.remember = time
                localStorage['mobile'] = form.mobile
                localStorage['password'] = form.password
            } else {
                localStorage.clear()
            }
            //用户信息存到sessionStorage中关闭页面后消失
            sessionStorage['mobile'] = form.mobile
            sessionStorage['username'] = response.value.nickname
            sessionStorage['_accessToken'] = response.value.token
            sessionStorage['password'] = form.password
            sessionStorage['currentOrgStatus'] = response.value.currentOrgStatus
            //document.onkeydown = null 防止重复提交
            //登录时切换皮肤
            let skin = (response.value.skin && response.value.skin.toUpperCase()) || '#00B38A'
            localStorage['skin'] = skin
            this.props.login();
        } catch (error) {
            console.log(error)
        }
    }
    //从cookie中读取mobile
    getCookie = (c_name) => {
        if (document.cookie.length > 0) {
            let c_start = document.cookie.indexOf(c_name + "=")
            if (c_start !== -1) {
                c_start = c_start + c_name.length + 1
                let c_end = document.cookie.indexOf(";", c_start)
                if (c_end === -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }
    //cookie中存储上次登录的用户名
    setCookie = (c_name, value, expiredays) => {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    }
    componentWillMount() {

        //根据localStorage初始化表单值 记住密码从local中自动添加账号密码 
        let info = { mobile: '', password: '', remember: false }
        let currentTimestamp = (new Date()).getTime()

        info.mobile = this.getCookie('THE_LAST_LOGIN')
        if (currentTimestamp < localStorage.remember) {
            info.remember = true
            if (info.mobile === localStorage['mobile']) {
                info.password = localStorage['password']
            }
        } else {
            localStorage.clear()
        }
        this.props.init(info);

    }
    render() {
        const { cur } = this.state;
        return (
            <main className="login-container">
                <PublicHeader title='登录' />
                <nav className="login-nav">
                    <div className={cur === 'nav1' ? 'login-nav-item cur' : 'login-nav-item'} id='nav1' onClick={this.navChange.bind(this)}>手机登录</div>
                    <div className={cur === 'nav2' ? 'login-nav-item cur' : 'login-nav-item'} id='nav2' onClick={this.navChange.bind(this)}>密码登录</div>
                </nav>
                <form className='login-form' onSubmit={this.login}>
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
                        <input type='submit' value='登录' className='login-button' />
                    </div>
                </form>

                <div className='login-tips'>
                    <a href="">还不是会员？点此快速注册账号</a>
                </div>
            </main>
        )
    }
}

export default connect(state => ({
    userData: state.userData
}), {
        login, init
    })(Login);
