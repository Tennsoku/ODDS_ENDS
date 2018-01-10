/*param:
{
    shapeCanvas: canvas,
    shape: shape,
    onInit() || null,
    onPlay() || null,
    onUpdate(localTime, deltaTime) || null,
    onComplete() || null,
    onPlayerSeeked(localTime) || null,
    onPlayerSizeChanged() || null,
    onPlayerStateChanged(playerState) || null,
}
*/

function newShapeEvent(param)
{
    var eventParams = {
        startTime: param.shapeInfo.startTime,
        delay: param.shapeInfo.delay,
        onInit: function() {
            this.shapeCanvas = param.shapeCanvas;
            this.pushDisplayObject(this.shapeCanvas);

            if (param.onInit)
                param.onInit.call(this);
        },
        onPlay: function() {
            var length = this.onPlayCallbacks.length;
            if (length) {
                for (var i = 0; i < length; ++i)
                    (this.onPlayCallbacks[i ^ 0]).call(this);
            }
        },
        onUpdate: function() {
            var length = this.onUpdateCallbacks.length;
            if (length) {
                for (var i = 0; i < length; ++i)
                    (this.onUpdateCallbacks[i ^ 0]).call(this);
            }
        },
        onComplete: function() {
            var length = this.onCompleteCallbacks.length;
            if (length) {
                for (var i = 0; i < length; ++i)
                    (this.onCompleteCallbacks[i ^ 0]).call(this);
            }
        },
        onPlayerSeeked: function() {
            var length = this.onPlayerSeekedCallbacks.length;
            if (length) {
                for (var i = 0; i < length; ++i)
                    (this.onPlayerSeekedCallbacks[i ^ 0]).call(this);
            }
        },
        onPlayerSizeChanged: function() {
            var length = this.onPlayerSizeChangedCallbacks.length;
            if (length) {
                for (var i = 0; i < length; ++i)
                    (this.onPlayerSizeChangedCallbacks[i ^ 0]).call(this);
            }
        },
        onPlayerStateChanged: function() {
            var length = this.onPlayerStateChangedCallbacks.length;
            if (length) {
                for (var i = 0; i < length; ++i)
                    (this.onPlayerStateChangedCallbacks[i ^ 0]).call(this);
            }
        }
    };

    var shapeEvent = newStandardEvent(eventParams);

    shapeEvent.shapeCanvas = param.shapeCanvas;
    shapeEvent.shape = param.shape;

    shapeEvent.onPlayCallbacks = [];
    shapeEvent.onUpdateCallbacks = [];
    shapeEvent.onCompleteCallbacks = [];
    shapeEvent.onPlayerSeekedCallbacks = [];
    shapeEvent.onPlayerSizeChangedCallbacks = [];
    shapeEvent.onPlayerStateChangedCallbacks = [];

    if (param.onPlay)
        shapeEvent.onPlayCallbacks.push(param.onPlay);
    if (param.onUpdate)
        shapeEvent.onUpdateCallbacks.push(param.onUpdate);
    if (param.onComplete)
        shapeEvent.onCompleteCallbacks.push(param.onComplete);
    if (param.onPlayerSeeked)
        shapeEvent.onPlayerSeekedCallbacks.push(param.onPlayerSeeked);
    if (param.onPlayerSizeChanged)
        shapeEvent.onPlayerSizeChangedCallbacks.push(param.onPlayerSizeChanged);
    if (param.onPlayerStateChanged)
        shapeEvent.onPlayerStateChangedCallbacks.push(param.onPlayerStateChanged);


    return shapeEvent;
}