/****Main****/
                /**
                    EBFB(Event Based Framework for Biliscript) beta
                    Author: Xarple
                    This work is released to Public Domain, do whatever you want with it.
                */

                //by天則：施工过程中借鉴了许多菊苣的旧作，渣包现在这边道个歉了orz
                //部分代码搬运来源：av611177/12国人Singason By 毛酱；av411036 研究（ry By UHI



                function newCanvas(param) {
                    var object = $.createCanvas({});

                    ScriptManager.popEl(object);
                    if (param && param.parent)
                        param.parent.addChild(object);
                    else
                        $.root.addChild(object);

                    object.transform.matrix3D = null;
                    if (param)
                        setProperties(object, param, ['parent']);
                    return object;
                }

                function newShape(param) {
                    var object = $.createShape({});

                    ScriptManager.popEl(object);
                    if (param && param.parent)
                        param.parent.addChild(object);
                    else
                        $.root.addChild(object);

                    object.transform.matrix3D = null;
                    if (param)
                        setProperties(object, param, ['parent']);
                    return object;
                }


                function shapePrepared(shape, initalValues) {
                    if (initalValues.canvasParent)
                        initalValues.canvasParent.addChild(shape);
                    else {
                        var shapeCanvas = newCanvas({
                            parent: shapeLayer
                        });
                        shapeCanvas.addChild(shape);
                    }
                    shape.visible = true;
                    shape.alpha = 1;
                    shapeCanvas.alpha = 0.0;
                    return shapeCanvas;
                }

                function traceDetailedly(object, objectName) {
                    if (object == null) {
                        trace('null');
                        return;
                    }

                    function traceStringAtCurrentDepth(string) {
                        var advance = '';
                        for (var i = 0; i < nowDepth; ++i)
                            advance += '    ';
                        trace(advance + string);
                    }

                    function traceObject(obj, name) {
                        if (obj == null) {
                            if (name != '')
                                traceStringAtCurrentDepth('- ' + name + ': null');
                            return;
                        }

                        if (name != '')
                            traceStringAtCurrentDepth('- ' + name + ': ' + obj.toString());
                        else
                            traceStringAtCurrentDepth('- ' + obj.toString());

                        nowDepth++; {
                            foreach(obj, function(key, val) {
                                if (val != null)
                                    traceObject(val, key);
                            });
                        }
                        nowDepth--;
                    }

                    var nowDepth = 0;
                    traceObject(object, objectName == null ? '' : objectName);
                }

                function combineObjects(first, second, isOverwriteExisting) {
                    if (!first)
                        first = {};
                    if (!second)
                        return first;
                    foreach(second, function(key, val) {
                        if (isOverwriteExisting == false) {
                            if (first.hasOwnProperty(key))
                                return;
                        }

                        if (val != null)
                            first['' + key] = val;
                    });
                    return first;
                }

                function optional(value, defaultValue) {
                    return (value == null) ? defaultValue : value;
                }

                function setProperties(object, properties, ignores) {
                    if (ignores) {
                        foreach(properties, function(key, val) {
                            if (ignores.indexOf(key) == -1 && object.hasOwnProperty(key))
                                object['' + key] = val;
                        });
                    } else {
                        foreach(properties, function(key, val) {
                            if (object.hasOwnProperty(key))
                                object['' + key] = val;
                        });
                    }
                }

                var layers = {
                    background: newCanvas(),
                    foreground: newCanvas(),
                    width: 543,
                    height: 386
                };

                var shapeLayer = newCanvas({
                    parent: layers.background
                });


                /*****************************shapeData******************************/
                var shapeData = {

                    icon: $G._get("icon"),
                    colSmile: $G._get("colSmile"),
                    colEmotionA: $G._get("colEmotionA"),
                    colEmotionI: $G._get("colEmotionI"),
                    colEmotionU: $G._get("colEmotionU"),
                    colEmotionE: $G._get("colEmotionE"),
                    colEmotionO: $G._get("colEmotionO"),
                    colEmotionN: $G._get("colEmotionN"),
                    drop: $G._get("drop"),

                    BWemotionA: $G._get("BWemotionA"),
                    BWemotionI: $G._get("BWemotionI"),
                    BWemotionU: $G._get("BWemotionU"),
                    BWemotionE: $G._get("BWemotionE"),
                    BWemotionO: $G._get("BWemotionO"),
                    BWemotionN: $G._get("BWemotionN"),
                    BWSmile: $G._get("BWSmile"),
                    robot: $G._get("robot"),
                    BWFace: $G._get("BWFace"),

                    footprint: $G._get("footprint"),
                    ubl: $G._get("ubl"),

                    closedEyes: $G._get("closedEyes"),
                    openedEyes: $G._get("openedEyes"),
                    closedEyes_backup: $G._get("closedEyes2"),

                    CDBK: $G._get("CDBK")

                };

                var shapeCanvas = {
                    icon: shapePrepared(shapeData.icon, {}),
                    colSmile: shapePrepared(shapeData.colSmile, {}),
                    colEmotionA: shapePrepared(shapeData.colEmotionA, {}),
                    colEmotionI: shapePrepared(shapeData.colEmotionI, {}),
                    colEmotionU: shapePrepared(shapeData.colEmotionU, {}),
                    colEmotionE: shapePrepared(shapeData.colEmotionE, {}),
                    colEmotionO: shapePrepared(shapeData.colEmotionO, {}),
                    colEmotionN: shapePrepared(shapeData.colEmotionN, {}),
                    drop: shapePrepared(shapeData.drop, {}),

                    BWemotionA: shapePrepared(shapeData.BWemotionA, {}),
                    BWemotionI: shapePrepared(shapeData.BWemotionI, {}),
                    BWemotionU: shapePrepared(shapeData.BWemotionU, {}),
                    BWemotionE: shapePrepared(shapeData.BWemotionE, {}),
                    BWemotionO: shapePrepared(shapeData.BWemotionO, {}),
                    BWemotionN: shapePrepared(shapeData.BWemotionN, {}),
                    BWSmile: shapePrepared(shapeData.BWSmile, {}),
                    robot: shapePrepared(shapeData.robot, {}),
                    BWFace: shapePrepared(shapeData.BWFace, {}),

                    footprint: shapePrepared(shapeData.footprint, {}),
                    ubl: shapePrepared(shapeData.ubl, {}),

                    closedEyes: shapePrepared(shapeData.closedEyes, {}),
                    openedEyes: shapePrepared(shapeData.openedEyes, {}),
                    closedEyes_backup: shapePrepared(shapeData.closedEyes_backup, {}),

                    CDBK: shapePrepared(shapeData.CDBK, {})

                };

            /********************************Lyric Data************************************/


                var lyricInfos = {
                    'ODDS&ENDS': { startTime: 6, delay: 7, karaoke: [] },
                    '~Game Edit ver.~': { startTime: 6, delay: 7, karaoke: [] },
                    'ryo feat. HatsuneMiku': { startTime: 6, delay: 7, karaoke: [] },

                    'いつだって君は嗤われ者だ' : { startTime: 12.46, delay: 5, karaoke: [] },
                    '你一直是被嘲笑的一方' : { startTime: 12.46, delay: 4, karaoke: [] },
                    'やることなすことツイてなくて' : { startTime: 16.3, delay: 3.8, karaoke: [] },
                    '无论做什麼都不太顺利' : { startTime: 16.3, delay: 3.3, karaoke: [] },
                    '挙句に雨に降られ' : { startTime: 20, delay: 3, karaoke: [] },
                    '最後还有大雨倾盆' : { startTime: 20, delay: 3, karaoke: [] },
                    'お気にの傘は風で飛んでって' : { startTime: 23, delay: 3.5, karaoke: [] },
                    '喜欢的伞却也被风吹走' : { startTime: 23, delay: 3, karaoke: [] },
                    'そこのノラはご苦労様と' : { startTime: 26.5, delay: 2, karaoke: [] },
                    '路人说著你辛苦了' : { startTime: 26.5, delay: 2, karaoke: [] },
                    '足を踏んづけてった' : { startTime: 28.5, delay: 5, karaoke: [] },
                    '然后踩上一脚就走了' : { startTime: 28.5, delay: 5, karaoke: [] },

                    'ああ' : { startTime: 34, delay: 4, karaoke: [] },

                    'いつもどおり君は　　われ者だ' : { startTime: 38, delay: 3.8, karaoke: [] },
                    '　　嫌' : { startTime: 38, delay: 3.8, karaoke: [] },
                    '你和往常一样被厌恶著' : { startTime: 38, delay: 3.8, karaoke: [] },
                    'ざけられて' : { startTime: 42, delay: 3, karaoke: [] },
                    'なんにもせずとも' : { startTime: 42, delay: 3, karaoke: [] },
                    '遠' : { startTime: 42, delay: 3, karaoke: [] },
                    '即使什麼都不做却仍被疏远著' : { startTime: 42, delay: 3, karaoke: [] },
                    '努力をしてみるけど' : { startTime: 45, delay: 3.2, karaoke: [] },
                    '虽然试过努力' : { startTime: 45, delay: 3.2, karaoke: [] },
                    'その理由なんて' : { startTime: 48.3, delay: 3.3, karaoke: [] },
                    '「なんとなく？」' : { startTime: 48.3, delay: 3.3, karaoke: [] },
                    'で' : { startTime: 48.3, delay: 3.3, karaoke: [] },
                    '但他人理由却是「就是这麼觉得？」' : { startTime: 48.3, delay: 3.3, karaoke: [] },
                    '君は途方にくれて悲しんでた' : { startTime: 51.7, delay: 5, karaoke: [] },
                    '无计可施的你那样悲伤过' : { startTime: 51.7, delay: 4, karaoke: [] },

                    'なら' : { startTime: 56, delay: 1, karaoke: [] },
                    '那麼就来用我的声音吧' : { startTime: 57, delay: 2.8, karaoke: [] },
                    'あたしの声を使えばいいよ' : { startTime: 57, delay: 2.8, karaoke: [] },
                    '虽然也会有人感到难以理解' : { startTime: 59.8, delay: 2.8, karaoke: [] },
                    '人によっては理解不能で' : { startTime: 59.8, delay: 2.8, karaoke: [] },
                    '被说成刺耳或是糟糕的声音' : { startTime: 62.6, delay: 3.3, karaoke: [] },
                    'なんて耳障り　ひどい声だって' : { startTime: 62.6, delay: 3.3, karaoke: [] },
                    '尽管如此' : { startTime: 66, delay: 1.3, karaoke: [] },
                    '言われるけど' : { startTime: 66, delay: 1.3, karaoke: [] },


                    '虎の威を借るキツネの癖に' : { startTime: 62.8, delay: 5, karaoke: [] },
                    'やばあああああｗｗｗｗ' : { startTime: 64, delay: 5, karaoke: [] },
                    'うおおおおおおおおお' : { startTime: 61, delay: 5, karaoke: [] },
                    'なにこれ' : { startTime: 59.3, delay: 5, karaoke: [] },
                    'クソワロダｗｗｗｗｗｗ' : { startTime: 65.6, delay: 5, karaoke: [] },
                    'ｗｗｗｗｗｗ' : { startTime: 67, delay: 5, karaoke: [] },
                    'いいこえねｗ' : { startTime: 68, delay: 5, karaoke: [] },
                    'うわ' : { startTime: 64.9, delay: 5, karaoke: [] },

                    'きっと君の力になれる' : { startTime: 67.3, delay: 2, karaoke: [] },
                    '那也一定能够成为你的力量' : { startTime: 67.3, delay: 2, karaoke: [] },
                    'だからあたしを歌わせてみて' : { startTime: 69.3, delay: 2.8, karaoke: [] },
                    '所以来让我歌唱吧' : { startTime: 69.3, delay: 2.8, karaoke: [] },
                    'そう君の　君だけの言葉でさ' : { startTime: 72, delay: 10, karaoke: [] },
                    '就用你的 只属於你的话语吧' : { startTime: 72, delay: 10, karaoke: [] },

                    '綴って　連ねて' : { startTime: 82, delay: 5.5, karaoke: [] },
                    '编缀著 罗列著' : { startTime: 82, delay: 4.5, karaoke: [] },
                    'あたしがその思想（コトバ）を叫ぶから' : { startTime: 86, delay: 7, karaoke: [] },
                    '我会将这些话语喊出' : { startTime: 86, delay: 6, karaoke: [] },
                    '描いて　理想を' : { startTime: 92, delay: 5.5, karaoke: [] },
                    '描绘出 你的理想' : { startTime: 92, delay: 4.5, karaoke: [] },
                    'その思いは誰にも触れさせない' : { startTime: 97, delay: 6, karaoke: [] },
                    '这个愿望 我不会让任何人触碰' : { startTime: 97, delay: 4.5, karaoke: [] },
                    'ガラクタの声はそして響く' : { startTime: 102, delay: 2.5, karaoke: [] },
                    '然後废品的声音这样响起' : { startTime: 102, delay: 2.5, karaoke: [] },
                    'ありのままを不器用に繋いで' : { startTime: 104.5, delay: 2.5, karaoke: [] },
                    '这样笨拙而真实地' : { startTime: 104.5, delay: 2.5, karaoke: [] },
                    '目一杯に大声を上げる' : { startTime: 106.8, delay: 5, karaoke: [] },
                    '竭尽全力地大喊' : { startTime: 106.8, delay: 5, karaoke: [] },

                    '二人はどんなにたくさんの言葉を' : { startTime: 111.5, delay: 5.3, karaoke: [] },
                    '思いついたことだろう' : { startTime: 114.4, delay: 4.3, karaoke: [] },
                    '两个人会想到 不计其数的话语吧' : { startTime: 112, delay: 5, karaoke: [] },
                    'だけど今は何ひとつ思いつかなくて' : { startTime: 117, delay: 3.5, karaoke: [] },
                    '但现在却还一筹莫展' : { startTime: 117, delay: 3.5, karaoke: [] },
                    'だけどなにもかもわかった' : { startTime: 120.5, delay: 2.5, karaoke: [] },
                    '不过我已经全部明白' : { startTime: 120.5, delay: 2.5, karaoke: [] },
                    '「そうか、きっとこれは梦だ。' : { startTime: 123, delay: 2.5, karaoke: [] },
                    '「对了，这一定是梦吧。' : { startTime: 123, delay: 2.5, karaoke: [] },
                    '永遠に醒めない、君と会えた、そんな夢」' : { startTime: 125.5, delay: 10, karaoke: [] },
                    '永远不会醒来，是与你相遇了，这样的梦」' : { startTime: 125.5, delay: 10, karaoke: [] },

                    'ガラクタは幸せそうな表情（えがお）をしたまま' : { startTime: 136, delay: 6, karaoke: [] },
                    '废品露出著幸福的笑容' : { startTime: 136, delay: 6, karaoke: [] },
                    'どれだけ呼んでももう動かない' : { startTime: 142, delay: 4.2, karaoke: [] },
                    '怎样呼唤仍是一动不动' : { startTime: 142, delay: 4.2, karaoke: [] },
                    '望んだはずの结末に君は泣き叫ぶ' : { startTime: 146.2, delay: 6, karaoke: [] },
                    '本期待的结局中你哭喊著' : { startTime: 146.2, delay: 6, karaoke: [] },
                    '嘘だろ　嘘だろってそう泣き叫ぶ' : { startTime: 152.2, delay: 6, karaoke: [] },
                    '骗人的吧 这是骗人的吧 这样哭喊著' : { startTime: 152.2, delay: 6, karaoke: [] },

                    '「僕は無力だ、ガラクタ' : { startTime: 159.5, delay: 10, karaoke: [] },
                    '一つだって救えやしない」' : { startTime: 159.5, delay: 10, karaoke: [] },
                    '「我如此无力。' : { startTime: 159.5, delay: 4.2, karaoke: [] },
                    '连一个废品也拯救不了」' : { startTime: 163.5, delay: 6, karaoke: [] },

                    '想いは涙に' : { startTime: 169.5, delay: 9, karaoke: [] },
                    'ぽつりぽつりとその頬を濡らす' : { startTime: 169.5, delay: 9, karaoke: [] },
                    '感伤化作泪水' : { startTime: 169.5, delay: 4.5, karaoke: [] },
                    '一滴滴湿润了脸颊' : { startTime: 173.5, delay: 5, karaoke: [] },

                    'その時世界は途端にその色を大きく変える' : { startTime: 181, delay: 9, karaoke: [] },
                    '就在那时 世界中突然间色彩天翻地覆' : { startTime: 181, delay: 9, karaoke: [] },
                    '悲しみ' : { startTime: 190, delay: 2.2, karaoke: [] },
                    '喜び' : { startTime: 192, delay: 3.3, karaoke: [] },
                    '全てを一人とひとつは知った' : { startTime: 195, delay: 5, karaoke: [] },
                    '悲伤 喜悦 独自承担这一切' : { startTime: 190, delay: 10, karaoke: [] },

                    '言葉は歌になりこの世界を' : { startTime: 199.8, delay: 2.3, karaoke: [] },
                    '明白到这一点 话语化为歌声再次传递於世界间' : { startTime: 200, delay: 4, karaoke: [] },
                    '再び駆け巡る' : { startTime: 202, delay: 1.8, karaoke: [] },
                    '君のために' : { startTime: 203.5, delay: 1.5, karaoke: [] },
                    '为了你' : { startTime: 203.5, delay: 1.5, karaoke: [] },
                    'その声に意志を宿して' : { startTime: 204.7, delay: 5.5, karaoke: [] },
                    '在歌声中蕴藏心意' : { startTime: 204.7, delay: 5.5, karaoke: [] },
                    '今　想いが響く' : { startTime: 209.7, delay: 5.3, karaoke: [] },
                    '就在现在 唱出思念' : { startTime: 209.7, delay: 5.3, karaoke: [] },

                    'Danmuku: 天則' : { startTime: 217, delay: 7, karaoke: [] },
                    'Illustrator: 旭君' : { startTime: 217, delay: 7, karaoke: [] }

                };

            /********************************Font Data*************************************/

                var fontData1 = $G._get("fontData1");
                var fontData2 = $G._get("fontData2");
                var fontData_Demibold = $G._get("fontData_Demibold");
                var fontData_Script = $G._get("fontData_Script");
                var fontData_YaHei = $G._get("fontData_YaHei");
                var fontData_kai = $G._get("fontData_kai");
                var fontData_ximing = $G._get("fontData_ximing");
                var fontData_cast = $G._get("fontData_cast");



                function newRandomizer(initialSeed) {
                    return {
                        seed: optional(initialSeed, 0),
                        rand: function() {
                            this.seed = 40692 * (this.seed % 52774) - 3791 * (this.seed / 52774);
                            if (this.seed < 0)
                                this.seed += 2147483399;
                            return this.seed;
                        },
                        randRange: function(min, max) {
                            return (this.rand() % (max - min)) + min;
                        }
                    };
                };



                /*
                param:
                {
                    text: string,
                    font: FontData,
                    userDefinedBeginFill(graphics) || beginFill(0xffffff),
                    canvasParent || $.root,
                    isVerticalLayout || false;
                }
                */
                function newTextBox(param) {
                    var textBox = {
                        canvas: newCanvas({
                            parent: param.canvasParent
                        }),
                        text: param.text,
                        font: param.font,
                        userDefinedBeginFill: param.userDefinedBeginFill,

                        /*
                            arrangeParam || null
                        */
                        setText: function(text, arrangeParam) {
                            this.text = text;
                            while (this.canvas.numChildren)
                                this.canvas.removeChild(this.canvas.getChildAt(0));

                            var textLength = text.length;
                            for (var i = 0; i < textLength; ++i) {
                                var charShape = newCanvas({
                                    parent: this.canvas
                                });

                                var char = text.charAt(i);
                                if (char == '\n' || !this.font.hasOwnProperty(char))
                                    continue;

                                var glyphInfo = this.font['' + char];
                                if (glyphInfo.paths) {
                                    if (this.userDefinedBeginFill)
                                        this.userDefinedBeginFill(charShape.graphics);
                                    else
                                        charShape.graphics.beginFill(0xffffff);

                                    charShape.graphics.drawPath(glyphInfo.commands, glyphInfo.paths, 'nonZero');
                                    charShape.graphics.endFill();
                                }
                            }

                            this.rearrange(combineObjects({}, arrangeParam));
                        },

                        /*
                        param:
                        {
                            letterSpacing:number || 0.0,
                            isHorizontallyCentered:bool || false,
                            isVerticalCentered:bool || false,
                            isVerticalLayout:bool || false,
                            'index':
                            {
                                scale:number || 1.0,
                                letterSpacingOffset:number || 0.0,
                            }
                        }
                        */
                        rearrange: function(param) {
                            var letterSpacing = optional(param.letterSpacing, 0.0);
                            var isHorizontallyCentered = optional(param.isHorizontallyCentered, false);
                            var isVerticalCentered = optional(param.isVerticalCentered, false);
                            var isVerticalLayout = optional(param.isVerticalLayout, false);

                            var currentLineSize = isVerticalLayout ? this.font.width : this.font.height;
                            var penPos = {
                                x: 0,
                                y: 0
                            };
                            var prevChar = 0;

                            var charCount = this.canvas.numChildren;
                            for (var i = 0; i < charCount; ++i) {
                                var char = this.text.charAt(i);
                                if (char == '\n') {
                                    if (isVerticalLayout) {
                                        penPos.x += currentLineSize;
                                        penPos.y = 0;
                                    } else {
                                        penPos.x = 0;
                                        penPos.y += currentLineSize;
                                    }

                                    prevChar = 0;
                                    currentLineSize = isVerticalLayout ? this.font.width : this.font.height;
                                    continue;
                                }

                                var charShape = this.canvas.getChildAt(i);
                                var glyphInfo = this.font['' + char];

                                if (param.hasOwnProperty('' + i)) {
                                    var glyphAdjust = param['' + i];

                                    var scale = glyphAdjust.scale ? glyphAdjust.scale : 1.0;
                                    charShape.scaleX = scale;
                                    charShape.scaleY = scale;

                                    var charSize = isVerticalLayout ? charShape.width : charShape.height;
                                    if (charSize > currentLineSize)
                                        currentLineSize = charSize;

                                    if (!isVerticalLayout) {
                                        if (prevChar != 0 && glyphInfo.kernings.hasOwnProperty(prevChar))
                                            penPos.x += glyphInfo.kernings[prevChar].x * scale;
                                    }

                                    charShape.x = penPos.x;
                                    charShape.y = penPos.y;

                                    if (isVerticalLayout) {
                                        penPos.y += glyphInfo.advanceVert * scale + letterSpacing;
                                        if (glyphAdjust.letterSpacingOffset)
                                            penPos.y += glyphAdjust.letterSpacingOffset;
                                    } else {
                                        penPos.x += glyphInfo.advanceHori * scale + letterSpacing;
                                        if (glyphAdjust.letterSpacingOffset)
                                            penPos.x += glyphAdjust.letterSpacingOffset;
                                    }
                                } else {
                                    charShape.scaleX = 1;
                                    charShape.scaleY = 1;

                                    if (!isVerticalLayout) {
                                        if (prevChar != 0 && glyphInfo.kernings.hasOwnProperty(prevChar))
                                            penPos.x += glyphInfo.kernings[prevChar].x;
                                    }

                                    charShape.x = penPos.x;
                                    charShape.y = penPos.y;

                                    if (isVerticalLayout)
                                        penPos.y += glyphInfo.advanceVert + letterSpacing;
                                    else
                                        penPos.x += glyphInfo.advanceHori + letterSpacing;
                                }

                                prevChar = char;
                            }

                            if (isHorizontallyCentered) {
                                var halfWidth = (this.canvas.width / this.canvas.scaleX) / 2;

                                var charCount = this.canvas.numChildren;
                                for (var i = 0; i < charCount; ++i)
                                    (this.canvas.getChildAt(i)).x -= halfWidth;
                            }

                            if (isVerticalCentered) {
                                var halfHeight = (this.canvas.height / this.canvas.scaleY) / 2;

                                var charCount = this.canvas.numChildren;
                                for (var i = 0; i < charCount; ++i)
                                    (this.canvas.getChildAt(i)).y -= halfHeight;
                            }
                        }
                    };

                    textBox.setText(param.text);
                    return textBox;
                }


                /*
                param:
                {
                    startTime: number,
                    delay: number,
                    onInit() || null,
                    onPlay() || null,
                    onUpdate(localTime, deltaTime) || null,
                    onComplete() || null,
                    onPlayerSeeked(localTime) || null,
                    onPlayerSizeChanged() || null,
                    onPlayerStateChanged(playerState) || null,
                }
                */
                function newStandardEvent(param) {
                    return {
                        startTime: param.startTime,
                        delay: param.delay,
                        displayObjects: [],
                        tweens: [],
                        subEvents: [],
                        parentEvent: null,
                        onInit: function() {
                            if (param.onInit)
                                param.onInit.call(this);
                        },
                        onPlay: function() {
                            var displayObjectsCount = this.displayObjects.length;
                            for (var i = 0; i < displayObjectsCount; ++i)
                                this.displayObjects[i ^ 0].visible = true;

                            if (param.onPlay)
                                param.onPlay.call(this);
                        },
                        onUpdate: function(localTime, deltaTime) {
                            var tweenCount = this.tweens.length;
                            for (var i = 0; i < tweenCount; ++i)
                                this.tweens[i ^ 0].update(localTime);

                            if (param.onUpdate)
                                param.onUpdate.call(this, localTime, deltaTime);

                            if (this.subEvents.length) {
                                var length = this.subEvents.length;
                                for (var i = 0; i < length; ++i) {
                                    var event = this.subEvents[i ^ 0];

                                    if (!event.isPlaying && localTime - event.startTime > 0 && localTime - event.startTime < event.delay) {
                                        event.isPlaying = true;
                                        if (event.onPlay)
                                            event.onPlay();
                                    } else if (event.isPlaying && localTime - event.startTime >= event.delay) {
                                        event.isPlaying = false;
                                        if (event.onComplete)
                                            event.onComplete();
                                    }

                                    if (event.isPlaying && event.onUpdate)
                                        event.onUpdate(localTime - event.startTime, deltaTime);
                                }
                            }
                        },
                        onComplete: function() {
                            var displayObjectsCount = this.displayObjects.length;
                            for (var i = 0; i < displayObjectsCount; ++i)
                                this.displayObjects[i ^ 0].visible = false;

                            if (param.onComplete)
                                param.onComplete.call(this);
                        },
                        onPlayerSeeked: function(localTime) {
                            var displayObjectsCount = this.displayObjects.length;
                            if (localTime <= 0 || localTime >= this.delay) {
                                for (var i = 0; i < displayObjectsCount; ++i)
                                    this.displayObjects[i ^ 0].visible = false;
                            } else {
                                for (var i = 0; i < displayObjectsCount; ++i)
                                    this.displayObjects[i ^ 0].visible = true;
                            }

                            if (param.onPlayerSeeked)
                                param.onPlayerSeeked.call(this, localTime);

                            if (this.subEvents.length) {
                                var length = this.subEvents.length;
                                for (var i = 0; i < length; ++i) {
                                    var event = this.subEvents[i ^ 0];
                                    if (event.onPlayerSeeked)
                                        event.onPlayerSeeked(localTime - event.startTime);

                                    event.isPlaying = (localTime - event.startTime > 0 && localTime - event.startTime < event.delay);
                                }
                            }
                        },
                        onPlayerSizeChanged: function() {
                            if (param.onPlayerSizeChanged)
                                param.onPlayerSizeChanged.call(this);

                            if (this.subEvents.length) {
                                var length = this.subEvents.length;
                                for (var i = 0; i < length; ++i) {
                                    if (this.subEvents[i ^ 0].onPlayerSizeChanged)
                                        this.subEvents[i ^ 0].onPlayerSizeChanged();
                                }
                            }
                        },
                        onPlayerStateChanged: function(playerState) {
                            if (param.onPlayerStateChanged)
                                param.onPlayerStateChanged.call(this, playerState);

                            if (this.subEvents.length) {
                                var length = this.subEvents.length;
                                for (var i = 0; i < length; ++i) {
                                    if (this.subEvents[i ^ 0].onPlayerStateChanged)
                                        this.subEvents[i ^ 0].onPlayerStateChanged();
                                }
                            }
                        },
                        pushDisplayObject: function(displayObject) {
                            this.displayObjects.push(displayObject);
                            return displayObject;
                        },
                        pushTween: function(tween) {
                            this.tweens.push(tween);
                            return tween;
                        },
                        pushSubEvent: function(event) {
                            event.parentEvent = this;
                            event.isPlaying = false;
                            if (event.onInit)
                                event.onInit();
                            if (event.onPlayerSeeked)
                                event.onPlayerSeeked(0);
                            this.subEvents.push(event);
                            return event;
                        },
                        pushSubEventList: function(eventList) {
                            var length = eventList.length;
                            for (var i = 0; i < length; ++i)
                                this.pushSubEvent(eventList[i ^ 0]);
                        },
                        pushSubEventWithGlobalStartTime: function(event) {
                            event.parentEvent = this;
                            event.isPlaying = false;
                            if (event.onInit)
                                event.onInit();
                            if (event.onPlayerSeeked)
                                event.onPlayerSeeked(0);

                            var totalTime = this.startTime;
                            var e = this;
                            while (e.parentEvent != null) {
                                e = e.parentEvent;
                                totalTime += e.startTime;
                            }
                            event.startTime -= totalTime;

                            this.subEvents.push(event);
                            return event;
                        },
                        pushSubEventListWithGlobalStartTime: function(eventList) {
                            var length = eventList.length;
                            for (var i = 0; i < length; ++i)
                                this.pushSubEventWithGlobalStartTime(eventList[i ^ 0]);
                        },
                        computeDuration: function() {
                            var duration = this.delay;

                            var tweenCount = this.tweens.length;
                            for (var i = 0; i < tweenCount; ++i) {
                                var subDuration = this.tweens[i ^ 0].duration;
                                if (subDuration > duration)
                                    duration = subDuration;
                            }

                            var subEventCount = this.subEvents.length;
                            for (var i = 0; i < subEventCount; ++i) {
                                var subDuration = this.subEvents[i ^ 0].computeDuration() + this.subEvents[i ^ 0].startTime;
                                if (subDuration > duration)
                                    duration = subDuration;
                            }

                            return duration;
                        }
                    };
                }

                /*
                param:
                {
                    text: string,
                    font: FontData,
                    userDefinedBeginFill(graphics) || beginFill(0xffffff),
                    lyricInfo,
                    canvasParent || $.root,
                    onInit() || null,
                    onPlay() || null,
                    onUpdate(localTime, deltaTime) || null,
                    onComplete() || null,
                    onPlayerSeeked(localTime) || null,
                    onPlayerSizeChanged() || null,
                    onPlayerStateChanged(playerState) || null,
                }
                */
                function newLyricEvent(param) {
                    var eventParams = {
                        startTime: param.lyricInfo.startTime,
                        delay: param.lyricInfo.delay,
                        onInit: function() {
                            this.textBox = newTextBox({
                                text: param.text,
                                font: param.font,
                                userDefinedBeginFill: param.userDefinedBeginFill,
                                canvasParent: param.canvasParent
                            });
                            this.pushDisplayObject(this.textBox.canvas);

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

                    var lyricEvent = newStandardEvent(eventParams);

                    lyricEvent.text = param.text;
                    lyricEvent.font = param.font;
                    lyricEvent.lyricInfo = param.lyricInfo;

                    lyricEvent.onPlayCallbacks = [];
                    lyricEvent.onUpdateCallbacks = [];
                    lyricEvent.onCompleteCallbacks = [];
                    lyricEvent.onPlayerSeekedCallbacks = [];
                    lyricEvent.onPlayerSizeChangedCallbacks = [];
                    lyricEvent.onPlayerStateChangedCallbacks = [];

                    if (param.onPlay)
                        lyricEvent.onPlayCallbacks.push(param.onPlay);
                    if (param.onUpdate)
                        lyricEvent.onUpdateCallbacks.push(param.onUpdate);
                    if (param.onComplete)
                        lyricEvent.onCompleteCallbacks.push(param.onComplete);
                    if (param.onPlayerSeeked)
                        lyricEvent.onPlayerSeekedCallbacks.push(param.onPlayerSeeked);
                    if (param.onPlayerSizeChanged)
                        lyricEvent.onPlayerSizeChangedCallbacks.push(param.onPlayerSizeChanged);
                    if (param.onPlayerStateChanged)
                        lyricEvent.onPlayerStateChangedCallbacks.push(param.onPlayerStateChanged);

                    lyricEvent.applyFilterSeparately = function(filter) {
                        var length = this.textBox.canvas.numChildren;
                        for (var i = 0; i < length; ++i) {
                            var charShape = this.textBox.canvas.getChildAt(i);
                            if (!charShape.filters || charShape.filters.length == 0)
                                charShape.filters = [filter];
                            else
                                charShape.filters.push(filter);
                        }
                    };

                    return lyricEvent;
                }


                function newEventsDispatcher() {
                    return {
                        /*
                        event:
                        {
                            startTime: number,
                            delay: number,
                            onInit() || null,
                            onPlay() || null,
                            onUpdate(localTime, deltaTime) || null,
                            onComplete() || null,
                            onPlayerSeeked(localTime) || null,
                            onPlayerSizeChanged() || null,
                            onPlayerStateChanged(playerState) || null,

                            // internal:
                            isPlaying: bool,
                        }
                        */
                        run: function(events) {
                            var eventCount = events.length;
                            for (var i = 0; i < eventCount; ++i) {
                                var event = events[i ^ 0];
                                event.isPlaying = false;
                                if (event.onInit)
                                    event.onInit();
                                if (event.onPlayerSeeked)
                                    event.onPlayerSeeked(0);
                            }

                            var lastPlayerState = Player.state;
                            var lastWidth = 0;
                            var lastHeight = 0;

                            var currentSystemTime = getTimer() * 0.001;
                            var lastSystemTime = currentSystemTime;

                            var currentPlayerTime = Player.time;
                            var lastPlayerTime = currentPlayerTime;

                            var playerTimeInSeconds = 0;
                            var playerBaseTimeInSystem = 0;
                            var deltaTime = 0;

                            $.root.addEventListener('enterFrame', function() {
                                currentPlayerTime = Player.time * 0.001;
                                currentSystemTime = getTimer() * 0.001;
                                deltaTime = (currentSystemTime - lastSystemTime) * 0.001;
                                lastSystemTime = currentSystemTime;

                                if (lastPlayerState != Player.state) {
                                    lastPlayerState = Player.state;
                                    for (var i = 0; i < eventCount; ++i) {
                                        if (events[i ^ 0].onPlayerStateChanged)
                                            events[i ^ 0].onPlayerStateChanged(lastPlayerState);
                                    }
                                }

                                if (lastPlayerState == 'playing') {
                                    if (currentPlayerTime != lastPlayerTime) {
                                        lastPlayerTime = currentPlayerTime;
                                        playerBaseTimeInSystem = currentPlayerTime - currentSystemTime;
                                    } else
                                        playerTimeInSeconds = playerBaseTimeInSystem + currentSystemTime;

                                    if (Math.abs(currentPlayerTime - playerTimeInSeconds) >= 1) {
                                        playerTimeInSeconds = playerBaseTimeInSystem;

                                        for (var i = 0; i < eventCount; ++i) {
                                            var event = events[i ^ 0];

                                            if (event.onPlayerSeeked)
                                                event.onPlayerSeeked(playerTimeInSeconds - event.startTime);

                                            event.isPlaying = (playerTimeInSeconds - event.startTime > 0 && playerTimeInSeconds - event.startTime < event.delay);
                                        }
                                    }
                                }

                                if (lastWidth != $.width || lastHeight != $.height) {
                                    lastWidth = $.width;
                                    lastHeight = $.height;

                                    for (var i = 0; i < eventCount; ++i) {
                                        if (events[i ^ 0].onPlayerSizeChanged)
                                            events[i ^ 0].onPlayerSizeChanged();
                                    }
                                }

                                if (lastPlayerState == 'playing') {
                                    for (var i = 0; i < eventCount; ++i) {
                                        var event = events[i ^ 0];

                                        if (!event.isPlaying && playerTimeInSeconds - event.startTime > 0 && playerTimeInSeconds - event.startTime < event.delay) {
                                            event.isPlaying = true;
                                            if (event.onPlay)
                                                event.onPlay();
                                        } else if (event.isPlaying && playerTimeInSeconds - event.startTime >= event.delay) {
                                            event.isPlaying = false;
                                            if (event.onComplete)
                                                event.onComplete();
                                        }

                                        if (event.isPlaying && event.onUpdate)
                                            event.onUpdate(playerTimeInSeconds - event.startTime, deltaTime);
                                    }
                                }
                            });
                        }
                    };
                }



                function setCanvasValues(canvas, values) {
                    if (values) {
                        if (values.parent)
                            values.parent.addChild(canvas);
                        foreach(values, function(key, val) {
                            if (key != 'parent' && canvas.hasOwnProperty(key))
                                canvas['' + key] = val;
                        });
                    }
                }

                function setShapeValues(shape, values) {
                    if (values) {
                        if (values.parent)
                            values.parent.addChild(shape);
                        foreach(values, function(key, val) {
                            if (key != 'parent' && shape.hasOwnProperty(key))
                                shape['' + key] = val;
                        });
                    }
                }



                function getBackground(col, alpha) {
                    var background = newCanvas({
                        parent: layers.background
                    });
                    rectFill(background, -100, -100, 800, 600, optional(col, 0xffffff), optional(alpha, 1.0));
                    return background;
                }

                function rectFill(shape, x, y, width, height, color, alpha) {
                    shape.graphics.beginFill(optional(color, 0xffffff), optional(alpha, 1.0));
                    shape.graphics.drawRect(x, y, width, height);
                    shape.graphics.endFill();
                }

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




                if (!$G._get("exists")) {
                    $G._set("exists", true);

                    var eventsDispatcher = newEventsDispatcher();
                    eventsDispatcher.run(
                        [
                            newStandardEvent({
                                startTime: 0.0,
                                delay: 999999,
                                onPlayerSizeChanged: function() {
                                    var scale = Math.min($.width / layers.width, $.height / layers.height);
                                    var x = ($.width - (layers.width * scale)) / 2;
                                    var y = ($.height - (layers.height * scale)) / 2;

                                    layers.background.scaleX = scale;
                                    layers.background.scaleY = scale;
                                    layers.background.x = x;
                                    layers.background.y = y;
                                    layers.foreground.scaleX = scale;
                                    layers.foreground.scaleY = scale;
                                    layers.foreground.x = x;
                                    layers.foreground.y = y;
                                },
                                onUpdate: function(localTime, deltaTime) {
                                    var foregroundIndex = $.root.getChildIndex(layers.foreground);
                                    var backgroundIndex = $.root.getChildIndex(layers.background);
                                    if (foregroundIndex != $.root.numChildren - 1)
                                        $.root.swapChildrenAt(foreground, $.root.numChildren - 1);
                                    if (backgroundIndex != $.root.numChildren - 2)
                                        $.root.swapChildrenAt(background, $.root.numChildren - 2);
                                }
                            }),

                            newLyricEvent_Title('ODDS&ENDS', { y: 135, x: 543 / 2 }),
                            newLyricEvent_Title('~Game Edit ver.~', { y: 175, x: 543 / 2 }),
                            newLyricEvent_Title('ryo feat. HatsuneMiku', { y: 205, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 3,
                                delay: 3,
                                onInit: function() {
                                    shapeCanvas.icon.scaleX = 0.5;
                                    shapeCanvas.icon.scaleY = 0.5;
                                    shapeCanvas.icon.x = 543 / 2 - shapeCanvas.icon.width;
                                    shapeCanvas.icon.y = 386 / 2 - shapeCanvas.icon.height;
                                    this.pushDisplayObject(shapeCanvas.icon);
                                    this.pushTween(
                                        Tween.serial(
                                            Tween.tween(shapeCanvas.icon, { alpha: 1.0 }, { alpha: 0.0 }, 0.5),
                                            Tween.delay(
                                                Tween.tween(shapeCanvas.icon, { alpha: 0.0 }, { alpha: 1.0 }, 0.5),
                                                this.delay - 1
                                            )
                                        )
                                    );
                                }
                            }),

                            newLyricEvent_Jpn_blur('いつだって君は嗤われ者だ', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('你一直是被嘲笑的一方', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_falling('やることなすことツイてなくて', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('无论做什麼都不太顺利', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_alpha('挙句に雨に降られ', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('最後还有大雨倾盆', { y: 340, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 20,
                                delay: 20,
                                onInit: function() {
                                    this.resetEffects = function(){
                                        var lastRandNum = 0;
                                        function randNum(min,max){
                                              var nowRand = Utils.rand(min,max);
                                              if (Math.abs(nowRand - lastRandNum) > 150){
                                                    lastRandNum = nowRand;
                                                    return nowRand;
                                              }
                                              else return randNum(min,max);
                                        }

                                        function ame(){
                                            var shape = newShape({ parent : ameCanvas });
                                            var g = shape.graphics;
                                            g.lineStyle(1,16777215,1);
                                            /*--图层1--*/
                                            g.drawPath( $.toIntVector([1,2]),$.toNumberVector([3,3,3,33]));
                                            return shape;              
                                        }

                                        function setAmeCanvas(){
                                            var example = ame();
                                            example.alpha = 0;
                                            for (var i = 1; i < 101; ++i){
                                                var obj = ame();
                                                obj.y = i*0.7*obj.height + 20;
                                                obj.x = randNum(0, 543);
                                            }
                                            ameCanvas.height = 200*0.7*example.height;
                                            ameCanvas.width = 543;
                                            ameCanvas.x = 0;
                                            ameCanvas.y = - ameCanvas.height - 20;
                                            ameCanvas.visible = false;
                                        }

                                        var ameCanvas = newCanvas({parent: layers.background});
                                        setAmeCanvas();
                                        this.pushDisplayObject(ameCanvas);
                                        ameCanvas.visible = true;
                                        this.pushTween(Tween.tween(ameCanvas, { y: 500 }, { y: - ameCanvas.height - 20 }, 15));
                                    };
                                    this.resetEffects();
                                },
                                onComplete: function(){
                                    ameCanvas.visible = false;
                                }
                            }),

                            newLyricEvent_Chinese_White('喜欢的伞却也被风吹走', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_fly('お気にの傘は風で飛んでって', { y: 180, x: 543 / 2 }),
                            newStandardEvent({
                                startTime: 23,
                                delay: 7,
                                onInit: function() {
                                    shapeCanvas.ubl.scaleX = 0.6;
                                    shapeCanvas.ubl.scaleY = 0.6;
                                    shapeCanvas.ubl.x = 450;
                                    shapeCanvas.ubl.y = 260;
                                    shapeCanvas.ubl.rotationZ = 39;
                                    this.pushDisplayObject(shapeCanvas.ubl);
                                    this.pushTween(
                                        Tween.parallel(
                                            Tween.tween(shapeCanvas.ubl, { alpha: 1.0 }, { alpha: 0.0 }, 0.7),
                                            Tween.serial(
                                                Tween.parallel(
                                                    Tween.tween(shapeCanvas.ubl, { x: 390, y: 200 }, { x: 450, y: 260 }, 1.5, Elastic),
                                                    Tween.tween(shapeCanvas.ubl, { rotationZ : 80 }, { rotationZ : 39 }, 1.5)
                                                ),
                                                Tween.parallel(
                                                    Tween.tween(shapeCanvas.ubl, { x: 350, y: 180 }, { x: 390, y: 200 }, 1, Elastic),
                                                    Tween.tween(shapeCanvas.ubl, { rotationZ : 63 }, { rotationZ : 80 }, 1)
                                                ),
                                                Tween.parallel(
                                                    Tween.tween(shapeCanvas.ubl, { x: 230, y: 80 }, { x: 350, y: 180 }, 1.5, Elastic),
                                                    Tween.tween(shapeCanvas.ubl, { rotationZ : 0 }, { rotationZ : 63 }, 1.5),
                                                    Tween.tween(shapeCanvas.ubl, { rotationY : 720 }, { rotationY : 0 }, 1.5)
                                                ),
                                                Tween.parallel(
                                                    Tween.tween(shapeCanvas.ubl, { x: -100, y: -100 }, { x: 230, y: 80 }, 2, Elastic),
                                                    Tween.tween(shapeCanvas.ubl, { rotationZ : 74 }, { rotationZ : 0 }, 2)
                                                )
                                            )
                                        )
                                    );
                                }
                            }),
                            newLyricEvent_Chinese_White('路人说著你辛苦了', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_alpha('そこのノラはご苦労様と', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('然后踩上一脚就走了', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_alpha('足を踏んづけてった', { y: 180, x: 543 / 2 }),
                            newStandardEvent({
                                startTime: 28.8,
                                delay: 4,
                                onInit: function() {
                                    var footprint1 = shapeCanvas.footprint;
                                    footprint1.scaleX = 1;
                                    footprint1.scaleY = 1;
                                    footprint1.x = 543/2 - 1.9 * shapeCanvas.footprint.width ;
                                    footprint1.y = 386/2 - 1.2 * shapeCanvas.footprint.height / 2;
                                    footprint1.rotationZ = 39;
                                    this.pushDisplayObject(footprint1);
                                    this.pushTween(
                                        Tween.parallel(
                                            Tween.tween(footprint1, { alpha: 1.0 }, { alpha: 0.0 }, 0.5),
                                            Tween.serial(
                                                Tween.parallel(
                                                    Tween.tween(footprint1, { scaleX: 0.8, scaleY: 0.8 }, { scaleX: 1, scaleY: 1 }, 0.5),
                                                    Tween.tween(footprint1, { 
                                                        x: 543/2 - 1.8 * shapeCanvas.footprint.width , 
                                                        y: 386/2 - 0.8 * shapeCanvas.footprint.height / 2 
                                                    }, { 
                                                        x: 543/2 - 1.9 * shapeCanvas.footprint.width , 
                                                        y: 386/2 - 1 * shapeCanvas.footprint.height / 2 
                                                    }, 0.5)
                                                ),
                                                Tween.delay(
                                                    Tween.tween(footprint1, { alpha: 0 }, { alpha: 1 }, 0.5),
                                                    this.delay - 1
                                                )
                                            )
                                        )
                                    );
                                }
                            }),
                            newStandardEvent({
                                startTime: 30.2,
                                delay: 2.6,
                                onInit: function() {
                                    var footprint2 = shapeCanvas.footprint;
                                    footprint2.scaleX = 0.8;
                                    footprint2.scaleY = 0.8;
                                    footprint2.x = 543/2 + 1.1 * shapeCanvas.footprint.width ;
                                    footprint2.y = 386/2 - 0.6 * shapeCanvas.footprint.height / 2;
                                    footprint2.rotationZ = -26;
                                    this.pushDisplayObject(footprint2);
                                    this.pushTween(
                                        Tween.parallel(
                                            Tween.tween(footprint2, { alpha: 1.0 }, { alpha: 0.0 }, 0.5),
                                            Tween.serial(
                                                Tween.parallel(
                                                    Tween.tween(footprint2, { scaleX: 0.6, scaleY: 0.6 }, { scaleX: 0.8, scaleY: 0.8 }, 0.5),
                                                    Tween.tween(footprint2, { 
                                                        x: 543/2 + 1.2 * shapeCanvas.footprint.width , 
                                                        y: 386/2 - 0.8 * shapeCanvas.footprint.height / 2 
                                                    }, { 
                                                        x: 543/2 + 1.1 * shapeCanvas.footprint.width , 
                                                        y: 386/2 - 1 * shapeCanvas.footprint.height / 2 
                                                    }, 0.5)
                                                ),
                                                Tween.delay(
                                                    Tween.tween(footprint2, { alpha: 0 }, { alpha: 1 }, 0.5),
                                                    this.delay - 1
                                                )
                                            )
                                        )
                                    );
                                }
                            }),
                            newLyricEvent_Jpn_blur('ああ', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Jpn_alpha('いつもどおり君は　　われ者だ', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Jpn_kirai('　　嫌', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('你和往常一样被厌恶著', { y: 340, x: 543 / 2 }),

                            newLyricEvent_Jpn_tooi_others_right('ざけられて', { y: 180, x: 375 }),
                            newLyricEvent_Jpn_tooi('遠', { y: 185, x: 300 }),
                            newLyricEvent_Jpn_tooi_others_left('なんにもせずとも', { y: 180, x: 180 }),
                            newLyricEvent_Chinese_White('即使什麼都不做却仍被疏远著', { y: 340, x: 543 / 2 }),

                            newLyricEvent_Jpn_Gannbare('努力をしてみるけど', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('虽然试过努力', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_leftEasingIn('その理由なんて', { y: 140, x: 543 / 2 - 50 }),
                            newLyricEvent_Jpn_alpha('「なんとなく？」', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Jpn_rightEasingIn('で', { y: 220, x: 543 / 2 + 75}),
                            newLyricEvent_Chinese_White('但他人理由却是「就是这麼觉得？」', { y: 340, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 51.7,
                                delay: 4,
                                onInit: function() {
                                    shapeCanvas.drop.scaleX = 1;
                                    shapeCanvas.drop.scaleY = 1;
                                    shapeCanvas.drop.x = 543/2 - 0.5 * shapeCanvas.drop.width ;
                                    shapeCanvas.drop.y = 60;
                                    this.pushDisplayObject(shapeCanvas.drop);
                                    this.pushTween(
                                        Tween.parallel(
                                            Tween.tween(shapeCanvas.drop, { alpha: 0.4 }, { alpha: 0.0 }, 0.5),
                                            Tween.tween(shapeCanvas.drop, { y: 260 }, { y: 60 }, this.delay, Elastic),
                                            Tween.delay(
                                                Tween.tween(shapeCanvas.drop, { alpha: 0 }, { alpha: 0.4 }, 0.8),
                                                this.delay - 0.8
                                            )
                                        )
                                    );
                                }
                            }),

                            newLyricEvent_Jpn_blur('君は途方にくれて悲しんでた', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('无计可施的你那样悲伤过', { y: 340, x: 543 / 2 }),

                            newLyricEvent_Jpn_float('なら', { y: 180, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 56.7,
                                delay: 46.2,
                                onInit: function() {
                                    var whiteBackground = getBackground(0xffffff, 1.0);
                                    this.pushDisplayObject(whiteBackground);
                                    this.pushTween(
                                        Tween.serial(
                                            Tween.tween(whiteBackground, { alpha: 1.0 }, { alpha: 0.0 }, 0.3),
                                            Tween.delay(
                                                Tween.tween(whiteBackground, { alpha: 0 }, { alpha: 1 }, 0.5),
                                                this.delay - 0.8
                                            )
                                        )
                                    );
                                }
                            }),

                            newLyricEvent_Jpn_float_black('あたしの声を使えばいいよ', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_Black('那麼就来用我的声音吧', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_float_black('人によっては理解不能で', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_Black('虽然也会有人感到难以理解', { y: 340, x: 543 / 2 }),

                            newLyricEvent_Jpn_alpha_black('なんて耳障り　ひどい声だって', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_Black('被说成刺耳或是糟糕的声音', { y: 340, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 62.6,
                                delay: 3.5,
                                onInit: function() {
                                    var shape = newShape({ parent: layers.foreground });
                                    var g = shape.graphics;
                                    g.lineStyle(2,16777215,1);
                                    /*--图层1--*/
                                    g.drawPath( $.toIntVector([1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2]),$.toNumberVector([1,22,26,0,26,0,37,28,37,28,44,11,45,11,65,20,65,20,68,3,68,3,76,30,76,30,79,9,79,9,92,14,92,14,103,4,103,4,116,19,116,19,127,11,127,11,147,22,147,22,152,3,152,3,171,22,171,22,183,6,183,6,198,23]));
                                    shape.x = 543/2 - 1.8*shape.width/2;
                                    shape.y = 386/2 - 0.6*shape.height/2 + 3;
                                    shape.scaleX = 1.8;
                                    shape.scaleY = 0.6;
                                    this.pushDisplayObject(shape);
                                    this.pushTween(
                                        Tween.serial(
                                            Tween.tween(shape, { alpha: 1.0 }, { alpha: 0.0 }, 0.3),
                                            Tween.delay(
                                                Tween.tween(shape, { alpha: 0 }, { alpha: 1 }, 0.5),
                                                this.delay - 0.8
                                            )
                                        )
                                    );
                                }
                            }),

                            newLyricEvent_Jpn_float_black('言われるけど', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_Black('尽管如此', { y: 340, x: 543 / 2 }),

                            newLyricEvent_Jpn_danmuku_black('虎の威を借るキツネの癖に', { y: 70, x: 550 }),
                            newLyricEvent_Jpn_danmuku_black('やばあああああｗｗｗｗ', { y: 10, x: 550 }),
                            newLyricEvent_Jpn_danmuku_black('うおおおおおおおおお', { y: 40, x: 550 }),
                            newLyricEvent_Jpn_danmuku_black('なにこれ', { y: 10, x: 550 }),
                            newLyricEvent_Jpn_danmuku_black('クソワロダｗｗｗｗｗｗ', { y: 100, x: 550 }),
                            newLyricEvent_Jpn_danmuku_black('ｗｗｗｗｗｗ', { y: 10, x: 550 }),
                            newLyricEvent_Jpn_danmuku_black('いいこえねｗ', { y: 70, x: 550 }),
                            newLyricEvent_Jpn_danmuku_black('うわ', { y: 40, x: 550 }),

                            newLyricEvent_Jpn_float_black('きっと君の力になれる', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_Black('那也一定能够成为你的力量', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_float_black('だからあたしを歌わせてみて', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_Black('所以来让我歌唱吧', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Title_black('そう君の　君だけの言葉でさ', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_Black('就用你的 只属於你的话语吧', { y: 340, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 81,
                                delay: 31.5,
                                onInit: function() {
                                    shapeCanvas.BWFace.scaleX = 0.99;
                                    shapeCanvas.BWFace.scaleY = 0.99;
                                    shapeCanvas.BWFace.x = 0;
                                    shapeCanvas.BWFace.y = 0;
                                    shapeCanvas.BWSmile.scaleX = 0.99;
                                    shapeCanvas.BWSmile.scaleY = 0.99;
                                    shapeCanvas.BWSmile.x = 2;
                                    shapeCanvas.BWSmile.y = 2;
                                    shapeCanvas.BWemotionA.scaleX = 0.99;
                                    shapeCanvas.BWemotionA.scaleY = 0.99;
                                    shapeCanvas.BWemotionA.x = 2;
                                    shapeCanvas.BWemotionA.y = 2;
                                    shapeCanvas.BWemotionI.scaleX = 0.99;
                                    shapeCanvas.BWemotionI.scaleY = 0.99;
                                    shapeCanvas.BWemotionI.x = 2;
                                    shapeCanvas.BWemotionI.y = 2;
                                    shapeCanvas.BWemotionU.scaleX = 0.99;
                                    shapeCanvas.BWemotionU.scaleY = 0.99;
                                    shapeCanvas.BWemotionU.x = 2;
                                    shapeCanvas.BWemotionU.y = 2;
                                    shapeCanvas.BWemotionE.scaleX = 0.99;
                                    shapeCanvas.BWemotionE.scaleY = 0.99;
                                    shapeCanvas.BWemotionE.x = 2;
                                    shapeCanvas.BWemotionE.y = 2;
                                    shapeCanvas.BWemotionO.scaleX = 0.99;
                                    shapeCanvas.BWemotionO.scaleY = 0.99;
                                    shapeCanvas.BWemotionO.x = 2;
                                    shapeCanvas.BWemotionO.y = 2;
                                    shapeCanvas.BWemotionN.scaleX = 0.99;
                                    shapeCanvas.BWemotionN.scaleY = 0.99;
                                    shapeCanvas.BWemotionN.x = 2;
                                    shapeCanvas.BWemotionN.y = 2;
                                    shapeCanvas.robot.scaleX = 1.2;
                                    shapeCanvas.robot.scaleY = 1;
                                    shapeCanvas.robot.x = -20;
                                    shapeCanvas.robot.y = 2;

                                    layers.foreground.addChild(shapeCanvas.BWFace);
                                    layers.foreground.addChild(shapeCanvas.BWSmile);
                                    layers.foreground.addChild(shapeCanvas.BWemotionA);
                                    layers.foreground.addChild(shapeCanvas.BWemotionI);
                                    layers.foreground.addChild(shapeCanvas.BWemotionU);
                                    layers.foreground.addChild(shapeCanvas.BWemotionE);
                                    layers.foreground.addChild(shapeCanvas.BWemotionO);
                                    layers.foreground.addChild(shapeCanvas.BWemotionN);
                                    this.pushDisplayObject(shapeCanvas.BWFace);
                                    this.pushDisplayObject(shapeCanvas.BWSmile);
                                    this.pushDisplayObject(shapeCanvas.BWemotionA);
                                    this.pushDisplayObject(shapeCanvas.BWemotionI);
                                    this.pushDisplayObject(shapeCanvas.BWemotionU);
                                    this.pushDisplayObject(shapeCanvas.BWemotionE);
                                    this.pushDisplayObject(shapeCanvas.BWemotionO);
                                    this.pushDisplayObject(shapeCanvas.BWemotionN);
                                    this.pushDisplayObject(shapeCanvas.robot);
                                    this.pushTween(
                                        Tween.serial(
                                            Tween.parallel(
                                                Tween.tween(shapeCanvas.BWFace, { alpha: 1.0 }, { alpha: 0.0 }, 0.75),
                                                Tween.tween(shapeCanvas.BWSmile, { alpha: 1.0 }, { alpha: 0.0 }, 0.75)
                                            ),
                                            Tween.tween(shapeCanvas.BWSmile, { alpha: 0.0 }, { alpha: 1.0 }, 0),
                                            //綴って　
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 1 }, 0.8),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 1 }, 0.45),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 1 }, 1),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 0 }, { alpha: 1 }, 0),
                                            //
                                            Tween.tween(shapeCanvas.BWSmile, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWSmile, { alpha: 1 }, { alpha: 1 }, 0.4),
                                            Tween.tween(shapeCanvas.BWSmile, { alpha: 0 }, { alpha: 1 }, 0),
                                            //連ねて 
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 1 }, 0.3),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 1),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 1 }, 0.3),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 1 }, 0.5),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 0 }, { alpha: 1 }, 0),
                                            //あたしが
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 1 }, 0.1),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.5),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            //その思想（コトバ）を
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 1 }, 0.5),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionU, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionU, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionU, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 1 }, 0.3),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.3),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 1 }, 0.5),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 0 }, { alpha: 1 }, 0),
                                            //叫(さけ)ぶから
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.5),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionU, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionU, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionU, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.5),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.8),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            //描（えが）いて
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.8),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 1 }, 0.3),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 1 }, 1),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 0 }, { alpha: 1 }, 0),
                                            //理想を
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 1 }, 0.3),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 1 }, 0.5),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionU, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionU, { alpha: 1 }, { alpha: 1 }, 0.5),
                                            Tween.tween(shapeCanvas.BWemotionU, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 1 }, 1),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 0 }, { alpha: 1 }, 0),
                                            //その思いは誰にも
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 1 }, 0.5),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 1 }, 0.3),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 1 }, 0.1),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 1 }, 0.4),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 1 }, { alpha: 1 }, 0.5),
                                            Tween.tween(shapeCanvas.BWemotionO, { alpha: 0 }, { alpha: 1 }, 0),
                                            //触れさせない
                                            Tween.tween(shapeCanvas.BWemotionU, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionU, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionU, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 1 }, { alpha: 1 }, 0.4),
                                            Tween.tween(shapeCanvas.BWemotionE, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.2),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 1 }, 0.1),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 1 }, { alpha: 1 }, 0.5),
                                            Tween.tween(shapeCanvas.BWemotionA, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 1 }, { alpha: 1 }, 1),
                                            Tween.tween(shapeCanvas.BWemotionI, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(shapeCanvas.BWSmile, { alpha: 1 }, { alpha: 0 }, 0),
                                            Tween.parallel(
                                                Tween.tween(shapeCanvas.BWFace, { alpha: 0 }, { alpha: 1 }, 0.7), 
                                                Tween.tween(shapeCanvas.BWSmile, { alpha: 0 }, { alpha: 1 }, 0.7)
                                            ),//till now 21.6s

                                            Tween.tween(shapeCanvas.robot, { alpha: 0.7 }, { alpha: 0 }, 0.2),
                                            Tween.tween(shapeCanvas.robot, { alpha: 0.7 }, { alpha: 0.7 }, 8.5),
                                            Tween.tween(shapeCanvas.robot, { alpha: 0 }, { alpha: 0.7 }, 0.7)


                                            
                                        )
                                    );
                                }
                            }),

                            newLyricEvent_Jpn_blur_black('綴って　連ねて', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_Black('编缀著 罗列著', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_blur_black('あたしがその思想（コトバ）を叫ぶから', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_Black('我会将这些话语喊出', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_blur_black('描いて　理想を', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_Black('描绘出 你的理想', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_blur_black('その思いは誰にも触れさせない', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_Black('这个愿望 我不会让任何人触碰', { y: 340, x: 543 / 2 }),

                            newLyricEvent_Jpn_kotoba('ガラクタの声はそして響く', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('然後废品的声音这样响起', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_kotoba('ありのままを不器用に繋いで', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('这样笨拙而真实地', { y: 340, x: 543 / 2 }),

                            newLyricEvent_Jpn_HeartBeat('目一杯に大声を上げる', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('竭尽全力地大喊', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Title('二人はどんなにたくさんの言葉を', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Title('思いついたことだろう', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('两个人会想到 不计其数的话语吧', { y: 340, x: 543 / 2 }),

                            
                            newLyricEvent({
                                text: '人生',
                                font: fontData_Demibold,
                                lyricInfo: { startTime: 113, delay: 2, karaoke: [] },
                                canvasParent: layers.foreground,
                                userDefinedBeginFill: function(graphics) {
                                    graphics.beginFill(0xFFffff);
                                },
                                onInit: function() {
                                    this.resetEffects = function(){
                                        this.textBox.rearrange({ isHorizontallyCentered : true });
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.3),
                                                Tween.delay(
                                                    Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.3),
                                                    this.delay - 0.6
                                                )
                                            )
                                        );
                                    };
                                    
                                    this.textBox.canvas.x = 117;
                                    this.textBox.canvas.y = 79;
                                    this.textBox.canvas.rotationZ = -30;
                                    this.textBox.canvas.scaleX = 1;
                                    this.textBox.canvas.scaleY = 1;
                                    this.resetEffects();
                                },
                                onPlayerSizeChanged: function() {
                                    this.resetEffects();
                                }
                            }),

                            newLyricEvent({
                                text: '相遇',
                                font: fontData_ximing,
                                lyricInfo: { startTime: 113.6, delay: 2, karaoke: [] },
                                canvasParent: layers.foreground,
                                userDefinedBeginFill: function(graphics) {
                                    graphics.beginFill(0xFFffff);
                                },
                                onInit: function() {
                                    this.resetEffects = function(){
                                        this.textBox.rearrange({ isHorizontallyCentered : true });
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.3),
                                                Tween.delay(
                                                    Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.3),
                                                    this.delay - 0.6
                                                )
                                            )
                                        );
                                    };
                                    
                                    this.textBox.canvas.x = 385;
                                    this.textBox.canvas.y = 87;
                                    this.textBox.canvas.rotationZ = 14;
                                    this.textBox.canvas.rotationX = 10;
                                    this.textBox.canvas.scaleX = 1;
                                    this.textBox.canvas.scaleY = 1;
                                    this.resetEffects();
                                },
                                onPlayerSizeChanged: function() {
                                    this.resetEffects();
                                }
                            }),

                            newLyricEvent({
                                text: '汗水',
                                font: fontData_YaHei,
                                lyricInfo: { startTime: 114.3, delay: 2, karaoke: [] },
                                canvasParent: layers.foreground,
                                userDefinedBeginFill: function(graphics) {
                                    graphics.beginFill(0xFFffff);
                                },
                                onInit: function() {
                                    this.resetEffects = function(){
                                        this.textBox.rearrange({ isHorizontallyCentered : true });
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.3),
                                                Tween.delay(
                                                    Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.3),
                                                    this.delay - 0.6
                                                )
                                            )
                                        );
                                    };
                                    
                                    this.textBox.canvas.x = 171;
                                    this.textBox.canvas.y = 281;
                                    this.textBox.canvas.rotationY = -25;
                                    this.textBox.canvas.rotationX = 10;
                                    this.textBox.canvas.scaleX = 0.7;
                                    this.textBox.canvas.scaleY = 0.7;
                                    this.textBox.canvas.alpha = 0.7;
                                    this.resetEffects();
                                },
                                onPlayerSizeChanged: function() {
                                    this.resetEffects();
                                }
                            }),

                            newLyricEvent({
                                text: '精いっぱい',
                                font: fontData_ximing,
                                lyricInfo: { startTime: 115, delay: 2, karaoke: [] },
                                canvasParent: layers.foreground,
                                userDefinedBeginFill: function(graphics) {
                                    graphics.beginFill(0xFFffff);
                                },
                                onInit: function() {
                                    this.resetEffects = function(){
                                        this.textBox.rearrange({ isHorizontallyCentered : true });
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.3),
                                                Tween.delay(
                                                    Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.3),
                                                    this.delay - 0.6
                                                )
                                            )
                                        );
                                    };
                                    
                                    this.textBox.canvas.x = 423;
                                    this.textBox.canvas.y = 98;
                                    this.textBox.canvas.rotationZ = 45;
                                    this.textBox.canvas.rotationX = 10;
                                    this.textBox.canvas.scaleX = 0.6;
                                    this.textBox.canvas.scaleY = 0.6;
                                    this.textBox.canvas.alpha = 0.7;
                                    this.resetEffects();
                                },
                                onPlayerSizeChanged: function() {
                                    this.resetEffects();
                                }
                            }),

                            newLyricEvent({
                                text: '认真',
                                font: fontData_kai,
                                lyricInfo: { startTime: 116, delay: 2, karaoke: [] },
                                canvasParent: layers.foreground,
                                userDefinedBeginFill: function(graphics) {
                                    graphics.beginFill(0xFFffff);
                                },
                                onInit: function() {
                                    this.resetEffects = function(){
                                        this.textBox.rearrange({ isHorizontallyCentered : true });
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.3),
                                                Tween.delay(
                                                    Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.3),
                                                    this.delay - 0.6
                                                )
                                            )
                                        );
                                    };
                                    
                                    this.textBox.canvas.x = 349;
                                    this.textBox.canvas.y = 247;
                                    this.textBox.canvas.rotationZ = - 14;
                                    this.textBox.canvas.scaleX = 0.9;
                                    this.textBox.canvas.scaleY = 0.9;
                                    this.resetEffects();
                                },
                                onPlayerSizeChanged: function() {
                                    this.resetEffects();
                                }
                            }),

                            newLyricEvent({
                                text: '投入感情',
                                font: fontData_ximing,
                                lyricInfo: { startTime: 116.7, delay: 2, karaoke: [] },
                                canvasParent: layers.foreground,
                                userDefinedBeginFill: function(graphics) {
                                    graphics.beginFill(0xFFffff);
                                },
                                onInit: function() {
                                    this.resetEffects = function(){
                                        this.textBox.rearrange({ isHorizontallyCentered : true });
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.3),
                                                Tween.delay(
                                                    Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.3),
                                                    this.delay - 0.6
                                                )
                                            )
                                        );
                                    };
                                    
                                    this.textBox.canvas.x = 110;
                                    this.textBox.canvas.y = 230;
                                    this.textBox.canvas.scaleX = 1.3;
                                    this.textBox.canvas.scaleY = 1.3;
                                    this.textBox.canvas.alpha = 0.6;
                                    this.resetEffects();
                                },
                                onPlayerSizeChanged: function() {
                                    this.resetEffects();
                                }
                            }),

                            newLyricEvent({
                                text: 'えがお',
                                font: fontData_YaHei,
                                lyricInfo: { startTime: 117.3, delay: 2, karaoke: [] },
                                canvasParent: layers.foreground,
                                userDefinedBeginFill: function(graphics) {
                                    graphics.beginFill(0xFFffff);
                                },
                                onInit: function() {
                                    this.resetEffects = function(){
                                        this.textBox.rearrange({ isHorizontallyCentered : true });
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.3),
                                                Tween.delay(
                                                    Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.3),
                                                    this.delay - 0.6
                                                )
                                            )
                                        );
                                    };
                                    
                                    this.textBox.canvas.x = 152;
                                    this.textBox.canvas.y = 59;
                                    this.textBox.canvas.rotationZ = - 25;
                                    this.textBox.canvas.scaleX = 0.85;
                                    this.textBox.canvas.scaleY = 0.85;
                                    this.textBox.canvas.alpha = 0.95;
                                    this.resetEffects();
                                },
                                onPlayerSizeChanged: function() {
                                    this.resetEffects();
                                }
                            }),

                            newLyricEvent({
                                text: '希望',
                                font: fontData_YaHei,
                                lyricInfo: { startTime: 117.8, delay: 2, karaoke: [] },
                                canvasParent: layers.foreground,
                                userDefinedBeginFill: function(graphics) {
                                    graphics.beginFill(0xFFffff);
                                },
                                onInit: function() {
                                    this.resetEffects = function(){
                                        this.textBox.rearrange({ isHorizontallyCentered : true });
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.tween(this.textBox.canvas, {alpha: 1.0}, {alpha: 0.0}, 0.3),
                                                Tween.delay(
                                                    Tween.tween(this.textBox.canvas, {alpha: 0.0}, {alpha: 1.0}, 0.3),
                                                    this.delay - 0.6
                                                )
                                            )
                                        );
                                    };
                                    
                                    this.textBox.canvas.x = 400;
                                    this.textBox.canvas.y = 90;
                                    this.textBox.canvas.scaleX = 1.2;
                                    this.textBox.canvas.scaleY = 1.2;
                                    this.textBox.canvas.alpha = 0.75;
                                    this.resetEffects();
                                },
                                onPlayerSizeChanged: function() {
                                    this.resetEffects();
                                }
                            }),



                            newLyricEvent_Jpn_alpha('だけど今は何ひとつ思いつかなくて', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('但现在却还一筹莫展', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_alpha('だけどなにもかもわかった', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('不过我已经全部明白', { y: 340, x: 543 / 2 }),

                            newLyricEvent_Jpn_yumega('「そうか、きっとこれは梦だ。', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('「对了，这一定是梦吧。', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_yumega('永遠に醒めない、君と会えた、そんな夢」', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('永远不会醒来，是与你相遇了，这样的梦」', { y: 340, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 136,
                                delay: 10.3,
                                onInit: function() {
                                    this.resetEffects = function(){
                                        shapeCanvas.colSmile.scaleX = 1.48;
                                        shapeCanvas.colSmile.scaleY = 1.48;
                                        shapeCanvas.colSmile.x = -114;
                                        shapeCanvas.colSmile.y = -188;
                                        shapeCanvas.closedEyes.scaleX = 1.48;
                                        shapeCanvas.closedEyes.scaleY = 1.48;
                                        shapeCanvas.closedEyes.x = -114;
                                        shapeCanvas.closedEyes.y = -188;
                                        layers.foreground.addChild(shapeCanvas.colSmile);
                                        shapeCanvas.BWFace.filters = [$.createGlowFilter(0xffffff, 1, 3, 17, 1.3, 3)];
                                        shapeCanvas.BWSmile.filters = [$.createGlowFilter(0xffffff, 1, 3, 17, 1.3, 3)];
                                        this.pushDisplayObject(shapeCanvas.BWFace);
                                        this.pushDisplayObject(shapeCanvas.BWSmile);
                                        this.pushDisplayObject(shapeCanvas.colSmile);
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.parallel(
                                                    Tween.tween(shapeCanvas.BWFace, { y: 15 }, { y: 0 }, 0),
                                                    Tween.tween(shapeCanvas.BWSmile, { y: 17 }, { y: 2 }, 0),
                                                    Tween.tween(shapeCanvas.colSmile, { alpha: 0.8 }, { alpha: 0.0 }, 0.5),
                                                    Tween.tween(shapeCanvas.closedEyes, { alpha: 0.8 }, { alpha: 0.0 }, 0.5)
                                                ),
                                                Tween.parallel(
                                                    Tween.tween(shapeCanvas.colSmile, { alpha: 0.8 }, { alpha: 0.8 }, 5),
                                                    Tween.tween(shapeCanvas.closedEyes, { alpha: 0.8 }, { alpha: 0.8 }, 5)
                                                ),
                                                Tween.parallel(
                                                    Tween.tween(shapeCanvas.colSmile, { alpha: 0.0 }, { alpha: 0.8 }, 0.5),
                                                    Tween.tween(shapeCanvas.closedEyes, { alpha: 0.0 }, { alpha: 0.8 }, 0.5),
                                                    Tween.tween(shapeCanvas.BWSmile, { alpha: 1.0 }, { alpha: 0.0 }, 0.5),
                                                    Tween.tween(shapeCanvas.BWFace, { alpha: 1.0 }, { alpha: 0.0 }, 0.5)
                                                ),
                                                Tween.parallel(
                                                    Tween.tween(shapeCanvas.BWSmile, { alpha: 1.0 }, { alpha: 1.0 }, 3.8),
                                                    Tween.tween(shapeCanvas.BWFace, { alpha: 1.0 }, { alpha: 1.0 }, 3.8)
                                                ),
                                                Tween.parallel(
                                                    Tween.tween(shapeCanvas.BWSmile, { alpha: 0.0 }, { alpha: 1.0 }, 0.5),
                                                    Tween.tween(shapeCanvas.BWFace, { alpha: 0.0 }, { alpha: 1.0 }, 0.5)
                                                )
                                            )
                                        );
                                    };
                                    this.resetEffects();
                                }
                            }),

                            newLyricEvent_Jpn_alpha('ガラクタは幸せそうな表情（えがお）をしたまま', { y: 180, x: 543 / 2 , filters: [$.createDropShadowFilter(0, 0, 0, 0.6, 10, 10, 1, 3, false, false, true)] }),
                            newLyricEvent_Jpn_alpha('ガラクタは幸せそうな表情（えがお）をしたまま', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('废品露出著幸福的笑容', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_alpha('どれだけ呼んでももう動かない', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('怎样呼唤仍是一动不动', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_alpha('望んだはずの结末に君は泣き叫ぶ', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('本期待的结局中你哭喊著', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_alpha('嘘だろ　嘘だろってそう泣き叫ぶ', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('骗人的吧 这是骗人的吧 这样哭喊著', { y: 340, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 151.2,
                                delay: 12,
                                onInit: function() {
                                    this.drawNamita = function(x,y,radius){
                                        var shape = newShape({ parent: layers.foreground });
                                        var g = shape.graphics;
                                        g.lineStyle(4,16777215,1);
                                        g.drawCircle(x,y,radius);
                                        shape.alpha = 0;
                                        return shape;
                                    };
                                    var namita1 = this.drawNamita(450,230,10);
                                    var namita2 = this.drawNamita(450,230,30);
                                    var namita3 = this.drawNamita(450,230,50);
                                    var namita4 = this.drawNamita(110,225,21);
                                    var namita5 = this.drawNamita(110,225,50);
                                    var namita6 = this.drawNamita(110,225,94);
                                    this.pushDisplayObject(namita1);
                                    this.pushDisplayObject(namita2);
                                    this.pushDisplayObject(namita3);
                                    this.pushDisplayObject(namita4);
                                    this.pushDisplayObject(namita5);
                                    this.pushDisplayObject(namita6);
                                    
                                    this.pushTween(
                                        Tween.serial(
                                            Tween.tween(namita1, { alpha: 1 }, { alpha: 0.0 }, 0.5),
                                            Tween.tween(namita1, { alpha: 1 }, { alpha: 1 }, 0.7),
                                            Tween.tween(namita1, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(namita2, { alpha: 1 }, { alpha: 0.0 }, 0.5),
                                            Tween.tween(namita2, { alpha: 1 }, { alpha: 1 }, 0.7),
                                            Tween.tween(namita2, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(namita3, { alpha: 1 }, { alpha: 0.0 }, 0.5),
                                            Tween.tween(namita3, { alpha: 1 }, { alpha: 1 }, 0.7),
                                            Tween.tween(namita3, { alpha: 0 }, { alpha: 1 }, 0.5),

                                            Tween.tween(namita4, { alpha: 1 }, { alpha: 0.0 }, 0.5),
                                            Tween.tween(namita4, { alpha: 1 }, { alpha: 1 }, 0.7),
                                            Tween.tween(namita4, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(namita5, { alpha: 1 }, { alpha: 0.0 }, 0.3),
                                            Tween.tween(namita5, { alpha: 1 }, { alpha: 1 }, 0.7),
                                            Tween.tween(namita5, { alpha: 0 }, { alpha: 1 }, 0),
                                            Tween.tween(namita6, { alpha: 1 }, { alpha: 0.0 }, 0.5),
                                            Tween.tween(namita6, { alpha: 1 }, { alpha: 1 }, 0.7),
                                            Tween.tween(namita6, { alpha: 0 }, { alpha: 1 }, 0.5)
                                        )  
                                    );
                                }
                            }),

                            newStandardEvent({
                                startTime: 158.2,
                                delay: 100,
                                onInit: function() {
                                    var whiteBackground = getBackground(0xffffff, 1.0);
                                    this.pushDisplayObject(whiteBackground);
                                    this.pushTween(
                                        Tween.serial(
                                            Tween.tween(whiteBackground, { alpha: 1.0 }, { alpha: 0.0 }, 0.3),
                                            Tween.delay(
                                                Tween.tween(whiteBackground, { alpha: 0 }, { alpha: 1 }, 0.5),
                                                this.delay - 0.8
                                            )
                                        )
                                    );
                                }
                            }),


                            newLyricEvent_Jpn_regret('「僕は無力だ、ガラクタ', { y: 100, x: 543 / 4 + 20 } , 0xcccccc ),
                            newLyricEvent_Jpn_regret('一つだって救えやしない」', { y: 290, x: 543 / 4 * 3 + 20 } , 0xcccccc ),
                            newLyricEvent_Jpn_regret('「僕は無力だ、ガラクタ', { y: 80, x: 543 / 4 } , 0x444444 ),
                            newLyricEvent_Jpn_regret('一つだって救えやしない」', { y: 270, x: 543 / 4 * 3 } , 0x444444 ),
                            
                            newLyricEvent_Chinese_regret('「我如此无力。', { y: 185, x: 543 / 2 }),
                            newLyricEvent_Chinese_regret('连一个废品也拯救不了」', { y: 185, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 170,
                                delay: 12,
                                onInit: function() {
                                    this.drawNamita = function(x,y,radius){
                                        var shape = newShape({ parent: layers.foreground });
                                        var g = shape.graphics;
                                        g.beginFill(0x00ccff);
                                        g.drawCircle(x,y,radius);
                                        shape.alpha = 0;
                                        return shape;
                                    };
                                    var namita1 = this.drawNamita(450,230,30);
                                    var namita2 = this.drawNamita(323,189,43);
                                    var namita3 = this.drawNamita(123,329,56);
                                    var namita4 = this.drawNamita(90,295,51);
                                    var namita5 = this.drawNamita(283,90,41);
                                    var namita6 = this.drawNamita(147,134,64);
                                    var namita7 = this.drawNamita(234,130,25);
                                    var namita8 = this.drawNamita(493,280,20);
                                    this.pushDisplayObject(namita1);
                                    this.pushDisplayObject(namita2);
                                    this.pushDisplayObject(namita3);
                                    this.pushDisplayObject(namita4);
                                    this.pushDisplayObject(namita5);
                                    this.pushDisplayObject(namita6);
                                    this.pushDisplayObject(namita7);
                                    this.pushDisplayObject(namita8);
                                    
                                    this.pushTween(
                                        Tween.parallel(
                                            Tween.serial(
                                                Tween.tween(namita1, { alpha: 1 }, { alpha: 0.0 }, 0.2),
                                                Tween.tween(namita1, { alpha: 1 }, { alpha: 1 }, 0.8),
                                                Tween.tween(namita1, { alpha: 0 }, { alpha: 1 }, 0.5)
                                            ),
                                            Tween.delay(
                                                Tween.serial(
                                                    Tween.tween(namita2, { alpha: 1 }, { alpha: 0.0 }, 0.2),
                                                    Tween.tween(namita2, { alpha: 1 }, { alpha: 1 }, 0.8),
                                                    Tween.tween(namita2, { alpha: 0 }, { alpha: 1 }, 0.5)
                                                ), 1.5
                                            ),
                                            Tween.delay(
                                                Tween.serial(
                                                    Tween.tween(namita3, { alpha: 1 }, { alpha: 0.0 }, 0.2),
                                                    Tween.tween(namita3, { alpha: 1 }, { alpha: 1 }, 0.8),
                                                    Tween.tween(namita3, { alpha: 0 }, { alpha: 1 }, 0.5)
                                                ), 2.8
                                            ),
                                            Tween.delay(
                                                Tween.serial(
                                                    Tween.tween(namita4, { alpha: 1 }, { alpha: 0.0 }, 0.2),
                                                    Tween.tween(namita4, { alpha: 1 }, { alpha: 1 }, 0.8),
                                                    Tween.tween(namita4, { alpha: 0 }, { alpha: 1 }, 0.5)
                                                ), 4.1
                                            ),
                                            Tween.delay(
                                                Tween.serial(
                                                    Tween.tween(namita5, { alpha: 1 }, { alpha: 0.0 }, 0.2),
                                                    Tween.tween(namita5, { alpha: 1 }, { alpha: 1 }, 0.8),
                                                    Tween.tween(namita5, { alpha: 0 }, { alpha: 1 }, 0.5)
                                                ), 5.2
                                            ),
                                            Tween.delay(
                                                Tween.serial(
                                                    Tween.tween(namita6, { alpha: 1 }, { alpha: 0.0 }, 0.2),
                                                    Tween.tween(namita6, { alpha: 1 }, { alpha: 1 }, 0.8),
                                                    Tween.tween(namita6, { alpha: 0 }, { alpha: 1 }, 0.5)
                                                ), 6.3
                                            ),
                                            Tween.delay(
                                                Tween.serial(
                                                    Tween.tween(namita7, { alpha: 1 }, { alpha: 0.0 }, 0.2),
                                                    Tween.tween(namita7, { alpha: 1 }, { alpha: 1 }, 0.8),
                                                    Tween.tween(namita7, { alpha: 0 }, { alpha: 1 }, 0.5)
                                                ), 7.2
                                            ),
                                            Tween.delay(
                                                Tween.serial(
                                                    Tween.tween(namita8, { alpha: 1 }, { alpha: 0.0 }, 0.2),
                                                    Tween.tween(namita8, { alpha: 1 }, { alpha: 1 }, 0.8),
                                                    Tween.tween(namita8, { alpha: 0 }, { alpha: 1 }, 0.5)
                                                ), 8
                                            ),
                                            Tween.delay(
                                                Tween.serial(
                                                    Tween.tween(namita1, { alpha: 1 }, { alpha: 0.0 }, 0.2),
                                                    Tween.tween(namita1, { alpha: 1 }, { alpha: 1 }, 0.8),
                                                    Tween.tween(namita1, { alpha: 0 }, { alpha: 1 }, 0.5)
                                                ), 8.6
                                            ),
                                            Tween.delay(
                                                Tween.serial(
                                                    Tween.tween(namita4, { alpha: 1 }, { alpha: 0.0 }, 0.2),
                                                    Tween.tween(namita4, { alpha: 1 }, { alpha: 1 }, 0.8),
                                                    Tween.tween(namita4, { alpha: 0 }, { alpha: 1 }, 0.5)
                                                ), 9
                                            )
                                        )
                                    );
                                }
                            }),

                            newLyricEvent_Jpn_regret('想いは涙に', { y: 100, x: 543 / 4 + 20 } , 0xcccccc),
                            newLyricEvent_Jpn_regret('ぽつりぽつりとその頬を濡らす', { y: 290, x: 543 / 4 * 3 + 20 } , 0xcccccc ),
                            newLyricEvent_Jpn_regret('想いは涙に', { y: 80, x: 543 / 4 } , 0x444444),
                            newLyricEvent_Jpn_regret('ぽつりぽつりとその頬を濡らす', { y: 270, x: 543 / 4 * 3 } , 0x444444 ),
                            
                            newLyricEvent_Chinese_regret('感伤化作泪水', { y: 185, x: 543 / 2 }),
                            newLyricEvent_Chinese_regret('一滴滴湿润了脸颊', { y: 185, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 179,
                                delay: 46.2,
                                onInit: function() {
                                    this.drawBackground = function(x,y,radius,col){
                                        var background = newShape({ parent: layers.foreground });
                                        var g = background.graphics;
                                        g.beginFill(col);
                                        g.drawCircle(x,y,radius);
                                        g.endFill();
                                        background.alpha = 0;
                                        return background;
                                    };
                                    var orange1 = this.drawBackground(100,339,143,0xff9922);
                                    var green = this.drawBackground(441,87,188,0x48b4bd);
                                    var pink1 = this.drawBackground(404,332,185,0xffa4b7);
                                    var orange3 = this.drawBackground(266,57,89,0xfb7d19);
                                    var blue = this.drawBackground(85,109,160,0x3dad89);
                                    var pink2 = this.drawBackground(20,233,63,0xfa6990);
                                    var orange2 = this.drawBackground(304,186,144,0xeee2d6);

                                    this.pushDisplayObject(orange1);
                                    this.pushDisplayObject(green);
                                    this.pushDisplayObject(pink1);
                                    this.pushDisplayObject(orange3);
                                    this.pushDisplayObject(blue);
                                    this.pushDisplayObject(pink2);
                                    this.pushDisplayObject(orange2);

                                    this.pushTween(
                                        Tween.parallel(
                                            Tween.tween(orange1, { alpha: 1.0 }, { alpha: 0.0 }, 0),
                                            Tween.serial(
                                                Tween.delay( 
                                                    Tween.tween(green, { alpha: 1.0 }, { alpha: 0.0 }, 0),
                                                0.4),
                                                Tween.tween(green, { alpha: 1.0 }, { alpha: 1.0 }, this.delay - 0.4),
                                                Tween.tween(green, { alpha: 0.0 }, { alpha: 0.0 }, 0)
                                            ),
                                            Tween.serial(
                                                Tween.delay(
                                                    Tween.tween(orange2, { alpha: 1.0 }, { alpha: 0.0 }, 0), 
                                                1.8),
                                                Tween.tween(orange2, { alpha: 1.0 }, { alpha: 1.0 }, this.delay - 0.8),
                                                Tween.tween(orange2, { alpha: 0.0 }, { alpha: 0.0 }, 0)
                                            ),
                                            Tween.serial(
                                                Tween.delay(
                                                    Tween.tween(pink1, { alpha: 1.0 }, { alpha: 0.0 }, 0),   
                                                0.8),
                                                Tween.tween(pink1, { alpha: 1.0 }, { alpha: 1.0 }, this.delay - 1.2),
                                                Tween.tween(pink1, { alpha: 0.0 }, { alpha: 0.0 }, 0)
                                            ),
                                            Tween.serial(
                                                Tween.delay(
                                                    Tween.tween(orange3, { alpha: 1.0 }, { alpha: 0.0 }, 0),
                                                1.2),
                                                Tween.tween(orange3, { alpha: 1.0 }, { alpha: 1.0 }, this.delay - 1.4),
                                                Tween.tween(orange3, { alpha: 0.0 }, { alpha: 0.0 }, 0)
                                            ),
                                            Tween.serial(
                                                Tween.delay(
                                                    Tween.tween(blue, { alpha: 1.0 }, { alpha: 0.0 }, 0),
                                                1.4),
                                                Tween.tween(blue, { alpha: 1.0 }, { alpha: 1.0 }, this.delay - 1.6),
                                                Tween.tween(blue, { alpha: 0.0 }, { alpha: 0.0 }, 0)
                                            ),
                                            Tween.serial(
                                                Tween.delay(
                                                    Tween.tween(pink2, { alpha: 1.0 }, { alpha: 0.0 }, 0), 
                                                1.6),
                                                Tween.tween(pink2, { alpha: 1.0 }, { alpha: 1.0 }, this.delay - 1.8),
                                                Tween.tween(pink2, { alpha: 0.0 }, { alpha: 0.0 }, 0)
                                            )
                                        )
                                    );
                                }
                            }),

                            newStandardEvent({
                                startTime: 181,
                                delay: 10,
                                onInit: function() {
                                    this.drawCircle = function(radius,col){
                                        var cirle = newShape({ parent: layers.foreground });
                                        var g = cirle.graphics;
                                        g.beginFill(col);
                                        g.drawCircle(271,193,radius);
                                        g.endFill();
                                        cirle.alpha = 0;
                                        return cirle;
                                    };
                                    this.resetEffects = function (){

                                        var col = Utils.rand(0xff6600,0xffcc99); 
                                        var radius = Utils.rand(10,30);
                                        var circle = this.drawCircle(radius,col);
                                        var varX = Utils.rand(-300, 300);
                                        var varY = Utils.rand(-200, 200);
                                        var locX = circle.x;
                                        var locY = circle.y;
                                        this.pushDisplayObject(circle);
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.tween(circle, { alpha: 1.0 }, { alpha: 0.0 }, 0),
                                                Tween.tween(circle, { alpha: 1.0 }, { alpha: 1.0 }, 0.2),
                                                Tween.tween(circle, { x: locX - varX , y: locY - varY }, { x: locX, y: locY }, 0.8, Bounce),
                                                Tween.parallel(
                                                    Tween.tween(circle, { x: locX - varX * 1.5 , y: locY - varY + 300 }, { x: locX - varX , y: locY - varY }, 1, Bounce),
                                                    Tween.delay(
                                                        Tween.tween(circle, { alpha: 0.0 }, { alpha: 1.0 }, 0.5), 0.5
                                                    )
                                                )
                                            )
                                        );
                                    };
                                    for (var i = 0; i < 50; ++i)
                                        this.resetEffects();
                                    
                                }
                            }),

                            newStandardEvent({
                                startTime: 185,
                                delay: 10,
                                onInit: function() {
                                    this.drawCircle = function(radius,col){
                                        var cirle = newShape({ parent: layers.foreground });
                                        var g = cirle.graphics;
                                        g.beginFill(col);
                                        g.drawCircle(321,153,radius);
                                        g.endFill();
                                        cirle.alpha = 0;
                                        return cirle;
                                    };
                                    this.resetEffects = function (){

                                        var col = Utils.rand(0xff6600,0xffcc99); 
                                        var radius = Utils.rand(10,30);
                                        var circle = this.drawCircle(radius,col);
                                        var varX = Utils.rand(-300, 300);
                                        var varY = Utils.rand(-200, 200);
                                        var locX = circle.x;
                                        var locY = circle.y;
                                        this.pushDisplayObject(circle);
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.tween(circle, { alpha: 1.0 }, { alpha: 0.0 }, 0),
                                                Tween.tween(circle, { alpha: 1.0 }, { alpha: 1.0 }, 0.1),
                                                Tween.tween(circle, { x: locX - varX , y: locY - varY }, { x: locX, y: locY }, 0.8, Bounce),
                                                Tween.parallel(
                                                    Tween.tween(circle, { x: locX - varX * 1.5 , y: locY - varY + 300 }, { x: locX - varX , y: locY - varY }, 1, Bounce),
                                                    Tween.delay(
                                                        Tween.tween(circle, { alpha: 0.0 }, { alpha: 1.0 }, 0.5), 0.5
                                                    )
                                                )
                                            )
                                        );
                                    };
                                    for (var i = 0; i < 50; ++i)
                                        this.resetEffects();
                                    
                                }
                            }),

                            newStandardEvent({
                                startTime: 187,
                                delay: 10,
                                onInit: function() {
                                    this.drawCircle = function(radius,col){
                                        var cirle = newShape({ parent: layers.foreground });
                                        var g = cirle.graphics;
                                        g.beginFill(col);
                                        g.drawCircle(211,253,radius);
                                        g.endFill();
                                        cirle.alpha = 0;
                                        return cirle;
                                    };
                                    this.resetEffects = function (){

                                        var col = Utils.rand(0xff6600,0xffcc99); 
                                        var radius = Utils.rand(10,30);
                                        var circle = this.drawCircle(radius,col);
                                        var varX = Utils.rand(-300, 300);
                                        var varY = Utils.rand(-200, 200);
                                        var locX = circle.x;
                                        var locY = circle.y;
                                        this.pushDisplayObject(circle);
                                        this.pushTween(
                                            Tween.serial(
                                                Tween.tween(circle, { alpha: 1.0 }, { alpha: 0.0 }, 0),
                                                Tween.tween(circle, { alpha: 1.0 }, { alpha: 1.0 }, 0.1),
                                                Tween.tween(circle, { x: locX - varX , y: locY - varY }, { x: locX, y: locY }, 0.8, Bounce),
                                                Tween.parallel(
                                                    Tween.tween(circle, { x: locX - varX * 1.5 , y: locY - varY + 300 }, { x: locX - varX , y: locY - varY }, 1, Bounce),
                                                    Tween.delay(
                                                        Tween.tween(circle, { alpha: 0.0 }, { alpha: 1.0 }, 0.5), 0.5
                                                    )
                                                )
                                            )
                                        );
                                    };
                                    for (var i = 0; i < 50; ++i)
                                        this.resetEffects();
                                    
                                }
                            }),


                            newLyricEvent_Jpn_explosive('その時世界は途端にその色を大きく変える', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('就在那时 世界中突然间色彩天翻地覆', { y: 340, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 189,
                                delay: 15,
                                onInit: function() {
                                    this.resetEffects = function(){
                                        shapeCanvas.closedEyes_backup.x = -70;
                                        shapeCanvas.closedEyes_backup.y = -55;
                                        shapeCanvas.closedEyes_backup.scaleX = 1.28;
                                        shapeCanvas.closedEyes_backup.scaleY = 1.28;
                                        shapeCanvas.colEmotionA.x = -65;
                                        shapeCanvas.colEmotionA.y = -55;
                                        shapeCanvas.colEmotionA.scaleX = 1.28;
                                        shapeCanvas.colEmotionA.scaleY = 1.28;
                                        shapeCanvas.colEmotionI.x = -65;
                                        shapeCanvas.colEmotionI.y = -55;
                                        shapeCanvas.colEmotionI.scaleX = 1.28;
                                        shapeCanvas.colEmotionI.scaleY = 1.28;
                                        shapeCanvas.colEmotionU.x = -65;
                                        shapeCanvas.colEmotionU.y = -55;
                                        shapeCanvas.colEmotionU.scaleX = 1.28;
                                        shapeCanvas.colEmotionU.scaleY = 1.28;
                                        shapeCanvas.colEmotionE.x = -65;
                                        shapeCanvas.colEmotionE.y = -55;
                                        shapeCanvas.colEmotionE.scaleX = 1.28;
                                        shapeCanvas.colEmotionE.scaleY = 1.28;
                                        shapeCanvas.colEmotionO.x = -65;
                                        shapeCanvas.colEmotionO.y = -55;
                                        shapeCanvas.colEmotionO.scaleX = 1.28;
                                        shapeCanvas.colEmotionO.scaleY = 1.28;
                                        shapeCanvas.colEmotionN.x = -65;
                                        shapeCanvas.colEmotionN.y = -55;
                                        shapeCanvas.colEmotionN.scaleX = 1.28;
                                        shapeCanvas.colEmotionN.scaleY = 1.28;

                                        layers.foreground.addChild(shapeCanvas.closedEyes_backup);
                                        layers.foreground.addChild(shapeCanvas.colEmotionA);
                                        layers.foreground.addChild(shapeCanvas.colEmotionI);
                                        layers.foreground.addChild(shapeCanvas.colEmotionU);
                                        layers.foreground.addChild(shapeCanvas.colEmotionE);
                                        layers.foreground.addChild(shapeCanvas.colEmotionO);
                                        layers.foreground.addChild(shapeCanvas.colEmotionN);

                                        this.pushDisplayObject(shapeCanvas.closedEyes_backup);
                                        this.pushDisplayObject(shapeCanvas.colEmotionA);
                                        this.pushDisplayObject(shapeCanvas.colEmotionI);
                                        this.pushDisplayObject(shapeCanvas.colEmotionU);
                                        this.pushDisplayObject(shapeCanvas.colEmotionE);
                                        this.pushDisplayObject(shapeCanvas.colEmotionO);
                                        this.pushDisplayObject(shapeCanvas.colEmotionN);
                                        



                                        this.pushTween(
                                            Tween.serial(
                                                Tween.parallel(
                                                    Tween.tween(shapeCanvas.closedEyes_backup, { alpha: 0.85 }, { alpha: 0.0 }, 1.5),
                                                    //悲しみ　
                                                    Tween.serial( 
                                                        Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.85/3 }, { alpha: 0 }, 0.5),
                                                        Tween.tween(shapeCanvas.colEmotionA, { alpha: 0 }, { alpha: 0.85/3 }, 0),
                                                        Tween.tween(shapeCanvas.colEmotionE, { alpha: 0.85/3 }, { alpha: 0 }, 0),
                                                        Tween.tween(shapeCanvas.colEmotionE, { alpha: 0.85/3+0.85/5 }, { alpha: 0.85/3 }, 0.3),
                                                        Tween.tween(shapeCanvas.colEmotionE, { alpha: 0 }, { alpha: 0.85/3+0.85/5 }, 0),
                                                        Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.85/3+0.85/5 }, { alpha: 0 }, 0),
                                                        Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.85 }, { alpha: 0.85/3+0.85/5 }, 0.7)

                                                    )
                                                ),
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.85 }, { alpha: 0.85 }, 0.2),
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0.85 }, { alpha: 0.85 }, 0.1),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.85 }, { alpha: 0.85 }, 0.2),
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0.85 }, { alpha: 0.85 }, 0.8),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                //喜（よろこ）び
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0.85 }, { alpha: 0.85 }, 0.3),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.85 }, { alpha: 0.85 }, 0.2),
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0.85 }, { alpha: 0.85 }, 0.8),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionU, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionU, { alpha: 0.85 }, { alpha: 0.85 }, 0.2),
                                                Tween.tween(shapeCanvas.colEmotionU, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0.85 }, { alpha: 0.85 }, 1),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                //全てを一人と
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0.85 }, { alpha: 0.85 }, 0.2),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionN, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionN, { alpha: 0.85 }, { alpha: 0.85 }, 0.2),
                                                Tween.tween(shapeCanvas.colEmotionN, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0.85 }, { alpha: 0.85 }, 0.2),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.85 }, { alpha: 0.85 }, 0.1),
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0.85 }, { alpha: 0.85 }, 0.3),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0.85 }, { alpha: 0.85 }, 0.5),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0.85 }, { alpha: 0.85 }, 0.3),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0.85 }, { alpha: 0.85 }, 0.4),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0.85 }, { alpha: 0.85 }, 0.2),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0.85 }, { alpha: 0.85 }, 0.6),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                //ひとつは知った
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0.85 }, { alpha: 0.85 }, 0.2),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0.85 }, { alpha: 0.85 }, 0.3),
                                                Tween.tween(shapeCanvas.colEmotionO, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0.85 }, { alpha: 0.85 }, 0.2),
                                                Tween.tween(shapeCanvas.colEmotionE, { alpha: 0 }, { alpha: 0.85 }, 0),
                                                
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.85 }, { alpha: 0.85 }, 0.5),
                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0 }, { alpha: 0.85 }, 0),

                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0.85 }, { alpha: 0.85 }, 0.5),
                                                Tween.tween(shapeCanvas.colEmotionI, { alpha: 0 }, { alpha: 0.85 }, 0),

                                                Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.85 }, { alpha: 0 }, 0),
                                                Tween.parallel(
                                                    Tween.tween(shapeCanvas.colEmotionA, { alpha: 0.0 }, { alpha: 0.85 }, 0.8),
                                                    Tween.tween(shapeCanvas.closedEyes_backup, { alpha: 0 }, { alpha: 0.85 }, 0.8)
                                                )
                                            )
                                        );
                                    };
                                    this.resetEffects();
                                }
                            }),

                            newLyricEvent_Jpn_alpha_final('悲しみ', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Jpn_alpha_final('喜び', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Jpn_alpha_final('全てを一人とひとつは知った', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('悲伤 喜悦 独自承担这一切', { y: 340, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 200,
                                delay: 10,
                                onInit: function() {
                                    this.drawNote1 = function(g){
                                        g.lineStyle(1,16777215,1);
                                        /*--图层1--*/
                                        g.beginFill(16777215,1);
                                        g.drawPath( $.toIntVector([1,1,3,3,3,3,2,3,3,3,3,3,3,2,3,3,2,1,3,3,3,3]),$.toNumberVector([25,39,25,39,15,35,11,45,10,53,20,53,28,52,30,47,31,46,31,41,31,22,32,21,40,23,44,24,48,26,49,37,48,44,37,41,34,50,33,59,45,58,56,55,53,44,52,15,47,11,28,7,26,8,26,39,25,39,31,16,30,13,33,14,44,17,47,18,49,20,46,21,39,18,31,16]));
                                        g.endFill();
                                    };
                                    this.drawNote2 = function(g){
                                        g.lineStyle(1,16777215,1);
                                        /*--图层1--*/
                                        g.beginFill(16777215,1);
                                        g.drawPath( $.toIntVector([1,2,2,2,3,3,3,3,3,3,3,3,3,3,3]),$.toNumberVector([22,39,22,39,22,5,26,5,29,11,34,14,41,19,42,27,43,34,38,41,36,41,36,40,40,32,35,26,32,22,27,19,27,37,28,47,27,55,14,56,3,54,8,43,11,37,20,39,21,39,22,40]));
                                        g.endFill();
                                    };
                                    var Note1 = newShape({ parent: layers.foreground });
                                    this.drawNote1(Note1.graphics);
                                    var Note2 = newShape({ parent: layers.foreground });
                                    this.drawNote2(Note2.graphics);
                                    var Note3 = newShape({ parent: layers.foreground });
                                    this.drawNote1(Note3.graphics);
                                    var Note4 = newShape({ parent: layers.foreground });
                                    this.drawNote2(Note4.graphics);
                                    Note1.x = 600;
                                    Note1.y = 100;
                                    Note2.x = 600;
                                    Note2.y = 100;
                                    Note3.x = -100;
                                    Note3.y = 270;
                                    Note4.x = -100;
                                    Note4.y = 270;

                                    this.pushDisplayObject(Note1);
                                    this.pushDisplayObject(Note2);
                                    this.pushDisplayObject(Note3);
                                    this.pushDisplayObject(Note4);
                                    this.pushTween(
                                        Tween.parallel(
                                            Tween.serial(
                                                Tween.tween(Note1, { x: 500, y: 120 }, { x: 600, y: 70 }, 1, Bounce),
                                                Tween.tween(Note1, { x: 400, y: 70 }, { x: 500, y: 120 }, 1, Bounce),
                                                Tween.tween(Note1, { x: 300, y: 120 }, { x: 400, y: 70 }, 1, Bounce),
                                                Tween.tween(Note1, { x: 200, y: 70 }, { x: 300, y: 120 }, 1, Bounce),
                                                Tween.tween(Note1, { x: 100, y: 120 }, { x: 200, y: 70 }, 1, Bounce),
                                                Tween.tween(Note1, { x: 0, y: 70 }, { x: 100, y: 120 }, 1, Bounce),
                                                Tween.tween(Note1, { x: -100, y: 120 }, { x: 0, y: 70 }, 1, Bounce)
                                            ),
                                            Tween.delay(
                                                Tween.serial(
                                                    Tween.tween(Note2, { x: 500, y: 120 }, { x: 600, y: 70 }, 1, Bounce),
                                                    Tween.tween(Note2, { x: 400, y: 70 }, { x: 500, y: 120 }, 1, Bounce),
                                                    Tween.tween(Note2, { x: 300, y: 120 }, { x: 400, y: 70 }, 1, Bounce),
                                                    Tween.tween(Note2, { x: 200, y: 70 }, { x: 300, y: 120 }, 1, Bounce),
                                                    Tween.tween(Note2, { x: 100, y: 120 }, { x: 200, y: 70 }, 1, Bounce),
                                                    Tween.tween(Note2, { x: 0, y: 70 }, { x: 100, y: 120 }, 1, Bounce),
                                                    Tween.tween(Note2, { x: -100, y: 120 }, { x: 0, y: 70 }, 1, Bounce)
                                                ), 0.7
                                            ),
                                            Tween.serial(
                                                Tween.tween(Note3, { x: 0, y: 220 }, { x: -100, y: 270 }, 1, Bounce),
                                                Tween.tween(Note3, { x: 100, y: 270 }, { x: 0, y: 220 }, 1, Bounce),
                                                Tween.tween(Note3, { x: 200, y: 220 }, { x: 100, y: 270 }, 1, Bounce),
                                                Tween.tween(Note3, { x: 300, y: 270 }, { x: 200, y: 220 }, 1, Bounce),
                                                Tween.tween(Note3, { x: 400, y: 220 }, { x: 300, y: 270 }, 1, Bounce),
                                                Tween.tween(Note3, { x: 500, y: 270 }, { x: 400, y: 220 }, 1, Bounce),
                                                Tween.tween(Note3, { x: 600, y: 220 }, { x: 500, y: 270 }, 1, Bounce),
                                                Tween.tween(Note3, { x: 700, y: 270 }, { x: 600, y: 220 }, 1, Bounce)
                                                
                                            ),
                                            Tween.delay(
                                                Tween.serial(
                                                    Tween.tween(Note4, { x: 0, y: 220 }, { x: -100, y: 270 }, 1, Bounce),
                                                    Tween.tween(Note4, { x: 100, y: 270 }, { x: 0, y: 220 }, 1, Bounce),
                                                    Tween.tween(Note4, { x: 200, y: 220 }, { x: 100, y: 270 }, 1, Bounce),
                                                    Tween.tween(Note4, { x: 300, y: 270 }, { x: 200, y: 220 }, 1, Bounce),
                                                    Tween.tween(Note4, { x: 400, y: 220 }, { x: 300, y: 270 }, 1, Bounce),
                                                    Tween.tween(Note4, { x: 500, y: 270 }, { x: 400, y: 220 }, 1, Bounce),
                                                    Tween.tween(Note4, { x: 600, y: 220 }, { x: 500, y: 270 }, 1, Bounce),
                                                    Tween.tween(Note4, { x: 700, y: 270 }, { x: 600, y: 220 }, 1, Bounce)
                                                ), 0.7
                                            )
                                        )
                                    );
                                }
                            }),

                            newLyricEvent_Jpn_alpha_final('言葉は歌になりこの世界を', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Jpn_alpha_final('再び駆け巡る', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('明白到这一点 话语化为歌声再次传递於世界间', { y: 340, x: 543 / 2 }),
                            newLyricEvent_Jpn_alpha_final('君のために', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('为了你', { y: 340, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 207,
                                delay: 10,
                                onInit: function() {
                                    var background = newCanvas({
                                        parent: layers.foreground
                                    });
                                    rectFill(background, 50, 0, 400, 140, 0xffffff, 1.0);
                                    shapeCanvas.openedEyes.x = -70;
                                    shapeCanvas.openedEyes.y = -55;
                                    shapeCanvas.openedEyes.scaleX = 1.28;
                                    shapeCanvas.openedEyes.scaleY = 1.28;
                                    layers.foreground.addChild(shapeCanvas.openedEyes);
                                    layers.foreground.removeChild(shapeCanvas.colSmile);
                                    layers.foreground.addChild(shapeCanvas.colSmile);
                                    this.pushDisplayObject(background);
                                    this.pushDisplayObject(shapeCanvas.openedEyes);
                                    this.pushDisplayObject(shapeCanvas.colSmile);
                                    this.pushTween(
                                        Tween.serial(
                                            Tween.tween(shapeCanvas.colSmile, { x: -65, y: -55 }, { x: -114, y: -188 }, 0),
                                            Tween.tween(shapeCanvas.colSmile, { scaleX: 1.28, scaleY: 1.28 }, { scaleX: 1.48, scaleY: 1.48 }, 0),
                                            Tween.parallel(
                                                Tween.tween(shapeCanvas.openedEyes, { alpha: 0.8 }, { alpha: 0.0 }, 0.1),
                                                Tween.tween(shapeCanvas.colSmile, { alpha: 0.8 }, { alpha: 0.0 }, 0.1),
                                                Tween.tween(background, { alpha: 1 }, { alpha: 0.0 }, 0.2)
                                            ),
                                            Tween.parallel(
                                                Tween.delay(
                                                    Tween.tween(shapeCanvas.openedEyes, { alpha: 0 }, { alpha: 1 }, 0.5),
                                                    this.delay - 0.8
                                                ),
                                                Tween.delay(
                                                    Tween.tween(shapeCanvas.colSmile, { alpha: 0 }, { alpha: 1 }, 0.5),
                                                    this.delay - 0.8
                                                )
                                            ),
                                            Tween.tween(shapeCanvas.colSmile, { x: -114, y: -188 }, { x: -65, y: -55 }, 0),
                                            Tween.tween(shapeCanvas.colSmile, { scaleX: 1.48, scaleY: 1.48 }, { scaleX: 1.28, scaleY: 1.28 }, 0)
                                        )
                                    );
                                }
                            }),

                            newLyricEvent_Jpn_shoutOut('その声に意志を宿して', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('在歌声中蕴藏心意', { y: 340, x: 543 / 2 }),

                            newLyricEvent_Jpn_alpha_final('今　想いが響く', { y: 180, x: 543 / 2 }),
                            newLyricEvent_Chinese_White('就在现在 唱出思念', { y: 340, x: 543 / 2 }),

                            newStandardEvent({
                                startTime: 213,
                                delay: 10,
                                onInit: function() {
                                    this.drawUpLeft = function(g){
                                        g.beginFill(0,1);
                                        g.drawPath( $.toIntVector([1,3,2,2,2,2]),$.toNumberVector([1,215,190,184,254,2,434,-332,-321,-328,-312,607,4,213]));
                                        g.endFill();
                                    };
                                    this.drawUpRight = function(g){
                                        g.beginFill(0,1);
                                        g.drawPath( $.toIntVector([1,3,2,2,2,2]),$.toNumberVector([538,194,352,172,256,2,-51,-337,1000,-332,931,575,535,191]));
                                        g.endFill();
                                    };
                                    this.drawDownLeft = function(g){
                                        g.beginFill(0,1);
                                        g.drawPath( $.toIntVector([1,3,2,2,2,2]),$.toNumberVector([0,213,215,256,266,382,660,907,-356,897,-363,-281,4,216]));
                                        g.endFill();
                                    };
                                    this.drawDownRight = function(g){
                                        g.beginFill(0,1);
                                        g.drawPath( $.toIntVector([1,3,2,2,2,2]),$.toNumberVector([535,193,349,232,253,390,-71,843,1013,831,1013,-216,538,191]));
                                        g.endFill();
                                    };
                                    this.drawEnd1 = function(g){
                                        g.beginFill(16777215,1);
                                        g.drawPath( $.toIntVector([1,3,3,3,3]),$.toNumberVector([144,204,255,201,274,166,285,197,409,201,291,195,274,216,263,201,141,204]));
                                        g.endFill();
                                    };
                                    this.drawEnd2 = function(g){
                                        g.beginFill(16777215,1);
                                        g.drawPath( $.toIntVector([1,3,3,3,3]),$.toNumberVector([77,204,251,198,277,181,292,191,472,204,288,198,280,207,257,198,77,204]));
                                        g.endFill();
                                    };
                                    this.drawEnd3 = function(g){
                                        g.lineStyle(2.5,16777215,1);
                                        g.drawPath( $.toIntVector([1,2]),$.toNumberVector([116,217,443,217]));
                                    };
                                    var UpLeft = newShape({ parent: layers.foreground });
                                    this.drawUpLeft(UpLeft.graphics);
                                    var UpRight = newShape({ parent: layers.foreground });
                                    this.drawUpRight(UpRight.graphics);
                                    var DownLeft = newShape({ parent: layers.foreground });
                                    this.drawDownLeft(DownLeft.graphics);
                                    var DownRight = newShape({ parent: layers.foreground });
                                    this.drawDownRight(DownRight.graphics);
                                    var End1 = newShape({ parent: layers.foreground });
                                    this.drawEnd1(End1.graphics);
                                    var End2 = newShape({ parent: layers.foreground });
                                    this.drawEnd2(End2.graphics);
                                    var End3 = newShape({ parent: layers.foreground });
                                    this.drawEnd3(End3.graphics);
                                    
                                    UpLeft.x = -300;
                                    UpLeft.y = -200;
                                    UpRight.x = 300;
                                    UpRight.y = -200;
                                    DownLeft.x = -300;
                                    DownLeft.y = 200;
                                    DownRight.x = 300;
                                    DownRight.y = 200;
                                    End1.alpha = 0;
                                    End2.alpha = 0;
                                    End3.alpha = 0;
                                    End3.y = -20;
                                    var picWidth = End3.width;

                                    this.pushDisplayObject(UpLeft);
                                    this.pushDisplayObject(UpRight);
                                    this.pushDisplayObject(DownLeft);
                                    this.pushDisplayObject(DownRight);
                                    this.pushDisplayObject(End1);
                                    this.pushDisplayObject(End2);
                                    this.pushDisplayObject(End3);

                                    this.pushTween(
                                        Tween.parallel(
                                            Tween.serial(
                                                Tween.parallel(
                                                    Tween.tween(UpLeft, { x: 300 , y: 200 }, { x: -300, y: -200}, 0.5, Quadratic),
                                                    Tween.tween(UpRight, { x: -300 , y: 200 }, { x: 300, y: -200}, 0.5, Quadratic),
                                                    Tween.tween(DownLeft, { x: 300 , y: -200 }, { x: -300, y: 200}, 0.5, Quadratic),
                                                    Tween.tween(DownRight, { x: -300 , y: -200 }, { x: 300, y: 200}, 0.5, Quadratic)
                                                ),
                                                Tween.delay(
                                                    Tween.serial(
                                                        Tween.tween(End1, { alpha: 1 }, { alpha: 0 }, 0),
                                                        Tween.tween(End1, { alpha: 1 }, { alpha: 1 }, 0.15),
                                                        Tween.tween(End1, { alpha: 0 }, { alpha: 1 }, 0),

                                                        Tween.tween(End2, { alpha: 1 }, { alpha: 0 }, 0),
                                                        Tween.tween(End2, { alpha: 1 }, { alpha: 1 }, 0.15),
                                                        Tween.tween(End2, { alpha: 0 }, { alpha: 1 }, 0),

                                                        Tween.tween(End3, { alpha: 1 }, { alpha: 0 }, 0),
                                                        Tween.parallel(
                                                            Tween.tween(End3, { scaleX: 0.1 }, { scaleX: 1 }, 0.2),
                                                            Tween.tween(End3, { x: picWidth/2 }, { x: 0 }, 0.2)
                                                        ),
                                                        Tween.tween(End3, { alpha: 0 }, { alpha: 1 }, 0)
                                                    ), 0.3
                                                )
                                            )
                                        )     
                                    );
                                }
                            }),

                            newStandardEvent({
                                startTime: 215,
                                delay: 50,
                                onInit: function() {
                                    var blackBackground = getBackground(0x000000, 1.0);
                                    this.pushDisplayObject(blackBackground);
                                    this.pushTween(
                                        Tween.serial(
                                            Tween.tween(blackBackground, { alpha: 1.0 }, { alpha: 0.0 }, 0.3),
                                            Tween.delay(
                                                Tween.tween(blackBackground, { alpha: 0 }, { alpha: 1 }, 0.5),
                                                this.delay - 0.8
                                            )
                                        )
                                    );
                                }
                            }),

                            newStandardEvent({
                                startTime: 215.5,
                                delay: 40,
                                onInit: function() {
                                    shapeCanvas.CDBK.x = -20;
                                    shapeCanvas.CDBK.y = 0;
                                    shapeCanvas.CDBK.scaleX = 1.15;
                                    shapeCanvas.CDBK.scaleY = 1.15;
                                    layers.foreground.addChild(shapeCanvas.CDBK);
                                    this.pushDisplayObject(shapeCanvas.CDBK);
                                    this.pushTween(
                                        Tween.serial(
                                            Tween.tween(shapeCanvas.CDBK, { alpha: 1 }, { alpha: 0.0 }, 0.3),
                                            Tween.delay(
                                                Tween.tween(shapeCanvas.CDBK, { alpha: 0 }, { alpha: 1 }, 0.5),
                                                this.delay - 0.8
                                            )
                                        )
                                    );
                                }
                            }),

                            newLyricEvent_cast('Danmaku: 天則', { y: 10, x: 0 }),
                            newLyricEvent_cast('Illustrator: 旭君', { y: 35, x: 0 }),


                        ]);
                }