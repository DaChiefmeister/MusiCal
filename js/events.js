var events = new Array();
var searchResults = new Array();

function eventSearch(){
    searchResults.length = 0;
    var search = $('#search').val();
    $.ajax({ 
        type: "GET",
        url: 'php/data.php?job=get_events',
        success: function(response) {
            var obj = $.parseJSON(response);
            var index = 0;
            events.length = 0;
            $("#searchResults").empty();
            //$("#searchResults").css('border', 'red 1px solid');
            $.each(obj, function() { 
                var event = {name:this['name'], dt:this['dt'], city_school:this['city_school'], location:this['location'], event_desc:this['event_desc'], price:this['price'], link:this['link']}
                events.push(event);
                index = index + 1;
            });
            for(var i=0; i<= index; i++){
                if(events[i].name.toLowerCase().search(search.toLowerCase()) !== -1 || events[i].dt.toLowerCase().search(search.toLowerCase()) !== -1 || events[i].city_school.toLowerCase().search(search.toLowerCase()) !== -1 || events[i].location.toLowerCase().search(search.toLowerCase()) !== -1 || events[i].event_desc.toLowerCase().search(search.toLowerCase()) !== -1 || events[i].price.search(search) !== -1){
                    searchResults.push(0);
                    
                    var div = document.createElement('div');
                    div.innerHTML='';
                    var divH = document.createElement('div');
                    divH.innerHTML='';
                    var name = document.createElement('p');
                    name.innerHTML = events[i].name;
                    var dt = document.createElement('p');
                    dt.innerHTML = events[i].dt;
                    var location = document.createElement('p');
                    location.innerHTML = events[i].location;
                    var city_school = document.createElement('p');
                    city_school.innerHTML = events[i].city_school;
                    var event_desc = document.createElement('p');
                    event_desc.innerHTML = events[i].event_desc;
                    var price = document.createElement('p');
                    price.innerHTML = events[i].price;
                    var link = document.createElement('a');
                    link.innerHTML = "More Info";
                    div.appendChild(name);
                    div.appendChild(dt);
                    div.appendChild(location);
                    divH.appendChild(city_school);
                    divH.appendChild(event_desc);
                    divH.appendChild(price);
                    divH.appendChild(link);
                    div.appendChild(divH);
                    document.getElementById("searchResults").appendChild(div);
                    $("#searchResults > div").addClass("event");
                    $("p:nth-child(1)").addClass("name");
                    $("p:nth-child(2)").addClass("dt");
                    $("p:nth-child(3)").addClass("location");
                    $("div.hidden p:nth-child(1)").addClass("city_school").removeClass("name");
                    $("div.hidden p:nth-child(2)").addClass("event_desc").removeClass("dt");
                    $("div.hidden p:nth-child(3)").addClass("price").removeClass("location");
                    $("div a").addClass("link");
                    $("div a").attr("href", events[i].link);
                    $(".event > div").addClass("hidden clearFloat");
                }
                if($('#search').val().length === 0){
                    //phpAjax('php/data.php?job=get_events');
                    $("#searchResults").empty();
                }
            }
            
        }
    });  
}
/*if(searchResults.length === 0){
                    var errorMessage = document.createElement('div');
                    var oops = document.createElement('h2');
                    var message = document.createElement('p');
                    errorMessage.appendChild(oops);
                    errorMessage.appendChild(message);
                    $('#searchResults').appendChild(errorMessage);
                    $('#searchResults div p').addClass("oops");
            }*/
function phpAjax(job){
    $("section").empty();
    $.ajax({ 
        type: "GET",
        url: job,
        success: function(response) {
            var obj = $.parseJSON(response);
            var index = 0;
            events.length = 0;
            $.each(obj, function() { 
                var event = {name:this['name'], dt:this['dt'], city_school:this['city_school'], location:this['location'], event_desc:this['event_desc'], price:this['price'], link:this['link']}
                events.push(event);
                index = index + 1;
            });
            for(var i=0; i <= index; i ++){//this is my jesus for loop. don't touch it. It works, thats enough.
                var div = document.createElement('div');
                div.innerHTML='';
                var divH = document.createElement('div');
                divH.innerHTML='';
                var name = document.createElement('p');
                name.innerHTML = events[i].name;
                var dt = document.createElement('p');
                dt.innerHTML = events[i].dt;
                var location = document.createElement('p');
                location.innerHTML = events[i].location;
                var city_school = document.createElement('p');
                city_school.innerHTML = events[i].city_school;
                var event_desc = document.createElement('p');
                event_desc.innerHTML = events[i].event_desc;
                var price = document.createElement('p');
                price.innerHTML = events[i].price;
                var link = document.createElement('a');
                link.innerHTML = "More Info";
                div.appendChild(name);
                div.appendChild(dt);
                div.appendChild(location);
                divH.appendChild(city_school);
                divH.appendChild(event_desc);
                divH.appendChild(price);
                divH.appendChild(link);
                div.appendChild(divH);
                document.getElementById("dynamicContent").appendChild(div);
                $("section > div").addClass("event");
                $("p:nth-child(1)").addClass("name");
                $("p:nth-child(2)").addClass("dt");
                $("p:nth-child(3)").addClass("location");
                $("div.hidden p:nth-child(1)").addClass("city_school").removeClass("name");
                $("div.hidden p:nth-child(2)").addClass("event_desc").removeClass("dt");
                $("div.hidden p:nth-child(3)").addClass("price").removeClass("location");
                $("div a").addClass("link");
                $("div a").attr("href", events[i].link);
                $("div > div").addClass("hidden clearFloat");
            }
        }
    });  
}
window.onload = function() {
    $("section > div").on('click', function(){
        $('div:hidden').slideToggle();
    });
    phpAjax('php/data.php?job=get_events');
    $(".fa-filter").click(function(){$("header ul").toggle(1000,"swing");});
    $(".fa-search").click(function(){
        $("#search").fadeToggle(500);
        $("#search").focus();
    });
    $(".sortDate").click(function(){phpAjax('php/data.php?job=get_events');});
    $(".sortName").click(function(){phpAjax('php/data.php?job=get_events_name');});
    $(".sortNameRev").click(function(){phpAjax('php/data.php?job=get_events_name_rev');});
    $(".sortLocation").click(function(){phpAjax('php/data.php?job=get_events_location');});
    $(".sortLocationRev").click(function(){phpAjax('php/data.php?job=get_events_location_rev');});
    $("section").on('click', 'div',function(){
        $(this).children(".clearFloat").slideToggle(500);
        $(this).toggleClass('selectedEvent');
    });
    $("#searchResults").on('click', 'div',function(){
        $(this).children(".clearFloat").slideToggle(500);
        $(this).toggleClass('selectedEvent');
    });
}