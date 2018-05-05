import Server from '@/server';

class API extends Server{
  /**
   *  用途：获取记录数据
   *  @url https://api.cangdu.org/shopro/data/record
   *  返回http_code为200表示成功
   *  @method get
   *  @return {promise}
   */
  async getRecord(params = {}){
    try{
      let result = await this.axios('get', `/shopro/data/record/${params.type}`); 
      if(result && (result.data instanceof Object) && result.http_code === 200){
        return result.data;
      }else{
        let err = {
          tip: '获取记录数据失败',
          response: result,
          data: params,
          url: 'https://api.cangdu.org/shopro/data/record',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

}

export default new API();