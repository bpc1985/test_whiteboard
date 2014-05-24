var WhiteBoard = WhiteBoard || {};

WhiteBoard.app = (function(){
    var socket, canvas, ctx, colorPicker, startPos = {}; mouseDown = false;

    function init() {
        setObjects();
        setListeners();
    }

    function setObjects() {
        socket = io.connect(window.location.hostname);
        canvas = $('#drawzone');
        $('#color-picker').minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom left',
            change: function(hex, opacity) {
                if( !hex ) return;
                if( opacity ) hex += ', ' + opacity;
                try {
                    console.log(hex);
                } catch(e) {}
            },
            theme: 'bootstrap'
        });
        colorPicker = $('#color-picker');

        ctx = canvas[0].getContext('2d');
        ctx.strokeStyle = colorPicker.val();
        ctx.lineCap = "round";
        ctx.lineWidth = 15;
    }

    function setListeners() {
        canvas.bind('mousedown',function(e){
            mouseDown = true;
            startPos.x = e.pageX - canvas.offset().left;
            startPos.y = e.pageY - canvas.offset().top;
        });

        canvas.bind('mousemove',drawSegment);
        canvas.bind('mouseup', function(e){
            drawSegment(e);
            mouseDown = false;
        });
        socket.on('new_line', receiveLine);
    }

    function receiveLine(data) {
        console.log("RECEIVE EVENT NEW LINE FROM SERVER: ", data);
        ctx.beginPath();
        ctx.moveTo(data.line.startX, data.line.startY);
        ctx.lineTo(data.line.endX, data.line.endY);
        ctx.strokeStyle = data.line.color;
        ctx.stroke();
        ctx.strokeStyle = colorPicker.val();
    }

    function drawSegment(e)
    {
        ctx.strokeStyle = colorPicker.val();
        if(mouseDown) {
            socket.emit("line", {
                'startX': startPos.x,
                'startY': startPos.y,
                'endX': e.offsetX,
                'endY': e.offsetY,
                'color': colorPicker.val()
            });
            ctx.beginPath();
            ctx.moveTo(startPos.x, startPos.y);
            ctx.lineTo( e.pageX - canvas.offset().left,  e.pageY - canvas.offset().top);
            ctx.stroke();
            startPos.x =  e.pageX - canvas.offset().left;
            startPos.y =  e.pageY - canvas.offset().top;
        }
    }

    return { init:init };
}());

$(document).ready(WhiteBoard.app.init);
