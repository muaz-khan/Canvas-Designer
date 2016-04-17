# [Canvas Designer](https://github.com/muaz-khan/Canvas-Designer) / [API Referencee](https://github.com/muaz-khan/Canvas-Designer#api-reference)

* Main demo: https://www.webrtc-experiment.com/Canvas-Designer/
* Multiple designers demo: https://www.webrtc-experiment.com/Canvas-Designer/multiple.html

[![npm](https://img.shields.io/npm/v/canvas-designer.svg)](https://npmjs.org/package/canvas-designer) [![downloads](https://img.shields.io/npm/dm/canvas-designer.svg)](https://npmjs.org/package/canvas-designer) [![Build Status: Linux](https://travis-ci.org/muaz-khan/Canvas-Designer.png?branch=master)](https://travis-ci.org/muaz-khan/Canvas-Designer)

> "Collaborative" [Canvas Designer](https://github.com/muaz-khan/Canvas-Designer) i.e. Canvas-Drawing tool allows you draw bezier/quadratic curves, rectangles, circles and lines. You can also set strokes, back/forth colors and much more. You can draw using pencils, erase drawing, type texts etc. You can [easily add your own tools](https://www.webrtc-experiment.com/Canvas-Designer/Help/#contribute).

**You can check all releases here:**

* https://github.com/muaz-khan/Canvas-Designer/releases

The specialty of this drawing-tool is that, it generates Canvas2D code for you; so simply draw and get the code! That code can be used in any javascript Canvas2D application.

**You can submit issues here:**

* https://github.com/muaz-khan/Canvas-Designer/issues

Also, you can collaborate your drawing with up to 15 users; and everything is synced from all users. So, if you draw a line and your friend-A draws quadratic curve and friend-B draws rectangle then everything will be synced among all users!

# [Click to view Gif Presentation](https://cdn.webrtc-experiment.com/images/Canvas-Designer.gif)

<img src="https://i.imgur.com/uDbfy1F.png" />

# Built-in tools

You can use [`designer.setSelected`](https://github.com/muaz-khan/Canvas-Designer#setselected) or [`designer.setTools`](https://github.com/muaz-khan/Canvas-Designer#settools) for below tools.

1. `line` --- to draw straight lines
2. `pencil` --- to write/draw shapes
3. `dragSingle` --- to drag/ove and especially **resize** last selected shape
4. `dragMultiple` --- to drag/move all shapes
5. `eraser` --- to erase/clear specific portion of shapes
6. `rectangle` --- to draw rectangles
7. `arc` --- to draw circles
8. `bezier` --- to draw bezier curves
9. `quadratic` --- to draw quadratic curves
10. `text` --- to write texts
11. `image` --- add external images

The correct name for `dragSingle` should be: `drag-move-resize last-selected-shape`.

The correct name for `dragMultiple` should be: `drag-move all-shapes`.

**Upcoming** tools & features:

1. `arrow` --- to draw arrows
2. Set font-size for texts
3. Set font-family for texts
4. Resize all shapes at once (currently you can resize last selected shape only)

# Features

1. Draw single or multiple shapes of any kind (according to toolbox)
2. Drag/resize/adjust all the shapes in any possible direction
3. Rectangles and images can be resized in 4-directions

   Red transparent small circles helps you understand how to resize.

4. Undo drawings using `ctrl+z` keys (undo all shapes, undo last 10 or specific shapes, undo range of shapes or undo last shape)
5. Drag/move single or all the shapes without affecting any single coordinate

More importantly, you can use unlimited designers on a single page. Each will have its own surface and its own tools.

# How to Use

1. Download/link `canvas-designer-widget.js` from [this github repository](https://github.com/muaz-khan/Canvas-Designer).
2. Set `designer.widgetHtmlURL` and `designer.widgetJsURL` in your HTML file.
3. Use this command to append widget in your HTML page:

   `var designer = new CanvasDesigner();`

   `designer.appendTo(document.body);`

E.g. (Please don't forget replacing `1.0.0` with latest version)

```html
<!-- 1st step -->
<script src="https://github.com/muaz-khan/Canvas-Designer/releases/download/1.0.3/canvas-designer-widget.js"></script>

<!-- 2nd step -->
<script>
var designer = new CanvasDesigner();

// both links are mandatory
// widget.html will internally use widget.js
designer.widgetHtmlURL = 'https://github.com/muaz-khan/Canvas-Designer/releases/download/1.0.3/widget.html'; // you can place this file anywhere
designer.widgetJsURL = 'https://github.com/muaz-khan/Canvas-Designer/releases/download/1.0.3/widget.js';     // you can place this file anywhere
</script>

<!-- 3rd i.e. last step -->
<script>
// <iframe> will be appended to "document.body"
designer.appendTo(document.body);
</script>
```

You can even download TAR:

```
mkdir Canvas-Designer && cd Canvas-Designer
wget http://dl.webrtc-experiment.com/canvas-designer.tar.gz
tar -zxvf canvas-designer.tar.gz
ls -a
```

* For windows, use 7Zip or WinRAR to extract this: [canvas-designer.tar.gz](http://dl.webrtc-experiment.com/canvas-designer.tar.gz)

# Complete Usage

```javascript
var designer = new CanvasDesigner();

websocket.onmessage = function(event) {
    designer.syncData( JSON.parse(event.data) );
};

designer.addSyncListener(function(data) {
    websocket.send(JSON.stringify(data));
});

designer.setSelected('pencil');

designer.setTools({
    pencil: true,
    text: true
});

designer.appendTo(document.documentElement);
```

It is having `designer.destroy()` method as well.

# Use [WebRTC](http://www.rtcmulticonnection.org/docs/)!

```javascript
webrtc.onmessage = function(event) {
    designer.syncData( event.data );
};

designer.addSyncListener(function(data) {
    webrtc.send(data);
});
```

# Use Socket.io

```javascript
socket.on('message', function(data) {
    designer.syncData( data );
});

designer.addSyncListener(function(data) {
    socket.emit('message', data);
});
```

# API Reference

## `widgetHtmlURL`

You can place `widget.html` file anywhere on your site.

```javascript
designer.widgetHtmlURL = '/html-files/widget.html';
```

By default `widget.html` is placed in the same directory of `index.html`.

```javascript
// here is default value
designer.widgetHtmlURL = 'widget.html';
```

Remember, `widget.html` is loaded using `<iframe>`.

## `widgetJsURL`

> **Note:** This file is **internally used** by `widget.html`.

You can place `widget.html` file anywhere on your site.

```javascript
designer.widgetJsURL = '/js-files/widget.min.js';
```

By default `widget.min.js` is placed in the same directory of `index.html`.

```javascript
// here is default value
designer.widgetJsURL = 'widget.min.js';
```

Remember, `widget.js` is loaded using `<iframe>`.

## `syncData`

Pass array-of-points that are shared by remote users using socket.io or websockets or XMPP or WebRTC.

```javascript
designer.syncData(arrayOfPoints);
```

## `addSyncListener`

This callback is invoked as soon as something new is drawn. An array-of-points is passed over this function. That array MUST be shared with remote users for collaboration.

```javascript
designer.addSyncListener(function(data) {
    designer.send(JSON.stringify(data));
});
```

## `setSelected`

This method allows you select specific tools.

* See list of [all tools](https://github.com/muaz-khan/Canvas-Designer#built-in-tools)

```javascript
designer.setSelected('rectangle');
```

## `setTools`

This method allows you choose between tools that **should be displayed** in the tools-panel.

* See list of [all tools](https://github.com/muaz-khan/Canvas-Designer#built-in-tools)

```javascript
designer.setTools({
    pencil: true,
    text: true
});
```

## `appendTo`

CanvasDesigner is a widget; that widget should be appended to a DOM object. This method allows you pass `<body>` or any other HTMLDOMElement.

```javascript
designer.appendTo(document.body || document.documentElement);
```

The correct name for `appendTo` is: `append-iframe to target HTML-DOM-element`

## `destroy`

If you want to remove the widget from your HTMLDOMElement.

```javascript
designer.destroy();
```

## `iframe`

You can access designer iframe as following:

```javascript
designer.iframe.style.border = '5px solid red';

window.open(designer.iframe.src);
```

`designer.iframe` will be `null/undefined` until you call `appendTo`. So always use this code-block:

```javascript
if(!designer.iframe) {
    designer.appendTo(document.body);
}
designer.iframe.style.border = '5px solid red';
```

## `toDataURL`

Get data-URL of your drawings! 

```javascript
designer.toDataURL('image/png', function(dataURL) {
    window.open(dataURL);
});
```

## `sync`

You can manually sync drawings by invoking `designer.sync` method:

```javascript
designer.sync();
```

Here is a real usecase:

```javascript
webrtcDataChannel.onopen = function() {
    if(designer.pointsLength > 0) {
        // you seems having data to be synced with new user!
        designer.sync();
    }
};
```

## `pointsLength`

Each shape is considered as a `point`. This value allows you check number of shapes that are already drawn on the canvas-designer.

```javascript
(function looper() {
    document.getElementById('number-of-shapes').inenrHTML = designer.pointsLength;
    setTimeout(looper, 1000);
})();
```

Or a real usage:

```javascript
websocket.onopen = function() {
    if(designer.pointsLength > 0) {
        // you seems having data to be synced with existing users!
        designer.sync();
    }
};
```

## `undo`

You can either undo drawings by pressing `ctrl+z` on windows and `command+z` on Mac; however you can undo using `designer.undo` method as well:

```javascript
designer.undo();   // undo last shape
designer.undo(-1); // undo last shape

// undo shape from specific index
designer.undo(0);

// undo all shapes
designer.undo('all');

// undo last 10 shapes
designer.undo({
    numberOfLastShapes: 10
})
```

`designer.pointsLength` shows number of shapes; and `designer.undo` accepts shape-index as well.

# How to contribute?

It is not too much complex to add new tools :) Its easy.

* https://www.webrtc-experiment.com/Canvas-Designer/Help/#contribute

# Demos

* http://muaz-khan.github.io/Everything/Canvas/ (A-to-zee all shapes, and animations on this page is created using canvas-designer)
* https://www.webrtc-experiment.com/Canvas-Designer/ (canvas-designer demo allows you draw shapes & get the code; additionally collaborate as well!)
* Try a simple canvas2d animation demo: http://muaz-khan.github.io/Everything/Canvas/Experiments/Simple-HTML5-Canvas-Experiment/
* Try many other canvas2d demos: http://muaz-khan.github.io/Everything/Canvas/Experiments/

All above demos are built using canvas-designer!

Original source-code was shared 2-years back, here: https://github.com/muaz-khan/Everything/tree/gh-pages/Canvas/Tools/Designer

There is a similar "tinny" tool, however it isn't yet supporting collaboration: https://canvature.appspot.com/

And WebRTC-Experiments! https://github.com/muaz-khan/WebRTC-Experiment

# License

[Canvas Designer](https://github.com/muaz-khan/Canvas-Designer) is released under [MIT licence](https://www.webrtc-experiment.com/licence/) . Copyright (c) [Muaz Khan](http://www.MuazKhan.com).
