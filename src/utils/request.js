/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification, message } from 'antd';
import defaultSetting from '../../config/defaultSettings'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */
// application/x-www-form-urlencoded
const request = extend({
  prefix: 'http://localhost:7002/api',
  timeout: 10000,
  errorHandler,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  // },
  // 默认错误处理
  credentials: 'same-origin', // 默认请求是否带上cookie
});

const request2 = extend({
  prefix: 'http://localhost:7002/api',
  timeout: 10000,
  errorHandler,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  // },
  // 默认错误处理
  credentials: 'same-origin', // 默认请求是否带上cookie
});

// 中间件-用于处理通用的响应提示和请求过滤
request.use(async (ctx, next) => {
  // 处理request
  const nowTime = Math.ceil(new Date().getTime() / 1000);
  const overTime = Math.ceil(new Date(localStorage.getItem('accessTokenExpiresAt')).getTime() / 1000);
  const { oauth2 } = defaultSetting;
  if (ctx.req.url.indexOf('api/login/index') === -1) {
     // 检测token是否过期
    if ((overTime - nowTime) <= 0) {
      const { data, status } = await request2('/login/refreshToken', {
        method: 'POST',
        data: { data: { ...oauth2, grant_type: 'refresh_token', refresh_token: localStorage.getItem('refresh_token') } },
      })

      if (status === 200) {
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        localStorage.setItem('accessTokenExpiresAt', data.accessTokenExpiresAt);
      }
    }
    ctx.req.options.headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
  }

  await next();

  // 处理response，业务信息的提示
  if (ctx.res.msg !== undefined) {
    if (ctx.res.code !== 0) {
      message.error(ctx.res.msg);
    } else {
      message.success(ctx.res.msg);
    }
  }
  // 登录时的用户提示
  if (ctx.res.status === 400) {
    message.error('账号或密码错误');
  } else if (ctx.res.status === 200) {
    message.success('登录成功');
  }
})
export default request;
