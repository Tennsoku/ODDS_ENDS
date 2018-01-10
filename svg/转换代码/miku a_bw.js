var shape = $.createShape({lifeTime:4,x:0,y:0});
var g = shape.graphics;
g.lineStyle(2,10066329,1);
/*--图层1--*/
g.drawPath( $.toIntVector([1,3,1,3,1,3,1,3]),$.toNumberVector([224,179,240,193,274,192,274,192,307,192,328,178,223,178,233,172,277,172,277,172,313,171,328,178]));
g.lineStyle(1,10066329,1);
/*--图层2--*/
g.drawPath( $.toIntVector([1,3,1,3]),$.toNumberVector([230,182,241,175,275,176,275,176,309,175,319,182]));
