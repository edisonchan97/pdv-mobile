import React, { Component } from 'react';
import { PublicHeader } from 'pdv';
import { is, fromJS } from 'immutable';
import './style.less';

export default class UserCenter extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    render() {
        return (
            <main className='pdv-usercenter'>
                <PublicHeader title="用户中心" record />
                <article className="context-con">
                     <p>积分：1000</p>
                     <p>我的收藏</p>
                     <p>我喜欢的</p>
                     <p>个性设置</p>
                </article>
            </main>
        )
    }
}