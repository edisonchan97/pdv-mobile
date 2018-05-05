import React,{Component}from 'react';
import './style.less';

export default class Back extends Component{

    render(){
        return(
            <header className='back-container'>
                  <span className="header-slide-icon icon-back" onClick={this.toggleNav}>返回</span>
                  <span className="header-title">{this.props.title}</span>
                  
            </header>
        )
    }
}