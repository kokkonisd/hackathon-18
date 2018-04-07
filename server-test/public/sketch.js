function setup() {
    noCanvas();
    console.log('running');
    var button = select('#render');
    button.mousePressed(renderPage);
}

function renderPage() {
    httpGet('apps/mozart');
}