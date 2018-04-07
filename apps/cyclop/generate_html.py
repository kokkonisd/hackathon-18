def generate_html(image_path):
    
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
    print (html)