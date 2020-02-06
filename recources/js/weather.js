$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=kathmandu,nepal&APPID=555f772396bb1b7e8d0a96297756b7fe",
    function (data) {
    console.log(data);

    var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

    $('.icon').attr('src', icon);

    console.log(icon);
    
});