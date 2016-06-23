
//===========================Attribute Viewer=======================================//

var boxStatus = 'min';
var displayArrow = '';

var flag = true;

var attributeViewer = function () {

    this.minWidth = 300;
    this.minHeight = 400;
    this.maxWidth = 500;
    this.maxHeight = 600;

    this.containar = "body";
    this.callBack = null;

    this.createHtml = function () {
        var htmlString =
            "<div class='commentDiv' id='commentDiv'>" +
                "<div id='top'>" +
	                "<div class='arrow-top'></div>" +
                    "<div class='arrow-border-top'></div>" +
                "</div>" +
                "<div class='box' id='messageBox'>" +
                    "<div id='boxHeader'>" +
                        "<div id='crossDiv' title='Close'></div>" +
                        "<div id='maxDiv'></div>" +
                    "</div>" +
                    "<div id='placeContainar'>" +
                    "</div>" +
                    "<div id='boxFooter'>" +
                        "<a href='#' style='text-decoration: none;'> &nbsp &nbsp Zoom to</a>" +
                    "</div>" +
                "</div>" +
                "<div id='bottom'>" +
                    "<div class='arrow-bottom'></div>" +
                    "<div class='arrow-border-bottom'></div>" +

                    "<div class='arrow-left'></div>" +
                    "<div class='arrow-border-left'></div>" +

                    "<div class='arrow-right'></div>" +
                    "<div class='arrow-border-right'></div>" +
                "</div>" +
	        "</div>";

        var div = document.createElement('div');
        div.innerHTML = htmlString;
        document.body.appendChild(div);
    }


    this.makeDisplayFalse = function () {
        $('.box').css({ 'width': this.minWidth, 'height': this.minHeight });
        $('#placeContainar').css({ 'height': this.minHeight - 50 });
        $('.commentDiv').css({ 'display': 'none' });

        $('#maxDiv').css({ 'background': 'url(image/maximize.png)' });
        document.getElementById('maxDiv').title = "Maximize";
        boxStatus = 'min';

        $('.arrow-top').css({ 'display': 'none' });
        $('.arrow-border-top').css({ 'display': 'none' });
        $('.arrow-left').css({ 'display': 'none' });
        $('.arrow-border-left').css({ 'display': 'none' });
        $('.arrow-right').css({ 'display': 'none' });
        $('.arrow-border-right').css({ 'display': 'none' });
        $('.arrow-bottom').css({ 'display': 'none' });
        $('.arrow-border-bottom').css({ 'display': 'none' });
    };


    this.messageBoxMaxMin = function () {
        console.log(this.maxWidth);
        if (boxStatus == 'min') {
            $('.box').animate({ width: this.maxWidth, height: this.maxHeight });
            $('#placeContainar').animate({ height: this.maxHeight - 50 });

            if (displayArrow != '') {
                $('.arrow-' + displayArrow).css({ 'display': 'none' });
                $('.arrow-border-' + displayArrow).css({ 'display': 'none' });
            }

            $('#maxDiv').css({ 'background': 'url(image/restore.png)' });
            document.getElementById('maxDiv').title = "Restore Down";
            boxStatus = 'max';
        }
        else {
            $('.box').animate({ width: this.minWidth, height: this.minHeight });
            $('#placeContainar').animate({ height: this.minHeight - 50 });
            if (displayArrow != '') {
                $('.arrow-' + displayArrow).css({ 'display': 'block' });
                $('.arrow-border-' + displayArrow).css({ 'display': 'block' });
            }
            $('#maxDiv').css({ 'background': 'url(image/maximize.png)' });
            document.getElementById('maxDiv').title = "Maximize";
            boxStatus = 'min';
        }
    };


    //show the attribute panel depending on the clickable X Y position
    this.showAttributePanel = function (xValue, yValue, obj) {
        
        this.makeDisplayFalse();

        var leftBorder = $(this.containar).offset().left;
        var rightBorder = $(this.containar).offset().left + $(this.containar).width();
        var topBorder = $(this.containar).offset().top;
        var bottomBorder = $(this.containar).offset().top + $(this.containar).height();

        var messageDivWidth = $('.box').width();
        var messageDivHeight = $('.box').height();

        //display align to top arrow
        if (yValue < topBorder + messageDivHeight / 2) {            
            if (xValue < leftBorder + messageDivWidth / 2) {      //top left
                if (xValue < leftBorder + 17) {  //for border value
                    $('.commentDiv').css({ 'top': yValue - 15, 'left': xValue - 17 });
                    $('.arrow-top').css({ 'left': 5, 'display': 'block' });
                    $('.arrow-border-top').css({ 'left': 5, 'display': 'block' });
                }
                else {
                    $('.commentDiv').css({ 'top': yValue - 15, 'left': leftBorder });
                    $('.arrow-top').css({ 'left': xValue - leftBorder - 13, 'display': 'block' });
                    $('.arrow-border-top').css({ 'left': xValue - leftBorder - 13, 'display': 'block' });
                }
            }
            else if (xValue > rightBorder - messageDivWidth / 2) {  //top right
                if (xValue > rightBorder - 17) {
                    $('.commentDiv').css({ 'top': yValue - 15, 'left': xValue - messageDivWidth + 17 });
                    $('.arrow-top').css({ 'left': messageDivWidth - 34, 'display': 'block' });
                    $('.arrow-border-top').css({ 'left': messageDivWidth - 34, 'display': 'block' });
                }
                else {
                    $('.commentDiv').css({ 'top': yValue - 15, 'left': rightBorder - messageDivWidth });
                    $('.arrow-top').css({ 'left': messageDivWidth - (rightBorder - xValue) - 13, 'display': 'block' });
                    $('.arrow-border-top').css({ 'left': messageDivWidth - (rightBorder - xValue) - 13, 'display': 'block' });
                }
            }
            else { // top middle
                $('.commentDiv').css({ 'top': yValue - 15, 'left': xValue - messageDivWidth / 2 - 3 });
                $('.arrow-top').css({ 'left': messageDivWidth / 2 - 10, 'display': 'block' });
                $('.arrow-border-top').css({ 'left': messageDivWidth / 2 - 10, 'display': 'block' });
            }
            displayArrow = 'top';
        }

        //display align to bottom arrow
        else if (yValue > bottomBorder - messageDivHeight / 2) {
            if (xValue < leftBorder + messageDivWidth / 2) {  //bottom left
                if (xValue < leftBorder + 17) {  //for border value
                    $('.commentDiv').css({ 'top': yValue - messageDivHeight - 15, 'left': xValue - 17 });
                    $('.arrow-bottom').css({ 'left': 5, 'display': 'block' });
                    $('.arrow-border-bottom').css({ 'left': 5, 'display': 'block' });
                }
                else {
                    $('.commentDiv').css({ 'top': yValue - messageDivHeight - 15, 'left': leftBorder });
                    $('.arrow-bottom').css({ 'left': xValue - leftBorder - 13, 'display': 'block' });
                    $('.arrow-border-bottom').css({ 'left': xValue - leftBorder - 13, 'display': 'block' });
                }
            }
            else if (xValue > rightBorder - messageDivWidth / 2) { //bottom right
                if (xValue > rightBorder - 17) {
                    $('.commentDiv').css({ 'top': yValue - messageDivHeight - 15, 'left': xValue - messageDivWidth + 17 });
                    $('.arrow-bottom').css({ 'left': messageDivWidth - 34, 'display': 'block' });
                    $('.arrow-border-bottom').css({ 'left': messageDivWidth - 34, 'display': 'block' });
                }
                else {
                    $('.commentDiv').css({ 'top': yValue - messageDivHeight - 15, 'left': rightBorder - messageDivWidth });
                    $('.arrow-bottom').css({ 'left': messageDivWidth - (rightBorder - xValue) - 13, 'display': 'block' });
                    $('.arrow-border-bottom').css({ 'left': messageDivWidth - (rightBorder - xValue) - 13, 'display': 'block' });
                }
            }
            else {  //bottom middle
                $('.commentDiv').css({ 'top': yValue - messageDivHeight - 15, 'left': xValue - messageDivWidth / 2 });
                $('.arrow-bottom').css({ 'left': messageDivWidth / 2 - 10, 'display': 'block' });
                $('.arrow-border-bottom').css({ 'left': messageDivWidth / 2 - 10, 'display': 'block' });
            }
            displayArrow = 'bottom';
        }

        //display align to left arrow
        else if (xValue < leftBorder + $(this.containar).width() / 2) {
            $('.commentDiv').css({ 'top': yValue - messageDivHeight / 2, 'left': xValue + 15 });
            $('.arrow-left').css({ 'top': -messageDivHeight / 2 - 15, 'left': -14, 'display': 'block' });
            $('.arrow-border-left').css({ 'top': -messageDivHeight / 2 - 15 * 3, 'left': -15, 'display': 'block' });
            displayArrow = 'left';
        }

        //display align to right arrow
        else {
            $('.commentDiv').css({ 'top': yValue - messageDivHeight / 2, 'left': xValue - messageDivWidth - 15 });
            $('.arrow-right').css({ 'top': -messageDivHeight / 2 - 15, 'left': messageDivWidth, 'display': 'block' });
            $('.arrow-border-right').css({ 'top': -messageDivHeight / 2 - 15 * 3, 'left': messageDivWidth + 1, 'display': 'block' });
            displayArrow = 'right';
        }

        //after selecting the clickable position show the commentDiv
        $('.commentDiv').fadeIn("slow");

        if (obj != null)
            document.getElementById("placeContainar").appendChild(obj);

    };


    this.show = function (x, y, obj) {
        var me = this;

        //All event
        if (flag) {
            //first time create the html
            this.createHtml();

            $("#crossDiv").click(function () {
                me.makeDisplayFalse();
                if (typeof (me.callBack) == 'function') {
                    me.callBack();
                }
            });

            $("#top, #bottom").click(function (e) {
                me.showAttributePanel(e.pageX, e.pageY, obj);
            });

            $("#boxHeader").dblclick(function () {
                me.messageBoxMaxMin();
            });
            $("#maxDiv").click(function () {
                me.messageBoxMaxMin();
            });

            $("#boxHeader").mouseover(function () {
                $("#commentDiv").draggable();
                $("#commentDiv").draggable("enable");
            });

            $("#boxHeader").mouseleave(function () {
                $("#commentDiv").draggable("disable");
            });

            flag = false;
        }

        me.showAttributePanel(x, y, obj);
    };
}
