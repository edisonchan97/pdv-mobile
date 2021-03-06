import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import API from '../api';
import './recordList.less';

class RecordList extends Component {

  state = {
    recordData: [],
  }

  /**
   * 初始化获取数据
   * @param  {string} type 数据类型
   */
  getRecord = async type => {
    try {
      this._isMounted = true
      let result = await API.getRecord({ type });
      if (this._isMounted) this.setState({ recordData: result.data || [] })
    } catch (err) {
      console.error(err);
    }
  }

  componentWillReceiveProps(nextProps) {
    // 判断类型是否重复
    let currenType = this.props.location.pathname.split('/')[3];
    let type = nextProps.location.pathname.split('/')[3];
    if (currenType !== type) {
      this.getRecord(type);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  componentWillMount() {
    let type = this.props.location.pathname.split('/')[3];
    this.getRecord(type);
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  render() {
    return (
      <div className="pdv-record-record-list page">
        <ul>
          {
            this.state.recordData.map((item, index) => {
              return <li className="record-item" key={index}>
                <section className="record-item-header">
                  <span>创建时间：{item.created_at}</span>
                  <span>{item.type_name}</span>
                </section>
                <section className="record-item-content">
                  <p><span>用户名：</span>{item.customers_name} &emsp; {item.customers_phone}</p>
                  <p><span>商&emsp;品：</span>{item.product[0].product_name}</p>
                  <p><span>金&emsp;额：</span>{item.sales_money} &emsp; 佣金：{item.commission}</p>
                </section>
                <p className="record-item-footer">等待管理员审核，审核通过后，佣金将结算至账户</p>
              </li>
            })
          }
        </ul>
      </div>
    );
  }

}

export default RecordList;