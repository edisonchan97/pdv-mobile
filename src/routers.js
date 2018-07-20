import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import asyncComponent from '@/utils/asyncComponent';
//import BaseComponent from './layout/baseLayout';
//import home from "@/apps/home/index";
const home = asyncComponent(() => import("@/apps/home/index"));
const record = asyncComponent(() => import("@/apps/record/index"));
const helpcenter = asyncComponent(() => import("@/apps/helpcenter/index"));
const production = asyncComponent(() => import("@/apps/production/index"));
const balance = asyncComponent(() => import("@/apps/balance/index"));
const login = asyncComponent(() => import("@/apps/login/index"));
const userCenter = asyncComponent(() => import("@/apps/userCenter/index"));

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path="/pdv-mobile/index" exact component={home} />
            <Route path="/pdv-mobile/record" component={record} />
            <Route path="/pdv-mobile/helpcenter" component={helpcenter} />
            <Route path="/pdv-mobile/production" component={production} />
            <Route path="/pdv-mobile/balance" component={balance} />
            <Route path="/pdv-mobile/login" component={login} />
            <Route path="/pdv-mobile/userCenter" component={userCenter} />
            <Redirect to="/pdv-mobile/index" />
          </Switch>
      </BrowserRouter>
    )
  }
}