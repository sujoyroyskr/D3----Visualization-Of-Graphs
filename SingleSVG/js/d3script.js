var linkpath = ("data/links.csv");
var nodepath = ("data/nodes.csv");


var width = 700,
    height = 400;

var color = d3.scale.category20();

var svg1 = d3.select("#area1").append("svg")
    .attr("width", width)
    .attr("height", height);

var svg2 = d3.select("#area2").append("svg")
    .attr("width", width)
    .attr("height", height);

var force1 = d3.layout.force()
			  .size([width, height])
			  .linkDistance(200)
			  .charge(-300);

var force2 = d3.layout.force()
        .size([width, height])
        .linkDistance(200)
        .charge(-300);

// For SVG1 or 1st Graph
d3.csv(nodepath, function(nodes) { 
  var nodelookup = {};
  var nodecollector = {};

   count = 0; 
	// we want to create a lookup table that will relate the links file and the nodes file
    nodes.forEach(function(row) {
    nodelookup[row.node] = count; 
    
    nodecollector[row.node] = {name: row.node, group: row.group };
    //console.log(nodecollector)
     
    //console.log(row.node)
    //console.log(nodelookup)
    
    count++; 
 });

//Get all the links out of of the csv in a way that will match up with the nodes
 
d3.csv(linkpath, function(linkchecker) {

	var linkcollector = {};
	// indexsource = 0;
	// indextarget = 0; 
	count= 0;
    //console.log(nodelookup['celery'])
    linkchecker.forEach(function(link) {
  
	linkcollector[count] = {source: nodelookup[link.source], target: nodelookup[link.target], type: link.type };
    //console.log(linkcollector[count]) 
	count++
});

//console.log(linkcollector)
var nodes = d3.values(nodecollector);
var links = d3.values(linkcollector);

//console.log(nodes)
//console.log(links)

  // Create the link lines.
  var link1 = svg1.selectAll(".link")
	.data(links)
	.enter().append("line")
	.attr("class", function(d) { return "link " + d.type; })
        
  // Create the node circles.
  var node1 = svg1.selectAll(".node")
	.data(nodes)
    .enter().append("g")
	.attr("class", "node")
    .call(force1.drag);


 
 //put in little circles to drag
  node1.append("circle")
	.attr("r", 10)
    .attr("class", function(d) { return "node " + d.group; })
    .call(force1.drag);
    
//add the words  
 node1.append("text")
	.attr("dx", 20)
	.attr("dy", ".35em")
	.text(function(d) { return d.name });   
  

//get it going!
  force1
  .nodes(nodes)
  .links(links)
  .start();


  force1.on("tick", function() {  
    link1.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

    node1.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  })



  });
  });

// For SVG2 or 2nd Graph

d3.csv(nodepath, function(nodes) { 
  var nodelookup = {};
  var nodecollector = {};

   count = 0; 
  // we want to create a lookup table that will relate the links file and the nodes file
    nodes.forEach(function(row) {
    nodelookup[row.node] = count; 
    
    nodecollector[row.node] = {name: row.node_2, difference: row.difference };
    //console.log(nodecollector)
     
    //console.log(row.node)
    //console.log(nodelookup)
    
    count++;
 });

//Get all the links out of of the csv in a way that will match up with the nodes
 
d3.csv(linkpath, function(linkchecker) {

  var linkcollector = {};
  indexsource = 0;
  indextarget = 0; 
  count= 0;
    //console.log(nodelookup['celery'])
    linkchecker.forEach(function(link) {
  
  linkcollector[count] = {source: nodelookup[link.source], target: nodelookup[link.target], category: link.category };
    //console.log(linkcollector[count]) 
  count++
});

//console.log(linkcollector)
var nodes = d3.values(nodecollector);
var links = d3.values(linkcollector);

//console.log(nodes)
//console.log(links)


 var link2 = svg2.selectAll(".link")
  .data(links)
  .enter().append("line")
  .attr("class", function(d) { return "link " + d.category; })
        
  // Create the node circles.
  var node2 = svg2.selectAll(".node")
  .data(nodes)
  .enter().append("g")
  .attr("class", "node")
  .call(force2.drag);


 
 //put in little circles to drag
  node2.append("circle")
  .attr("r", 10)
    .attr("class", function(d) { return "node " + d.difference; })
    .call(force2.drag);
    
//add the words  
 node2.append("text")
  .attr("dx", 20)
  .attr("dy", ".35em")
  .text(function(d) { return d.name });   
  

//get it going!
  
  force2
  .nodes(nodes)
  .links(links)
  .start();


  force2.on("tick", function() {  
    link2.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

    node2.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  })


  });
  });
