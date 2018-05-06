import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect,BrowserRouter } from 'react-router-dom';
import asyncComponent from '@/utils/asyncComponent';

import home from "@/apps/home/index";
const record = asyncComponent(() => import("@/apps/record/index"));
const helpcenter = asyncComponent(() => import("@/apps/helpcenter/index"));
const production = asyncComponent(() => import("@/apps/production/index"));
const balance = asyncComponent(() => import("@/apps/balance/index"));
const login = asyncComponent(() => import("@/apps/login/index"));
const userCenter = asyncComponent(() => import("@/apps/userCenter/index"));

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/my-react-app" exact component={home} />
          <Route path="/my-react-app/record" component={record} />
          <Route path="/my-react-app/helpcenter" component={helpcenter} />
          <Route path="/my-react-app/production" component={production} />
          <Route path="/my-react-app/balance" component={balance} />
          <Route path="/my-react-app/login" component={login} />
          <Route path="/my-react-app/userCenter" component={userCenter} />
          <Redirect to="/my-react-app" />
        </Switch>
      </BrowserRouter>
    )
  }
}
