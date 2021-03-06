import React, { Component } from 'react';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import PropTypes from 'prop-types';
import md5 from 'md5';
import { PublicHeader } from 'pdv';
import { login, init } from '@/apps/login/action';
import API from './api';
import './style.less';
import { setToken } from '@/utils/token';
//import { Base64 } from 'pdv-utils'
//0、登录前先判断是否从localstore中自动带出账号密码
//1、没有输入账户密码时，登录按钮置灰不允许提交表单，
//2、登录前验证是否输入账号密码、手机号、验证码，验证手机号密码合法性，验证码是否正确
//3、提交前先通过接口验证库中是否存在此账号
//4、登录接口验证密码是否正确 正确->登录成功
//5、登录中不允许重复提交登录
//6、将本次登录的获取的用户信息储存在session中
//7、将手机号储存在cookie中
//8、如果用户选择了记住账号，则将用户登录信息储存在localstore中
//9、根据_accessToken是否存在，不存在->跳转到登录
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
        cur: 'nav1',
        form: {
            mobile: '',
            password: '',//密码md5加密
            remember: false,//是否勾选记住密码
            type: '',//登录方式 passed 账户+密码
            username: '',
            code: '',
            captcha: '',//验证码
            isUserInput: false,//密码是否由用户手动录入
        }
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
                this.props.history.push('/')
                //this.context.router.history.push("/");//利用context实现跳转
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    login = async (e) => {
        e.preventDefault();
        try {
            let cur = this.state.cur, form;
            if (cur == 'nav1') {
                //手机号登录
                let { mobile, code } = this.state.form;
                form = {
                    mobile,
                    code
                }
            } else {
                //账号密码登录 
                let { username, password, remember, isUserInput, clearText } = this.state.form;
                if (isUserInput) {
                    //如果是用户输入的
                    form = {
                        username,
                        password: md5('123456!@#$%^&*()_+' + password),//密码md5加密
                        clearText: password,
                        remember
                    }
                } else {
                    //如果是localstore中带出的
                    form = {
                        username,
                        password,
                        clearText,
                        remember
                    }
                }
            }
            this.checkForm(cur, form);
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
                    // this.metaAction.sf('data.other.error.password', '密码不正确，请重新输入')
                }
                return
            }

            this.setCookie('THE_LAST_LOGIN', form.mobile, 7);//登录手机号存到cookie中7天有效期
            this.context.user = response.value;//设置上下文
            setToken(response.value.token)
            //判断是否保存登录信息 存到localStorage中
            //如果记住账户 则保存到localStore中
            if (form.remember) {
                //延迟7天登录
                let time = (new Date()).getTime() + 7 * 24 * 60 * 60 * 1000
                localStorage.remember = time
                localStorage['mobile'] = form.mobile
                localStorage['password'] = form.password
            } else {
                localStorage.clear()
            }
            //用户信息存到sessionStorage中关闭页面后消失 当前窗口有效 同一个浏览器新打开相同的url不能获取 cookie和loacalStorage可以

            //登录后有效的信息保存到sessionStorage中
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

    checkForm = (cur, form) => {
        let message;
        if (cur == 'nav1') {
            let { mobile, code } = form;
            if (!mobile) {
                message = '请输入手机号';
                return
            }
            else if (mobile.length != 11) {
                message = '请输入正确的手机号';
                return
            } else if (!code) {
                message = '请输入短信验证码';
                return
            } else {
                message = '验证码错误'
                return
            }
        } else {
            let { username, password } = form;
            if (!username) {
                message = '请输入用户名'
                return
            } else if (!password) {
                message = '请输入密码'
                return
            } else if (password) {
                message = '密码必须包括数字+字母'
                return
            } else {
                message = '该用户未注册'
                return
            }
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
                //cookie中手机号与localStorage中手机号一致
                info.password = localStorage['password']//补充密码
            }
        } else {
            localStorage.clear()
        }
        this.props.init(info);//初始化账号密码

    }
    fieldChange = (value, key) => {
        this.setState(
            {
                form: {
                    [key]: value,
                    isUserInput: true
                }
            }
        )
    }
    render() {
        const { cur } = this.state;
        return (
            <main className="pdv-login page">
                <PublicHeader title='登录' />
                <nav className="login-nav">
                    <div className={cur === 'nav1' ? 'login-nav-item cur' : 'login-nav-item'} id='nav1' onClick={this.navChange.bind(this)}>手机登录</div>
                    <div className={cur === 'nav2' ? 'login-nav-item cur' : 'login-nav-item'} id='nav2' onClick={this.navChange.bind(this)}>密码登录</div>
                </nav>
                <form className='login-form' onSubmit={this.login}>
                    {
                        cur === 'nav1' && <div className='login-form-item'>
                            <span>手机号</span>
                            <input type="text" placeholder='请输入手机号' onChange={(e) => this.fieldChange(e.target.value, 'mobile')} />
                        </div>
                    }
                    {
                        cur === 'nav1' && <div className='login-form-item'>
                            <span>验证码</span>
                            <input type="text" placeholder='请输入手机验证码' onChange={(e) => this.fieldChange(e.target.value, 'code')} />
                            <input type="button" value='获取验证码' className='get-code-button' />
                        </div>
                    }
                    {
                        cur === 'nav2' && <div className='login-form-item'>
                            <span>用户名</span>
                            <input type="text" placeholder='请输入用户名' onChange={(e) => this.fieldChange(e.target.value, 'username')} />
                        </div>
                    }
                    {
                        cur === 'nav2' && <div className='login-form-item'>
                            <span>密码</span>
                            <input type="text" placeholder='请输入密码' onChange={(e) => this.fieldChange(e.target.value, 'password')} />
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
