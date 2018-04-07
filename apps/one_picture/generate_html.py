def generate_html(image_path):
    f = open('vue.html', 'w')
    html = """<!DOCTYPE html>
<html>
<body>

<h1>Cyclapp</h1>

<img src='"""

    html += image_path

    html += """' alt="Cyclapp image" style="width:500px">


</body>
</html>
"""
    f.write(html)
    f.close()