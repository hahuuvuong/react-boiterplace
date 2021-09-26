import React from 'react';
import { Spacing } from '@ds.e/foundation';

var Color = function (_a) {
    var hexCode = _a.hexCode, _b = _a.width, width = _b === void 0 ? Spacing.sm : _b, _c = _a.height, height = _c === void 0 ? Spacing.sm : _c;
    var className = "dse-width-" + width + " dse-height-" + height;
    return React.createElement("div", { style: { backgroundColor: hexCode }, className: className });
};

export { Color as default };
//# sourceMappingURL=Color.js.map
