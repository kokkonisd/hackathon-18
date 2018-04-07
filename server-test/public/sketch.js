function setup() {
    noCanvas();
    console.log('running');
    var button = select('#render');
    button.mousePressed(renderPage);
    $(".test").text("blablabla");
}

function renderPage() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            cbRender(xmlHttp.responseText);
    }
    xmlHttp.open("GET", 'run/', true); // true for asynchronous 
    xmlHttp.send(null);
}

function cbRender(data) {
    
}