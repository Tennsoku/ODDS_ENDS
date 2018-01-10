/****LyricEvent*****/

var playerState = Player.state;
if (playerState == 'playing')
    Player.pause();

var $$ = $G._get("$$");

/***********List****************/
                function newLyricEvent_Title(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });

                                // clear
                                this.tweens.length = 0;

                                var scale = Math.min($.width / layers.width, $.height / layers.height);
                                var length = this.text.length;

                                for (var i = 0; i < length; ++i)
                                    (this.textBox.canvas.getChildAt(i)).filters = [$.createBlurFilter(0, 0, 3)];

                                var indexes = [];
                                for (var i = 0; i < length; ++i)
                                    indexes.push(i);

                                var tweens = [];
                                for (var i = 0; i < length; ++i) {
                                    var rand = Utils.rand(0, indexes.length);
                                    var charIndex = indexes[rand ^ 0];
                                    indexes.splice(rand, 1);

                                    if (this.text.charAt(charIndex) == ' ')
                                        continue;

                                    var blur = (30 + 50 * Math.random()) * scale;
                                    var charNode = this.textBox.canvas.getChildAt(charIndex);
                                    var blurringDelay = 1 + Math.random();

                                    tweens.push(
                                        Tween.parallel(
                                            Tween.tween(charNode, {
                                                    _blurFilter: {
                                                        blurX: 0,
                                                        blurY: 0
                                                    }
                                                }, {
                                                    _blurFilter: {
                                                        blurX: blur,
                                                        blurY: blur
                                                    }
                                                },
                                                blurringDelay
                                            ),
                                            Tween.tween(charNode, {
                                                    x: charNode.x,
                                                    y: charNode.y
                                                }, {
                                                    x: charNode.x + Math.cos(Math.random() * 16.28) * (20 + Math.random() * 10),
                                                    y: charNode.y + Math.sin(Math.random() * 6.28) * (20 + Math.random() * 10)
                                                },
                                                blurringDelay
                                            ),
                                            Tween.delay(
                                                Tween.tween(charNode, {
                                                    alpha: 0
                                                }, {
                                                    alpha: 1
                                                }, 0.15),
                                                this.delay - blurringDelay - 0.15
                                            )
                                        )
                                    );
                                }

                                this.pushTween(Tween.parallel.apply(null, tweens));
                                this.delay = this.computeDuration();

                                this.pushTween(Tween.serial(
                                    Tween.tween(this.textBox.canvas, {
                                        alpha: 1.0
                                    }, {
                                        alpha: 0.0
                                    }, 0.5),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, {
                                            alpha: 0.0
                                        }, {
                                            alpha: 1.0
                                        }, 0.1),
                                        this.delay - 0.6
                                    )
                                ));
                            };

                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);

                            this.originalDelay = this.delay;
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Title_black(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0x000000);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });

                                // clear
                                this.tweens.length = 0;

                                var scale = Math.min($.width / layers.width, $.height / layers.height);
                                var length = this.text.length;

                                for (var i = 0; i < length; ++i)
                                    (this.textBox.canvas.getChildAt(i)).filters = [$.createBlurFilter(0, 0, 3)];

                                var indexes = [];
                                for (var i = 0; i < length; ++i)
                                    indexes.push(i);

                                var tweens = [];
                                for (var i = 0; i < length; ++i) {
                                    var rand = Utils.rand(0, indexes.length);
                                    var charIndex = indexes[rand ^ 0];
                                    indexes.splice(rand, 1);

                                    if (this.text.charAt(charIndex) == ' ')
                                        continue;

                                    var blur = (30 + 50 * Math.random()) * scale;
                                    var charNode = this.textBox.canvas.getChildAt(charIndex);
                                    var blurringDelay = 1 + Math.random();

                                    tweens.push(
                                        Tween.parallel(
                                            Tween.tween(charNode, {
                                                    _blurFilter: {
                                                        blurX: 0,
                                                        blurY: 0
                                                    }
                                                }, {
                                                    _blurFilter: {
                                                        blurX: blur,
                                                        blurY: blur
                                                    }
                                                },
                                                blurringDelay
                                            ),
                                            Tween.tween(charNode, {
                                                    x: charNode.x,
                                                    y: charNode.y
                                                }, {
                                                    x: charNode.x + Math.cos(Math.random() * 16.28) * (20 + Math.random() * 10),
                                                    y: charNode.y + Math.sin(Math.random() * 6.28) * (20 + Math.random() * 10)
                                                },
                                                blurringDelay
                                            ),
                                            Tween.delay(
                                                Tween.tween(charNode, {
                                                    alpha: 0
                                                }, {
                                                    alpha: 1
                                                }, 0.15),
                                                this.delay - blurringDelay - 0.15
                                            )
                                        )
                                    );
                                }

                                this.pushTween(Tween.parallel.apply(null, tweens));
                                this.delay = this.computeDuration();

                                this.pushTween(Tween.serial(
                                    Tween.tween(this.textBox.canvas, {
                                        alpha: 1.0
                                    }, {
                                        alpha: 0.0
                                    }, 0.5),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, {
                                            alpha: 0.0
                                        }, {
                                            alpha: 1.0
                                        }, 0.1),
                                        this.delay - 0.6
                                    )
                                ));
                            };

                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);

                            this.originalDelay = this.delay;
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_blur(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });

                                // clear
                                this.tweens.length = 0;

                                var scale = Math.min($.width / layers.width, $.height / layers.height);
                                var length = this.text.length;

                                for (var i = 0; i < length; ++i)
                                    (this.textBox.canvas.getChildAt(i)).filters = [$.createBlurFilter(0, 0, 3)];

                                var indexes = [];
                                for (var i = 0; i < length; ++i)
                                    indexes.push(i);

                                var tweens = [];
                                for (var i = 0; i < length; ++i) {
                                    var rand = Utils.rand(0, indexes.length);
                                    var charIndex = indexes[rand ^ 0];
                                    indexes.splice(rand, 1);

                                    if (this.text.charAt(charIndex) == ' ')
                                        continue;

                                    var blur = (30 + 50 * Math.random()) * scale;
                                    var charNode = this.textBox.canvas.getChildAt(charIndex);
                                    var blurringDelay = 1;

                                    tweens.push(
                                        Tween.reverse(
                                            Tween.parallel(
                                                Tween.tween(charNode, {
                                                        _blurFilter: {
                                                            blurX: 0,
                                                            blurY: 0
                                                        }
                                                    }, {
                                                        _blurFilter: {
                                                            blurX: blur,
                                                            blurY: blur
                                                        }
                                                    },
                                                    blurringDelay
                                                ),
                                                Tween.tween(charNode, {
                                                        x: charNode.x,
                                                        y: charNode.y
                                                    }, {
                                                        x: charNode.x + Math.cos(Math.random() * 16.28) * (20 + Math.random() * 10),
                                                        y: charNode.y + Math.sin(Math.random() * 6.28) * (20 + Math.random() * 10)
                                                    },
                                                    blurringDelay
                                                ),
                                                Tween.delay(
                                                    Tween.tween(charNode, {
                                                        alpha: 0
                                                    }, {
                                                        alpha: 1
                                                    }, 0.3),
                                                    this.delay - blurringDelay - 0.3
                                                )
                                            )
                                        )    
                                    );
                                }

                                this.pushTween(Tween.parallel.apply(null, tweens));
                                this.delay = this.computeDuration();

                                this.pushTween(Tween.serial(
                                    Tween.tween(this.textBox.canvas, {
                                        alpha: 1.0
                                    }, {
                                        alpha: 0.0
                                    }, 0.5),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, {
                                            alpha: 0.0
                                        }, {
                                            alpha: 1.0
                                        }, 0.1),
                                        this.delay - 0.6
                                    )
                                ));
                            };

                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);

                            this.originalDelay = this.delay;
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_blur_black(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0x000000);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });

                                // clear
                                this.tweens.length = 0;

                                var scale = Math.min($.width / layers.width, $.height / layers.height);
                                var length = this.text.length;

                                for (var i = 0; i < length; ++i)
                                    (this.textBox.canvas.getChildAt(i)).filters = [$.createBlurFilter(0, 0, 3)];

                                var indexes = [];
                                for (var i = 0; i < length; ++i)
                                    indexes.push(i);

                                var tweens = [];
                                for (var i = 0; i < length; ++i) {
                                    var rand = Utils.rand(0, indexes.length);
                                    var charIndex = indexes[rand ^ 0];
                                    indexes.splice(rand, 1);

                                    if (this.text.charAt(charIndex) == ' ')
                                        continue;

                                    var blur = (30 + 50 * Math.random()) * scale;
                                    var charNode = this.textBox.canvas.getChildAt(charIndex);
                                    var blurringDelay = 1;

                                    tweens.push(
                                        Tween.reverse(
                                            Tween.parallel(
                                                Tween.tween(charNode, {
                                                        _blurFilter: {
                                                            blurX: 0,
                                                            blurY: 0
                                                        }
                                                    }, {
                                                        _blurFilter: {
                                                            blurX: blur,
                                                            blurY: blur
                                                        }
                                                    },
                                                    blurringDelay
                                                ),
                                                Tween.tween(charNode, {
                                                        x: charNode.x,
                                                        y: charNode.y
                                                    }, {
                                                        x: charNode.x + Math.cos(Math.random() * 16.28) * (20 + Math.random() * 10),
                                                        y: charNode.y + Math.sin(Math.random() * 6.28) * (20 + Math.random() * 10)
                                                    },
                                                    blurringDelay
                                                ),
                                                Tween.delay(
                                                    Tween.tween(charNode, {
                                                        alpha: 0
                                                    }, {
                                                        alpha: 1
                                                    }, 0.3),
                                                    this.delay - blurringDelay - 0.3
                                                )
                                            )
                                        )    
                                    );
                                }

                                this.pushTween(Tween.parallel.apply(null, tweens));
                                this.delay = this.computeDuration();

                                this.pushTween(Tween.serial(
                                    Tween.tween(this.textBox.canvas, {
                                        alpha: 1.0
                                    }, {
                                        alpha: 0.0
                                    }, 0.5),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, {
                                            alpha: 0.0
                                        }, {
                                            alpha: 1.0
                                        }, 0.1),
                                        this.delay - 0.6
                                    )
                                ));
                            };

                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);

                            this.originalDelay = this.delay;
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_falling(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });

                                // clear
                                this.tweens.length = 0;

                                var scale = Math.min($.width / layers.width, $.height / layers.height);
                                var length = this.text.length;

                                for (var i = 0; i < length; ++i)
                                    (this.textBox.canvas.getChildAt(i)).filters = [$.createBlurFilter(0, 0, 3)];

                                var indexes = [];
                                for (var i = 0; i < length; ++i)
                                    indexes.push(i);

                                var tweens = [];
                                for (var i = 0; i < length; ++i) {
                                    var rand = Utils.rand(0, indexes.length);
                                    var charIndex = indexes[rand ^ 0];
                                    indexes.splice(rand, 1);

                                    if (this.text.charAt(charIndex) == ' ')
                                        continue;

                                    
                                    var charNode = this.textBox.canvas.getChildAt(charIndex);
                                    var fallingDelay = 1 + Math.random();

                                    tweens.push(
                                        Tween.tween(charNode, { alpha: 1 }, { alpha: 0 }, 0.3),
                                        Tween.parallel(
                                            Tween.delay(
                                                Tween.tween(charNode, { alpha: 0 }, { alpha: 1 }, 0.5),
                                                this.delay - 0.8
                                            ),
                                            Tween.delay(
                                                Tween.tween(charNode, { y: charNode.y + charNode.height * 5 * Math.random() }, { y: charNode.y }, fallingDelay),
                                                this.delay - fallingDelay - 0.3
                                            )
                                        )
                                    );
                                }

                                this.pushTween(Tween.parallel.apply(null, tweens));
                                this.delay = this.computeDuration();

                                this.pushTween(Tween.serial(
                                    Tween.tween(this.textBox.canvas, { alpha: 1.0 }, { alpha: 0.0 }, 0.3),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, { alpha: 0.0 }, { alpha: 1.0 }, 0.3),
                                        this.delay - 0.6
                                    )
                                ));
                            };

                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);

                            this.originalDelay = this.delay;
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_fly(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });

                                // clear
                                this.tweens.length = 0;

                                var scale = Math.min($.width / layers.width, $.height / layers.height);
                                var length = this.text.length;

                                for (var i = 0; i < length; ++i)
                                    (this.textBox.canvas.getChildAt(i)).filters = [$.createBlurFilter(0, 0, 3)];

                                var indexes = [];
                                for (var i = 0; i < length; ++i)
                                    indexes.push(i);

                                var tweens = [];
                                for (var i = 0; i < length; ++i) {
                                    var rand = Utils.rand(0, indexes.length);
                                    var charIndex = indexes[rand ^ 0];
                                    indexes.splice(rand, 1);

                                    if (this.text.charAt(charIndex) == ' ')
                                        continue;

                                    
                                    var charNode = this.textBox.canvas.getChildAt(charIndex);
                                    var flyingDelay = 2;

                                    if (this.text.charAt(charIndex) == '飛'){
                                        tweens.push(
                                            Tween.tween(charNode, { alpha: 1 }, { alpha: 0 }, 0.3),
                                            Tween.parallel(
                                                Tween.delay(
                                                    Tween.tween(charNode, { alpha: 0 }, { alpha: 1 }, 0.5),
                                                    this.delay - 1.5
                                                ),
                                                Tween.delay(
                                                    Tween.parallel(
                                                        Tween.tween(charNode, {
                                                            x: charNode.x + 2 * charNode.width,
                                                            y: charNode.y - 2 * charNode.height
                                                        }, {
                                                            x: charNode.x,
                                                            y: charNode.y
                                                        }, 0.4 ),
                                                        Tween.serial(Tween.tween(charNode, { rotationZ : - 20 }, {rotationZ : 0}, 0.2),
                                                            Tween.tween(charNode, {rotationZ : - 540} , {rotationZ: -20}, flyingDelay - 0.2))
                                                        ),
                                                    this.delay - flyingDelay - 0.3
                                                )
                                            )
                                        );
                                        charNode.scaleX = 1.0;
                                        charNode.scaleY = 1.0;
                                    }
                                    else
                                        tweens.push(Tween.serial(
                                            Tween.tween(charNode, { alpha: 1 }, { alpha: 0 }, 0.3),
                                            Tween.delay(
                                                Tween.tween(charNode, { alpha: 0 }, { alpha: 1 }, 0.5),
                                                this.delay - 0.8
                                            )
                                        ));
                                }

                                this.pushTween(Tween.parallel.apply(null, tweens));
                                this.delay = this.computeDuration();

                                this.pushTween(Tween.serial(
                                    Tween.tween(this.textBox.canvas, { alpha: 1.0 }, { alpha: 0.0 }, 0.3),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, { alpha: 0.0 }, { alpha: 1.0 }, 0.3),
                                        this.delay - 0.6
                                    )
                                ));
                            };

                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);

                            this.originalDelay = this.delay;
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_alpha(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.textBox.rearrange({ isHorizontallyCentered : true });
                            this.pushTween(
                                Tween.serial(
                                    Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                        this.delay - 1
                                    )
                                )
                            );
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_alpha_final(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.textBox.rearrange({ isHorizontallyCentered : true });
                            this.pushTween(
                                Tween.serial(
                                    Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                        this.delay - 1
                                    )
                                )
                            );
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                            this.textBox.canvas.filters = [$.createDropShadowFilter(3, 219.9998, 0, 0.7, 10, 10, 0.5, 3)];
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_alpha_black(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0x000000);
                        },
                        onInit: function() {
                            this.textBox.rearrange({ isHorizontallyCentered : true });
                            this.pushTween(
                                Tween.serial(
                                    Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                        this.delay - 1
                                    )
                                )
                            );
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_regret(text, initalValues, col) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(col);
                        },
                        onInit: function() {
                            this.resetEffects = function(){
                                this.textBox.rearrange({ isHorizontallyCentered : true });
                                if (this.textBox.canvas.x < 543/2)
                                    this.pushTween(
                                        Tween.parallel(
                                            Tween.tween(this.textBox.canvas, {x: this.textBox.canvas.x + 100}, {x: this.textBox.canvas.x}, this.delay),
                                            Tween.serial(
                                                Tween.tween(this.textBox.canvas, {alpha: 0.7}, {alpha: 0.0}, 1),
                                                Tween.delay(
                                                    Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 0.7}, 1),
                                                    this.delay - 2
                                                )
                                            )
                                        )
                                    );
                                else
                                    this.pushTween(
                                        Tween.parallel(
                                            Tween.tween(this.textBox.canvas, {x: this.textBox.canvas.x - 100}, {x: this.textBox.canvas.x}, this.delay - 0.5),
                                            Tween.serial(
                                                Tween.tween(this.textBox.canvas, {alpha: 0.7}, {alpha: 0.0}, 1),
                                                Tween.delay(
                                                    Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 0.7}, 1),
                                                    this.delay - 2
                                                )
                                            )
                                        )
                                    );
                            };
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            this.textBox.canvas.scaleX = 1.8;
                            this.textBox.canvas.scaleY = 1.8;
                            this.textBox.canvas.alpha = 0.7;
                            setCanvasValues(this.textBox.canvas, initalValues);
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_yumega(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xcccccc);
                        },
                        onInit: function() {
                            this.textBox.rearrange({ isHorizontallyCentered : true });
                            this.pushTween(
                                Tween.serial(
                                    Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                        this.delay - 1
                                    )
                                )
                            );
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                            this.textBox.canvas.filters = [$.createGlowFilter(0xFFffff, 0.9, 30 , 30 , 5 , 3)];
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_kotoba(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0x999999);
                        },
                        onInit: function() {
                            this.textBox.rearrange({ isHorizontallyCentered : true });
                            this.pushTween(
                                Tween.serial(
                                    Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                        this.delay - 1
                                    )
                                )
                            );
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                            this.textBox.canvas.filters = [$.createGlowFilter(0xFFffff, 1, 50 , 50 , 20 , 3)];
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_Gannbare(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.textBox.rearrange({ isHorizontallyCentered : true });
                            this.pushTween(
                                Tween.serial(
                                    Tween.parallel(
                                        Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                        Tween.serial(
                                            Tween.tween(this.textBox.canvas, { scaleX: 0.8, scaleY: 1.2 }, { scaleX: 1.0, scaleY: 1.0 }, 0.2),
                                            Tween.tween(this.textBox.canvas, { scaleX: 1.1, scaleY: 0.9 }, { scaleX: 0.8, scaleY: 1.2 }, 0.2),
                                            Tween.tween(this.textBox.canvas, { scaleX: 1.0, scaleY: 1.0 }, { scaleX: 1.1, scaleY: 0.9 }, 0.1)
                                            )
                                    ),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                        this.delay - 1
                                    )
                                )
                            );
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_explosive(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xFFffff);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });

                                // clear
                                this.tweens.length = 0;

                                var scale = Math.min($.width / layers.width, $.height / layers.height);
                                var length = this.text.length;

                                for (var i = 0; i < length; ++i)
                                    (this.textBox.canvas.getChildAt(i)).filters = [$.createBlurFilter(0, 0, 3)];

                                var indexes = [];
                                for (var i = 0; i < length; ++i)
                                    indexes.push(i);

                                var tweens = [];
                                for (var i = 0; i < length; ++i) {
                                    var rand = Utils.rand(0, indexes.length);
                                    var charIndex = indexes[rand ^ 0];
                                    indexes.splice(rand, 1);

                                    if (this.text.charAt(charIndex) == ' ')
                                        continue;

                                    
                                    var charNode = this.textBox.canvas.getChildAt(charIndex);

                                    tweens.push(
                                        Tween.serial(
                                            Tween.parallel(
                                                Tween.tween(charNode, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                                Tween.serial(
                                                    Tween.tween(charNode, { scaleX: 1.3, scaleY: 1.3 }, { scaleX: 1.0, scaleY: 1.0 }, 0.2),
                                                    Tween.tween(charNode, { scaleX: 0.9, scaleY: 0.9 }, { scaleX: 1.3, scaleY: 1.3 }, 0.2),
                                                    Tween.tween(charNode, { scaleX: 1.1, scaleY: 1.1 }, { scaleX: 0.9, scaleY: 0.9 }, 0.15),
                                                    Tween.tween(charNode, { scaleX: 0.9, scaleY: 0.9 }, { scaleX: 1.1, scaleY: 1.1 }, 0.15)
                                                ),
                                                Tween.serial(
                                                    Tween.tween(charNode, { rotationX: 45, rotationY: 15, rotationZ: -8}, { rotationX: 0, rotationY: 0, rotationZ: 0}, 0.2),
                                                    Tween.tween(charNode, { rotationX: -30, rotationY: -10, rotationZ: 4}, { rotationX: 45, rotationY: 15, rotationZ: -8}, 0.2),
                                                    Tween.tween(charNode, { rotationX: 0, rotationY: 0, rotationZ: 0}, { rotationX: -30, rotationY: -10, rotationZ: 4}, 0.15)
                                                )
                                            ),
                                            Tween.delay(
                                                Tween.tween(charNode, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                                this.delay - 1.2
                                            )
                                        )
                                    );
                                }

                                this.pushTween(Tween.parallel.apply(null, tweens));
                                this.delay = this.computeDuration();

                                this.pushTween(Tween.serial(
                                    Tween.tween(this.textBox.canvas, { alpha: 1.0 }, { alpha: 0.0 }, 0.3),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, { alpha: 0.0 }, { alpha: 1.0 }, 0.3),
                                        this.delay - 0.6
                                    )
                                ));
                            };

                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                            this.textBox.canvas.filters = [$.createDropShadowFilter(3, 219.9998, 0, 0.5, 5, 5, 0.5, 3)];

                            this.originalDelay = this.delay;
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_HeartBeat(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });
                                var locY = this.textBox.canvas.y;
                                var beatDelay = this.delay / 8;
                                var lrcHeight = this.textBox.canvas.height;
                                this.pushTween(
                                    Tween.serial(
                                        Tween.parallel(
                                            Tween.tween(this.textBox.canvas, { alpha: 1.0 }, { alpha: 0.0 }, 0.4 * beatDelay),
                                            Tween.tween(this.textBox.canvas, { scaleX: 1.3, scaleY: 1.3 }, { scaleX: 1.0, scaleY: 1.0 }, 0.4 * beatDelay),
                                            Tween.tween(this.textBox.canvas, { y: locY - 0.15 * lrcHeight }, {  y: locY }, 0.4 * beatDelay)
                                        ),

                                        Tween.repeat(
                                            Tween.serial(
                                                Tween.parallel(
                                                    Tween.tween(this.textBox.canvas, { scaleX: 1.0, scaleY: 1.0 }, { scaleX: 1.3, scaleY: 1.3 }, 0.6 * beatDelay),
                                                    Tween.tween(this.textBox.canvas, { y: locY }, {  y: locY - 0.15 * lrcHeight }, 0.6 * beatDelay)
                                                ),
                                                Tween.parallel(
                                                    Tween.tween(this.textBox.canvas, { scaleX: 1.3, scaleY: 1.3 }, { scaleX: 1.0, scaleY: 1.0 }, 0.4 * beatDelay),
                                                    Tween.tween(this.textBox.canvas, { y: locY - 0.15 * lrcHeight }, {  y: locY }, 0.4 * beatDelay)
                                                )
                                            ),
                                        4),

                                        Tween.parallel(
                                            
                                            Tween.tween(this.textBox.canvas,  { scaleX: 1.0, scaleY: 1.0 }, { scaleX: 1.3, scaleY: 1.3 }, this.delay - 4.4 * beatDelay),
                                            Tween.tween(this.textBox.canvas, { y: locY }, { y: locY - 0.15 * lrcHeight }, this.delay - 4.4 * beatDelay),
                                            Tween.delay(
                                                Tween.tween(this.textBox.canvas, { alpha: 0.0 }, { alpha: 1.0 }, 0.5), 
                                                this.delay - 4.4 * beatDelay - 0.5
                                            )
                                        )
                                    )

                                );
                            };
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_shoutOut(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });
                                var locY = this.textBox.canvas.y;
                                var beatDelay = this.delay / 8;
                                var lrcHeight = this.textBox.canvas.height;
                                this.pushTween(
                                    Tween.serial(
                                        Tween.parallel(
                                            Tween.tween(this.textBox.canvas, { alpha: 1.0 }, { alpha: 0.0 }, 0.4 * beatDelay),
                                            Tween.tween(this.textBox.canvas, { scaleX: 1.3, scaleY: 1.3 }, { scaleX: 1.0, scaleY: 1.0 }, 0.4 * beatDelay),
                                            Tween.tween(this.textBox.canvas, { y: locY - 0.15 * lrcHeight }, {  y: locY }, 0.4 * beatDelay)
                                        ),

                                        Tween.repeat(
                                            Tween.serial(
                                                Tween.parallel(
                                                    Tween.tween(this.textBox.canvas, { scaleX: 1.0, scaleY: 1.0 }, { scaleX: 1.3, scaleY: 1.3 }, 0.6 * beatDelay),
                                                    Tween.tween(this.textBox.canvas, { y: locY }, {  y: locY - 0.15 * lrcHeight }, 0.6 * beatDelay)
                                                ),
                                                Tween.parallel(
                                                    Tween.tween(this.textBox.canvas, { scaleX: 1.3, scaleY: 1.3 }, { scaleX: 1.0, scaleY: 1.0 }, 0.4 * beatDelay),
                                                    Tween.tween(this.textBox.canvas, { y: locY - 0.15 * lrcHeight }, {  y: locY }, 0.4 * beatDelay)
                                                )
                                            ),
                                        4),
                                        Tween.parallel(
                                            Tween.tween(this.textBox.canvas, { scaleX: 1.0, scaleY: 1.0 }, { scaleX: 1.3, scaleY: 1.3 }, 0.6 * beatDelay),
                                            Tween.tween(this.textBox.canvas, {  y: locY }, { y: locY - 0.15 * lrcHeight }, 0.6 * beatDelay)
                                        ),
                                        Tween.delay(
                                            Tween.tween(this.textBox.canvas, { alpha: 0.0 }, { alpha: 1.0 }, 0.5), 
                                            this.delay - 5 * beatDelay - 0.5
                                        )
                                    )
                                );
                            };
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                            this.textBox.canvas.filters = [$.createDropShadowFilter(3, 219.9998, 0, 0.5, 5, 5, 0.5, 3)];
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_float(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });
                                var locY = this.textBox.canvas.y;
                                this.pushTween(
                                    Tween.serial(
                                        Tween.parallel(
                                            Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                            Tween.tween(this.textBox.canvas, { y: locY }, { y: locY + 20 }, 0.5)
                                        ),
                                        Tween.delay(
                                            Tween.parallel(
                                                Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                                Tween.tween(this.textBox.canvas, { y: locY + 20 }, { y: locY }, 0.5)
                                            ),
                                            this.delay - 1
                                        )
                                    )
                                );
                            };
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_float_black(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0x000000);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });
                                var locY = this.textBox.canvas.y;
                                this.pushTween(
                                    Tween.serial(
                                        Tween.parallel(
                                            Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                            Tween.tween(this.textBox.canvas, { y: locY }, { y: locY + 20 }, 0.5, Quadratic)
                                        ),
                                        Tween.delay(
                                            Tween.parallel(
                                                Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                                Tween.tween(this.textBox.canvas, { y: locY + 20 }, { y: locY }, 0.5, Quadratic)
                                            ),
                                            this.delay - 1
                                        )
                                    )
                                );
                            };
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_danmuku_black(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0x000000);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ });
                                this.pushTween(
                                    Tween.tween(this.textBox.canvas, { x: - this.textBox.canvas.width - 20 }, { x: 550 }, this.delay, Quadratic)
                                );
                            };
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }


                function newLyricEvent_Jpn_leftEasingIn(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });
                                var locX = this.textBox.canvas.x;
                                this.pushTween(
                                    Tween.serial(
                                        Tween.parallel(
                                            Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                            Tween.tween(this.textBox.canvas, { x: locX }, { x: locX - 100 }, 0.5, Elastic)
                                        ),
                                        Tween.delay(
                                            Tween.parallel(
                                                Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                                Tween.tween(this.textBox.canvas, { x: locX + 100 }, { x: locX }, 0.5, Elastic)
                                            ),
                                            this.delay - 1
                                        )
                                    )
                                );
                            };
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_rightEasingIn(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });
                                var locX = this.textBox.canvas.x;
                                this.pushTween(
                                    Tween.serial(
                                        Tween.parallel(
                                            Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                            Tween.tween(this.textBox.canvas, { x: locX }, { x: locX + 100 }, 0.5, Elastic)
                                        ),
                                        Tween.delay(
                                            Tween.parallel(
                                                Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                                Tween.tween(this.textBox.canvas, { x: locX - 100 }, { x: locX }, 0.5, Elastic)
                                            ),
                                            this.delay - 1
                                        )
                                    )
                                );
                            };
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_kirai(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xcc0000);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });

                                // clear
                                this.tweens.length = 0;

                                var scale = Math.min($.width / layers.width, $.height / layers.height);
                                var length = this.text.length;

                                for (var i = 0; i < length; ++i)
                                    (this.textBox.canvas.getChildAt(i)).filters = [$.createBlurFilter(0, 0, 3)];

                                var indexes = [];
                                for (var i = 0; i < length; ++i)
                                    indexes.push(i);

                                var tweens = [];
                                for (var i = 0; i < length; ++i) {
                                    var rand = Utils.rand(0, indexes.length);
                                    var charIndex = indexes[rand ^ 0];
                                    indexes.splice(rand, 1);

                                    if (this.text.charAt(charIndex) == ' ')
                                        continue;

                                    
                                    var charNode = this.textBox.canvas.getChildAt(charIndex);
                                    var flyingDelay = 2;

                                    if (this.text.charAt(charIndex) == '嫌'){
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                                Tween.delay(
                                                    Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                                    this.delay - 1
                                                )
                                            )
                                        );
                                        charNode.y = charNode.y - 5;
                                        charNode.x = charNode.x - 2;
                                        charNode.scaleX = 1.3;
                                        charNode.scaleY = 1.3;
                                    }
                                    else
                                        tweens.push(Tween.serial(
                                            Tween.tween(charNode, { alpha: 1 }, { alpha: 0 }, 0.3),
                                            Tween.delay(
                                                Tween.tween(charNode, { alpha: 0 }, { alpha: 1 }, 0.5),
                                                this.delay - 0.8
                                            )
                                        ));
                                }

                                this.pushTween(Tween.parallel.apply(null, tweens));
                                this.delay = this.computeDuration();

                                this.pushTween(Tween.serial(
                                    Tween.tween(this.textBox.canvas, { alpha: 1.0 }, { alpha: 0.0 }, 0.3),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, { alpha: 0.0 }, { alpha: 1.0 }, 0.3),
                                        this.delay - 0.6
                                    )
                                ));
                            };

                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);

                            this.originalDelay = this.delay;
                            this.resetEffects();
                            
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_tooi(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });

                                // clear
                                this.tweens.length = 0;

                                var scale = Math.min($.width / layers.width, $.height / layers.height);
                                var length = this.text.length;

                                for (var i = 0; i < length; ++i)
                                    (this.textBox.canvas.getChildAt(i)).filters = [$.createBlurFilter(0, 0, 3)];

                                var indexes = [];
                                for (var i = 0; i < length; ++i)
                                    indexes.push(i);

                                var tweens = [];
                                for (var i = 0; i < length; ++i) {
                                    var rand = Utils.rand(0, indexes.length);
                                    var charIndex = indexes[rand ^ 0];
                                    indexes.splice(rand, 1);

                                    if (this.text.charAt(charIndex) == ' ')
                                        continue;

                                    
                                    var charNode = this.textBox.canvas.getChildAt(charIndex);
                                    var flyingDelay = 2;

                                    if (this.text.charAt(charIndex) == '遠'){
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                                Tween.delay(
                                                    Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.1),
                                                    this.delay - 2
                                                )
                                            )
                                        );
                                        charNode.y = charNode.y - 5;
                                        charNode.x = charNode.x - 2;
                                        charNode.scaleX = 1;
                                        charNode.scaleY = 1;
                                    }
                                }

                                this.pushTween(Tween.parallel.apply(null, tweens));
                                this.delay = this.computeDuration();

                                this.pushTween(Tween.serial(
                                    Tween.tween(this.textBox.canvas, { alpha: 1.0 }, { alpha: 0.0 }, 0.3),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, { alpha: 0.0 }, { alpha: 1.0 }, 0.3),
                                        this.delay - 0.6
                                    )
                                ));
                            };

                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);

                            this.originalDelay = this.delay;
                            this.resetEffects();
                            
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_tooi_others_left(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });
                                var locX = this.textBox.canvas.x;
                                this.pushTween(
                                    Tween.serial(
                                        Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                        Tween.delay(
                                            Tween.parallel(
                                                Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                                Tween.tween(this.textBox.canvas, { x: locX - 100 }, { x: locX }, 0.5, Elastic)
                                            ),
                                            this.delay - 1
                                        )
                                    )
                                );
                            };

                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);

                            this.originalDelay = this.delay;
                            this.resetEffects();
                            
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Jpn_tooi_others_right(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData1,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.resetEffects = function() {
                                this.textBox.rearrange({ isHorizontallyCentered : true });
                                var locX = this.textBox.canvas.x;
                                this.pushTween(
                                    Tween.serial(
                                        Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                        Tween.delay(
                                            Tween.parallel(
                                                Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                                Tween.tween(this.textBox.canvas, { x: locX + 100 }, { x: locX }, 0.5, Elastic)
                                            ),
                                            this.delay - 1
                                        )
                                    )
                                );
                            };

                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);

                            this.originalDelay = this.delay;
                            this.resetEffects();
                            
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Chinese_White(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData2,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xffffff);
                        },
                        onInit: function() {
                            this.textBox.rearrange({ isHorizontallyCentered : true });
                            this.pushTween(
                                Tween.serial(
                                    Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                        this.delay - 1
                                    )
                                )
                            );
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Chinese_Black(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData2,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0x000000);
                        },
                        onInit: function() {
                            this.textBox.rearrange({ isHorizontallyCentered : true });
                            this.pushTween(
                                Tween.serial(
                                    Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                        this.delay - 1
                                    )
                                )
                            );
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            setCanvasValues(this.textBox.canvas, initalValues);
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_Chinese_regret(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData_YaHei,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0x000000);
                        },
                        onInit: function() {
                            this.resetEffects = function(){
                                this.textBox.rearrange({ isHorizontallyCentered : true });
                                this.pushTween(
                                    Tween.serial(
                                        Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 1.5),
                                        Tween.delay(
                                            Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 1.5),
                                            this.delay - 3
                                        )
                                    )
                                );
                            };
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            this.textBox.canvas.scaleX = 0.9;
                            this.textBox.canvas.scaleY = 0.9;
                            setCanvasValues(this.textBox.canvas, initalValues);
                            this.textBox.canvas.filters = [$.createGlowFilter(0xcccccc, 1, 5, 5, 2, 3)];
                            this.resetEffects();
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

                function newLyricEvent_cast(text, initalValues) {
                    var lyricInfo = lyricInfos['' + text];
                    return newLyricEvent({
                        text: lyricInfo.text ? lyricInfo.text : text,
                        font: fontData_cast,
                        lyricInfo: lyricInfo,
                        canvasParent: layers.foreground,
                        userDefinedBeginFill: function(graphics) {
                            graphics.beginFill(0xFFffff);
                        },
                        onInit: function() {
                            this.textBox.rearrange({ });
                            this.pushTween(
                                Tween.serial(
                                    Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.5),
                                    Tween.delay(
                                        Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.5),
                                        this.delay - 1
                                    )
                                )
                            );
                            
                            this.textBox.canvas.x = 20;
                            this.textBox.canvas.y = 480;
                            this.textBox.canvas.scaleX = 0.65;
                            this.textBox.canvas.scaleY = 0.65;
                            setCanvasValues(this.textBox.canvas, initalValues);
                        },
                        onPlayerSizeChanged: function() {
                            this.resetEffects();
                        }
                    });
                }

