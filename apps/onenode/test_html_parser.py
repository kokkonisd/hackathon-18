from html_parser import render_html

cont = {"test": "Success", "a": 6, "c": 8, "arr": [1, 2, 3]}
test = open("result.html", "w")
test.write(render_html("test.html", cont))
test.close()