var express = require('express');
var app = express();
const portNumber = 3000;
const axios = require('axios').default;


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/pokemon', (req, res)=>{
    res.sendFile("client.html", {'root':'../LAB4'});
});

app.route('/pokemon/request').post(function (req, res){
    let pkmName = req.body.name;
    if(!pkmName){
        res.end('No pokemon name recieved.')
    }else{
        //res.end('Sending pokemon request for '+ pkmName +".");
        const URL = 'http://pokeapi.co/api/v2/pokemon/' + pkmName;
        axios.get(URL)
        .then(pokemon_response => {
            let pokemon_data = pokemon_response.data;
            res.send(pokemon_data);
        }).catch(function(error){
            console.log(error);
            res.status(500).send('The pokemon does not exist');
        });
    }
});

app.get('/', (req, res)=>{
	
});


app.listen(portNumber, ()=>{
    console.log(`Example app listening at http://localhost:${portNumber}`)
});