import React from 'react';
import { FontSize } from '@ds.e/foundation';

var Text = function (_a) {
    var _b = _a.size, size = _b === void 0 ? FontSize.base : _b, children = _a.children;
    var className = "dse-text dse-text-" + size;
    return React.createElement("p", { className: className }, children);
};

export { Text as default };
//# sourceMappingURL=Text.js.map
