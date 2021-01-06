import axios from 'axios'
export const request = axios.create({
    baseURL: 'https://conduit.productionready.io/'
})

// 通过插件机制获取到上下文对象（query、params、req、res、app、store...）
export default (context) => {
    console.log('==context', context) //{isStatic: false, isDev: true, isHMR: false, app: {…}, store: Store, …}
    const { store } = context;
    // 请求拦截器
    // 任何请求都要经过请求拦截器
    // 我们可以在请求拦截器中做一些公共的业务处理，例如统一设置 token
    request.interceptors.request.use(function (config) {
        // Do something before request is sent
        const { user } = store.state;
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        return config;
    }, function (error) {
        // 如果请求失败（此时请求还没有发出去）就会进入这里
        // Do something with request error
        return Promise.reject(error);
    });
}