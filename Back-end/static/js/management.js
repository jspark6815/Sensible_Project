$.ajax({   
    type: "GET",
    url: "http://127.0.0.1:5000/hardware/find",
    data: {},
    dataType: 'json'
}).done(function( req ) {
    console.log(req);
    len = 0;
    for(i in req) {
        len += 1;
        var div = document.createElement('div');
        div.setAttribute('id', 'sensor'+len);
        div.setAttribute('class', 'sensorCard flexible');
        div.innerHTML = document.getElementById('sensor_sample').innerHTML;
        div.childNodes[5].childNodes[1].setAttribute('id', 'code'+len);
        div.childNodes[3].childNodes[1].setAttribute('name','cycle'+len);
        div.childNodes[7].childNodes[1].setAttribute('onclick',"eliminateCard(document.getElementById('code"+len+"').value)")
        div.childNodes[7].childNodes[3].setAttribute('onclick',"saveCard(document.getElementById('code"+len+"').value)")
        
        document.getElementById('addCard').before(div);
        document.getElementById('sensor'+len).childNodes[1].value = req[i].hardware;
        document.getElementById('code'+len).value = req[i].private_code;
    }
    document.getElementById('board').style.width = "calc(240px * "+Math.round((len+1)/2)+" + 60px * "+Math.round((len+1)/2)+")";
});