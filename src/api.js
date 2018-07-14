//公共api
import Server from '@/server';

class API extends Server {
  /**
   *  用途：测试api
   *  @url 
   *  返回status为1表示成功
   *  @method post
   *  @return {promise}
   */
  async test(params = {}) {
    try {
      let result = await this.axios('post', '/test', params);
      if (result && result.status === 1) {
        return result;
      } else {
        let err = {
          tip: '失败',
          response: result,
          data: params,
          url: '/test',
        }
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }

}

export default new API();