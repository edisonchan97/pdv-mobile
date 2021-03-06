
export default function sortSearchOption(data, mode, delKey){
    if( mode ){
        for( const [key, value] of Object.entries(mode) ){
            let val = data[key]
            if( typeof value ==  'string' ) {
                data[value] = val
            }else if(typeof value == 'object') {
                for( const [ index, item ] of Object.entries(value) ){
                    data[index] = item(val)
                }
            }
            delete data[key]
        }
    }
    if( delKey ){
        delKey.forEach(item=>{
            try{
                delete data[item]
            }catch(err){
                console.log(err)
            }
        })
    }
    return data
}