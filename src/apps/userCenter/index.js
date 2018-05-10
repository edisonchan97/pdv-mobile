import React, { Component } from 'react';
import PublicHeader from '@/components/header/header';
import { is, fromJS } from 'immutable';
import './style.less';

export default class UserCenter extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    render() {
        return (
            <main className='usercenter-container'>
                <PublicHeader title="用户中心" record />
                <article className="context-con">
                    
                </article>
            </main>
        )
    }
}