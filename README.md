<p align=center style=margin:50px;>
  <a href=https://www.yingbeijf.com>
    <img src=https://www.yingbeijf.com/img/common/logo_hover-f0639c45ec.png width=263/>
  </a>
</p>

> Wap版报表

### 索引
*   [项目结构](#product-tables)
*   [路由](#routes)
*   [业务接口](#service-api)
*   [代理接口](#proxy-api)
*   [使用代理接口](#use-proxy)
*   [错误处理](#error)	
*   [启动项目](#starting-project)
*   [单元测试](#unit-test)

### Product Tables
### 项目结构

- asset&ensp;&ensp;&ensp;&ensp;&ensp;前端目录
    - public&ensp;&ensp;&ensp;&ensp;&ensp;静态文件目录
    - views&ensp;&ensp;&ensp;&ensp;&ensp;视图
- bin &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;启动项目目录
- config&ensp;&ensp;&ensp;&ensp;&ensp;启动配置文件
- controller&ensp;&ensp;&ensp;控制器
- pm2log&ensp;&ensp;&ensp;&ensp;&ensp;pm2日志
- proxy&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;接口代理
- routes&ensp;&ensp;&ensp;&ensp;&ensp;页面路由
- test&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;单元测试
- util&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;组件

### Routes
### 路由
- [首页]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/index

### Service API
### 业务接口

### Proxy API
### 接口代理
> 统一返回结果: <br/>
{<br/>
        &nbsp;status: 返回状态: 操作成功, 操作失败, 操作错误, 操作超时, 该用户已用其他手机登录, 502 Bad Gateway..., <br/>
        &nbsp;code: 返回编码: S0000001(操作成功), S0000002(操作失败), S0000003(操作错误), S0000004(操作超时), 
                       &nbsp;&nbsp;S0000005(该用户已用其他手机登录), S0000502(502 Bad Gateway)...,<br/>
        &nbsp;msg: 返回信息,<br/>
        &nbsp;data: 返回数据<br/>
}
#### 目录[proxy/bin]
- index 首页
    - **indexInfo**(首页信息)

            //请求参数
            {
               无 
            }

            //返回值
            {
                userShortName:          {string}     [用户简称]，
                msgCount:               {string}     [未读消息数量]，
                balance:                {string}     [账户余额]，
                mPreInter:              {string}     [本月收益]，
                interAmt:               {string}     [累计收益]，
                frozenAmt:              {string}     [冻结金额]，
                hasRead:                {string}     [可读消息: true:是，false: 否]，
                headUrl:                {string}     [用户头像]，
                sysFileList:            {string}     [返回首页轮播图片列表]，
                articleListMobile:      {string}     [新闻信息列表]，
                investProjectList:      {string}     [首页展示的定期产品列表]，
                cardFlag:               {string}     [0: 不可使用卡券 1: 可使用卡券]，
                proMark:                {string}     [0: 新手标 2: 定期理财标]，
                status:                 {string}     [113001: 待发布，113002: 募集中，113003: 已售罄，
                                                      113004: 投资中，113005: 已结清，113006: 流标，
                                                      113007: 撤销,113008: 截标]，
                isLogin:                {string}     [是否已登录（0: 未登录 1: 已登录）]，
                title:                  {string}     [标题]，
                titleLink:              {string}     [标题链接]，
                titleUrl:               {string}     [标题图片URL]，
            }
- summary 汇总
    - **sendVerCode**(首页信息)

            //请求参数
            {
                phoneNo:      {Number}    [手机号码]
                busCode:      {Number}    [业务代码]
            }

            //返回值
            {
                
            }
    - **login**(用户登录)

            //请求参数
            {
                phoneNo:      {Number}    [手机号码]
                phoneVerCode:    {Number}    [手机验证码]
            }

            //返回值
            {
         
            }
    - **dailyList**(获取日结数据)

            //请求参数
            {
                pageSize:      {Number}    [当前页条数]
                currentPage:    {Number}    [当前页码]
                startDate:      {Number}    [开始日期]
                endDate:    {Number}    [结束日期]
            }

            //返回值
            {
            
            }
    - **userLogout**(用户登出)

            //请求参数
            {
               无 
            }

            //返回值
            {
              无 
            }
    - **dailyRepayList**(定期还款统计)

            //请求参数
            {
                pageSize:      {Number}    [当前页条数]
                currentPage:    {Number}    [当前页码]
                startDate:      {Number}    [开始日期]
                endDate:    {Number}    [结束日期]
            }

            //返回值
            {
              
            }
    - **dailyInvestList**(定期复投统计)

            //请求参数
            {
                pageSize:      {Number}    [当前页条数]
                currentPage:    {Number}    [当前页码]
                startDate:      {Number}    [开始日期]
                endDate:    {Number}    [结束日期]
            }

            //返回值
            {
             
            }

   

### Use Proxy
### 使用代理接口
    const Proxy = require('../../proxy');

    //引用拉取首页信息列表接口数据
    Proxy.IndexProxy.indexInfo(req, (result) => {

    }


### Error
### 异常/错误处理
    暂无

##### 异步统一返回错误格式
    暂无


### Starting Project
### 启动项目

    //进入项目根目录
    $node bin/www

    //本地访问地址
    **********************************************
        run server 127.0.0.1 || localhost port 6005
    **********************************************

### Unit Test
### 单元测试

    //到项目根目录
    $mocha


#### 备注
> 暂无