/**************************************************************/
$G._set('newLyricEvent_Title', newLyricEvent_Title());
$G._set('newLyricEvent_Title_black', newLyricEvent_Title_black());

$G._set('newLyricEvent_Jpn_alpha', newLyricEvent_Jpn_alpha());
$G._set('newLyricEvent_Jpn_alpha_black', newLyricEvent_Jpn_alpha_black());
$G._set('newLyricEvent_Jpn_alpha_final', newLyricEvent_Jpn_alpha_final());
$G._set('newLyricEvent_Jpn_tooi', newLyricEvent_Jpn_tooi());
$G._set('newLyricEvent_Jpn_tooi_others_left', newLyricEvent_Jpn_tooi_others_left());
$G._set('newLyricEvent_Jpn_tooi_others_right', newLyricEvent_Jpn_tooi_others_right());
$G._set('newLyricEvent_Jpn_kirai', newLyricEvent_Jpn_kirai());
$G._set('newLyricEvent_Jpn_float', newLyricEvent_Jpn_float());
$G._set('newLyricEvent_Jpn_float_black', newLyricEvent_Jpn_float_black());
$G._set('newLyricEvent_Jpn_kotoba', newLyricEvent_Jpn_kotoba());
$G._set('newLyricEvent_Jpn_fly', newLyricEvent_Jpn_fly());
$G._set('newLyricEvent_Jpn_falling', newLyricEvent_Jpn_falling());
$G._set('newLyricEvent_Jpn_blur', newLyricEvent_Jpn_blur());
$G._set('newLyricEvent_Jpn_blur_black', newLyricEvent_Jpn_blur_black());
$G._set('newLyricEvent_Jpn_Gannbare', newLyricEvent_Jpn_Gannbare());
$G._set('newLyricEvent_Jpn_explosive', newLyricEvent_Jpn_explosive());
$G._set('newLyricEvent_Jpn_yumega', newLyricEvent_Jpn_yumega());
$G._set('newLyricEvent_Jpn_shoutOut', newLyricEvent_Jpn_shoutOut());
$G._set('newLyricEvent_Jpn_HeartBeat', newLyricEvent_Jpn_HeartBeat());
$G._set('newLyricEvent_Jpn_rightEasingIn', newLyricEvent_Jpn_rightEasingIn());
$G._set('newLyricEvent_Jpn_leftEasingIn', newLyricEvent_Jpn_leftEasingIn());
$G._set('newLyricEvent_Jpn_regret', newLyricEvent_Jpn_regret());
$G._set('newLyricEvent_Jpn_danmuku_black', newLyricEvent_Jpn_danmuku_black());

$G._set('newLyricEvent_Chinese_Black', newLyricEvent_Chinese_Black());
$G._set('newLyricEvent_Chinese_White', newLyricEvent_Chinese_White());
$G._set('newLyricEvent_Chinese_regret', newLyricEvent_Chinese_regret());

$G._set('newLyricEvent_cast', newLyricEvent_cast());


/**************************************************************/

if (playerState == 'playing'){
        Player.play();
        $$.loading.change(15);
    }