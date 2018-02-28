//Overview: There are two images, one blurred and one not blurred.
//  To acheive the unblur effect, a clipping mask with a bunch of circles
//  is used on the blurred image. 
var svg = d3.select("svg")

//Config
var circleRadius = 40;
var blurAmount = 5;
var clipDelay = 400;
var clipDuration = 7000;
var clipEase = 'quad'; //quad and circle look good

//CLIP
var clips = svg.append('svg:defs')
    .append('svg:mask')
    .attr({id: 'mask'});

var addMask = function addMask(x,y){
    //To achieve the unblur effect, we add circles to the clip mask
    var clip = clips.append('svg:circle')
        .attr({ 
            cx: x, 
            cy: y, 
            r: circleRadius, 
            fill: '#ffffff',
            'class': 'clipCircle'
        });
  return clip;
};

//Blur filter
var defs = svg.append('svg:defs');
var filterBlur = defs.append('svg:filter')
	.attr({ id: 'blur' });
filterBlur.append('feGaussianBlur')
		.attr({
      		'in': "SourceGraphic",
      		'stdDeviation': blurAmount
		});

//IMAGE
var imageUrl = 'http://i.imgur.com/Lk4L4Pg.jpg';

//Add blurred image
svg.append('svg:image')
    .attr({
      x: 0,
      y: 0,
      filter: 'url(#blur)',
      'xlink:href': imageUrl,
      width: 800,
      height: 500,
      fill: '#336699'
    })

//MASK
//  Add masked image (regular, non blurred image which will be revealed
var mask = svg.append('svg:image')
    .attr({
        x: 0,
        y: 0,
        'xlink:href': imageUrl,
        'mask': 'url(#mask)',
        width: 800,
        height: 500, filter: 'url(#blur2)',
        fill: '#336699'
    });

var mouseMove = function move(e){
    //erase on mouse over
    var x = parseInt(d3.event.pageX - 25 + circleRadius/2,10);
    var y = parseInt(d3.event.pageY - 25 - circleRadius,10);

    //Add mask
    var clip = addMask(x,y);

    clip.transition().ease(clipEase)
        .delay(clipDelay)
        .duration(clipDuration)
        .attr({ 
            fill: '#000000', 
            r: 0
        })
        .each('end', function end(){
            this.remove();
        })

};

//attach event
svg.on('mousemove', mouseMove);