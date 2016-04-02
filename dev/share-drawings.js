// scripts on this page directly touches DOM-elements
// removing or altering anything may cause failures in the UI event handlers
// it is used only to bring collaboration for canvas-surface
var lastPointIndex = 0;

var selfId = (Math.random() * 10000).toString().replace('.', '');

window.addEventListener('message', function(event) {
    if (!event.data) return;
    if (event.data.genDataURL) {
        var dataURL = context.canvas.toDataURL(event.data.format);
        window.parent.postMessage({
            dataURL: dataURL
        }, '*');
        return;
    }

    if (event.data.undo && points.length) {
        var index = event.data.index;
        if (index === -1) {
            points.length = points.length - 1;
            drawHelper.redraw();
            syncPoints(true);
            return;
        }

        if (points[index]) {
            var newPoints = [];
            for (var i = 0; i < points.length; i++) {
                if (i !== index) {
                    newPoints.push(points[i]);
                }
            }
            points = newPoints;
            drawHelper.redraw();
            syncPoints(true);
        }
        return;
    }

    if (event.data.syncPoints) {
        syncPoints(true);
        return;
    }

    if (!event.data || !event.data.canvasDesignerSyncData) return;

    if (event.data.sender && event.data.sender == selfId) return;

    // drawing is shared here (array of points)
    var d = event.data.canvasDesignerSyncData;

    if (d.startIndex !== 0) {
        for (var i = 0; i < d.points.length; i++) {
            points[i + d.startIndex] = d.points[i];
        }
    } else {
        points = d.points;
    }

    lastPointIndex = points.length;

    // redraw the <canvas> surfaces
    drawHelper.redraw(true);
}, false);

function syncPoints(isSyncAll) {
    if (isSyncAll) {
        lastPointIndex = 0;
    }

    if (lastPointIndex == points.length) return;

    var pointsToShare = [];
    for (var i = lastPointIndex; i < points.length; i++) {
        pointsToShare[i - lastPointIndex] = points[i];
    }

    if (pointsToShare.length) {
        syncData({
            points: pointsToShare || [],
            startIndex: lastPointIndex
        });
    }

    if (!pointsToShare.length && points.length) return;

    lastPointIndex = points.length;
}

function syncData(data) {
    window.parent.postMessage({
        canvasDesignerSyncData: data,
        sender: selfId
    }, '*');
}
