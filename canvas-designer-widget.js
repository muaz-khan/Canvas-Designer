// Last time updated: 2016-04-17 6:42:16 AM UTC

// _______________
// Canvas-Designer

// Open-Sourced: https://github.com/muaz-khan/Canvas-Designer

// --------------------------------------------------
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// --------------------------------------------------

function CanvasDesigner() {
    var designer = this;

    var iframe;
    var tools = {
        line: true,
        pencil: true,
        dragSingle: true,
        dragMultiple: true,
        eraser: true,
        rectangle: true,
        arc: true,
        bezier: true,
        quadratic: true,
        text: true,
        image: true
    };
    var selectedIcon = 'pencil';

    function syncData(data) {
        if (!iframe) return;

        designer.postMessage({
            canvasDesignerSyncData: data
        });
    }

    var syncDataListener = function(data) {};
    var dataURLListener = function(dataURL) {};

    function onMessage(event) {
        if (!event.data || event.data.uid !== designer.uid) return;

        if (!!event.data.canvasDesignerSyncData) {
            designer.pointsLength = event.data.canvasDesignerSyncData.points.length;
            syncDataListener(event.data.canvasDesignerSyncData);
        }

        if (!!event.data.dataURL) {
            dataURLListener(event.data.dataURL);
        }
    }

    function getRandomString() {
        if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
            var a = window.crypto.getRandomValues(new Uint32Array(3)),
                token = '';
            for (var i = 0, l = a.length; i < l; i++) {
                token += a[i].toString(36);
            }
            return token;
        } else {
            return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
        }
    }

    designer.uid = getRandomString();

    designer.appendTo = function(parentNode) {
        iframe = document.createElement('iframe');
        iframe.src = designer.widgetHtmlURL + '?widgetJsURL=' + designer.widgetJsURL + '&tools=' + JSON.stringify(tools) + '&selectedIcon=' + selectedIcon;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 0;
        parentNode.appendChild(iframe);

        window.removeEventListener('message', onMessage);
        window.addEventListener('message', onMessage, false);
    };

    designer.destroy = function() {
        if (iframe) {
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        }
        window.removeEventListener('message', onMessage);
    };

    designer.addSyncListener = function(callback) {
        syncDataListener = callback;
    };

    designer.syncData = syncData;

    designer.setTools = function(_tools) {
        tools = _tools;
    };

    designer.setSelected = function(icon) {
        if (typeof tools[icon] !== 'undefined') {
            selectedIcon = icon;
        }
    };

    designer.toDataURL = function(format, callback) {
        dataURLListener = callback;
        
        if (!iframe) return;
        designer.postMessage({
            genDataURL: true,
            format: format
        });
    };

    designer.sync = function() {
        if (!iframe) return;
        designer.postMessage({
            syncPoints: true
        });
    };

    designer.pointsLength = 0;

    designer.undo = function(index) {
        if (!iframe) return;

        designer.postMessage({
            undo: true,
            index: index || designer.pointsLength - 1 || -1
        });
    };

    designer.postMessage = function(message) {
        if (!iframe) return;

        message.uid = designer.uid;
        iframe.contentWindow.postMessage(message, '*');
    };

    designer.widgetHtmlURL = 'widget.html';
    designer.widgetJsURL = 'widget.min.js';
}
