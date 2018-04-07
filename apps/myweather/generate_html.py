def get_thermometer(tmp):
    if (tmp>25):
        return "full"
    elif (tmp>10):
        return "quater"
    else:
        return "empty"

icon={"Rain": "umbrella", "Clouds": "cloud", "Sun": "sun-o"}
def get_icon(weather):
    if (not weather in icon):
        return "sun-o"
    else:
        return icon[weather]

def generate_html(city_list):
    html="""<!DOCTYPE html>
<html>
<head>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-color/2.1.2/jquery.color.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta/js/bootstrap.min.js"></script>

    <script type="text/javascript">
        $(document).ready(function() {
            function loopFlash() {
                $("#bolt").animate({
                    color: "rgb(0, 0, 0)",
                }, 500).delay(3000);
                $("#bolt").animate({
                    color: "rgb(255, 255, 255)",
                }, 500, 'linear', function() {
                    loopFlash();
                });
            }

            $('.submitCity').attr('disabled',true);
            $('#cityName').keyup(function(){
                if($(this).val().length !=0)
                    $('.submitCity').attr('disabled', false);            
                else
                    $('.submitCity').attr('disabled',true);
            });

            $(".city").mouseenter(function() {
                $(this).children(".delete").css('opacity', 1);
            });
            $(".city").mouseleave(function() {
                $(this).children(".delete").css('opacity', 0);
            });

            $(".delete").click(function() {
                var cityName = $(this).parent().children(".city-name")[0].innerHTML;
                console.log("delete " + cityName);
            });

            $(".submitCity").click(function() {
                var cityName = $("#cityName").val();
                console.log("add " + cityName);
            });

            loopFlash();
        });
    </script>

    <style type="text/css">
        body {
            background-color: rgb(79, 94, 117);
        }

        .card {
            background-color: rgba(255, 255, 255, 0.3);
        }

        #bolt {
            font-size: 32pt;
        }

        hr {
            border-style: dashed;
            border-width: 1.5pt;
            border-top-width: 0px;
        }

        .city-name {
            font-size: 24pt;
        }

        .weather-items {
            font-size: 16pt;
        }

        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        .city {
            padding-top: 0.5%;
            padding-bottom: 1%;
        }

        .add {
            padding-top: 1%;
            padding-bottom: 2%;
        }

        .delete {
            text-align: right;
            margin: auto;
            opacity: 0;
            cursor: pointer;
        }
    </style>

    <title>Weather App</title>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="text-center col">
                <div class="display-3">Weather App</div>
                <i id="bolt" class="fa fa-bolt"></i>
            </div>
        </div>

        <hr>

        <div class="row">
            <div class="city card col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 mx-auto">
                <div class="city-name lead text-center">Paris</div>
                <br>
                <ul class="weather-items">
                    <li><div class="text-center"><i class="fa fa-thermometer-quarter"></i> 12&deg;C</div></li>
                    <li><div class="text-center"><i class="fa fa-sun-o"></i> Sunny</div></li>
                </ul>
                <br>
                <i class="fa fa-times delete"></i>
            </div>
        </div>

        <br>"""


    

    for city in city_list:
        #html+="<div>"+city["name"] +" : "+city["weather"][0]["description"]+"<div>"
        print(city)
        html+="""<div class="row">
                    <div class="city card col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 mx-auto">
                        <div class="city-name lead text-center">Paris</div>
                        <br>
                        <ul class="weather-items">
                            <li><div class="text-center"><i class="fa fa-thermometer-"""+get_thermometer(city["main"]["temp"]-273.15)+"""></i>"""+ str(city["main"]["temp"]-273.15) + """&deg;C</div></li>
                            <li><div class="text-center"><i class="fa fa-"""+get_icon(city["weather"][0]["main"])+"""></i> """+ city["weather"][0]["main"] +"""</div></li>
                        </ul>
                    </div>
                </div>
                <br>"""

    html+="""</div>
            </body>
            </html>"""

    file=open("vue.html", "w")
    file.write(html)
    file.close