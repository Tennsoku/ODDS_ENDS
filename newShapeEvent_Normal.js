function newShapeEvent_Normal(shapeName, initalValues) {
    var shapeInfo = shapeInfos['' + shapeName];
    var shapeCanvas = shapeInfo.shapeCanvas;
    return newShapeEvent({
        shapeCanvas: this.shapeCanvas,
        shape: this.shape,
        onInit: function() {
            this.shapeCanvas.x = 0;
            this.shapeCanvas.y = 0;
            setCanvasValues(this.shapeCanvas, initalValues);
            this.pushDisplayObject(this.shapeCanvas);
            this.pushTween(
                Tween.serial(
                    Tween.tween(this.shapeCanvas, { alpha: 1.0 }, { alpha: 0.0 }, 0.5),
                    Tween.delay(
                        Tween.tween(this.shapeCanvas, { alpha: 0.0 }, { alpha: 1.0 }, 0.5),
                        this.delay - 1
                    )
                )
            );
        }
    });
}

/*shapeInfos = 
{
    shapeName:String : 
    {   
        shape: shape,
        shapeCanvas,
        startTime,
        delay
}
*/


newStandardEvent({
    startTime: 3,
    delay: 3,
    onInit: function() {
        shapeCanvas.icon.x = 0;
        shapeCanvas.icon.y = 0;
        shapeCanvas.icon.scaleX = 0.8;
        shapeCanvas.icon.scaleY = 0.8;
        this.pushDisplayObject(shapeCanvas.icon);
        this.pushTween(
            Tween.serial(
                Tween.tween(shapeCanvas.icon, {
                    alpha: 1.0
                }, {
                    alpha: 0.0
                }, 0.3),
                Tween.delay(
                    Tween.tween(shapeCanvas.icon, {
                        alpha: 0.0
                    }, {
                        alpha: 1.0
                    }, 0.3),
                    this.delay - 0.6
                )
            )
        );
    }
}),