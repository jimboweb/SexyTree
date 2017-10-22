/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

        var position = function(top, left){
            this.top = top;
            this.left = left;
        }
        var width = screen.width;
        var height = screen.height; 
        var center = new position(screen.width/5, screen.height/2);

        d3.json("js/flare.json", function(error, flare) {
            if (error) throw error;

            flare.x0 = 0;
            flare.y0 = 0;



            drawNodes(flare.children);
        });

        function drawNodes(children){
            var nodeCount = children.length;
            var rotate = 360/nodeCount;
            var nodePositions = [];
            var distance = 100;
            for(var i=0; i<nodeCount; i++){
                var t = center.top + distance * Math.sin(i*rotate);
                var l = center.left + distance * Math.cos(i*rotate);
                var newPos = new position(t, l);
                nodePositions.push(
                            newPos
                        );

            }
            
            nodePositions.forEach(function(pos){
                console.log("Position top: " + pos.top + " left: " + pos.left);
            });
            
            d3.select("body")
            .selectAll("p")
            .data(children)
            .enter().append("p")
            .style("position", "absolute")
            .style("top", function(d, i){
                console.log("in top position i is " + i);
                var rtrn = nodePositions[i].top +"px";
                return rtrn;
            })
            .style("left", function(d, i){
                var rtrn = nodePositions[i].left + "px";
                console.log("in left position i is " + i);
                return rtrn;

            })
            .text(function(d) { return d.name; });

        }