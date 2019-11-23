const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/e2281bc29810547b9962d3607c426d09/'+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service.',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary +' It is currently  '+ body.currently.temperature+' degree out.'+body.currently.precipProbability+' % chance of rain.')
        }
    })
}

module.exports=forecast