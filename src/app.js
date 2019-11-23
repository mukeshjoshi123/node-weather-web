const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

const app=express()
const port =process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath=(path.join(__dirname,'../public'))
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather-app',
        name:'Mukesh Joshi'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Mukesh Joshi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
       message:'Hey! how can i help you!',
       title:'Help',
       name:'Mukesh Joshi'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a address.'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a sraech term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 help',
        name:'Mukesh Joshi',
        errorMessage:'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mukesh Joshi',
        errorMessage:'Page not found.'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})