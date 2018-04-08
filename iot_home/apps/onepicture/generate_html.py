path="apps/onepicture/"

def generate_html(image_path):
    f = open(path + 'vue.html', 'w')
    html = '''<!DOCTYPE html>
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
            $(".pic").click(function() {
                $.get("/run/onepicture/take_picture", function() {
                    $.get("/apps/onepicture/", function() {
                        location.reload();
                    });
                });
            });
        });
    </script>

    <style type="text/css">
        body {
            padding: 2%;
        }

        img {
            min-width: 100%;
            max-width: 100%;
        }

        .image {
            width: 100%;
        }

        .card {
            padding: 1%;
            width: 100%;
        }
    </style>

    <title>One Picture</title>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="text-center col">
                <div class="display-3"><i class="fa fa-camera-retro"></i>ne Picture</div>
                <div class="lead">smile!</div>
            </div>
        </div>

        <br>

        <div class="card col-8 mx-auto">
            <div class="image mx-auto"><img class="img-responsive center-block" src="'''+ image_path + '''"></div>
        </div>
    </div>

    <br>

    <div class="buttons text-center mx-auto">
        <button type="submit" class="btn btn-primary pic">Take a picture</button>
    </div>
</body>
</html>'''
    f.write(html)
    f.close()
