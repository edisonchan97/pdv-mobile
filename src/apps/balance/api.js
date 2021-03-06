import Server from '@/server';

class API extends Server{
  /**
   *  用途：获取佣金数据
   *  @url https://api.cangdu.org/shopro/data/balance
   *  返回http_code为200表示成功
   *  @method get
   *  @return {promise}
   */
  async getBalance(params = {}){
    try{
      let result = await this.axios('get', '/shopro/data/balance', params); 
      if(result && (result.data instanceof Object) && result.http_code === 200){
        return result.data.data||{};
      }else{
        let err = {
          tip: '获取佣金数据失败',
          response: result,
          data: params,
          url: 'https://api.cangdu.org/shopro/data/balance',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
  
}

export default new API();