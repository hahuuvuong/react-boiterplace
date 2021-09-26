import React from 'react';

var Margin = function (_a) {
    var _b = _a.space, space = _b === void 0 ? 'xl' : _b, children = _a.children, top = _a.top, right = _a.right, left = _a.left, bottom = _a.bottom;
    var className = "dse-margin-" + space;
    if (top) {
        className = className + " dse-margin-top-" + space;
    }
    if (right) {
        className = className + " dse-margin-right-" + space;
    }
    if (left) {
        className = className + " dse-margin-left-" + space;
    }
    if (bottom) {
        className = className + " dse-margin-bottom-" + space;
    }
    return React.createElement("div", { className: className }, children);
};

export { Margin as default };
//# sourceMappingURL=Margin.js.map
