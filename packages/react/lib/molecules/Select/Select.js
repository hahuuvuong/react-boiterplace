import React, { useState, useRef, useEffect, createRef } from 'react';
import Text from '../../atoms/Text/Text.js';

var KEY_CODES = {
    ENTER: 13,
    SPACE: 32,
    DOWN_ARROW: 40,
    ESC: 7,
    UP_ARROW: 38,
};
var getNextOptionIndex = function (currentIndex, option) {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === option.length - 1) {
        return 0;
    }
    return currentIndex + 1;
};
var getPreviousOptionIndex = function (currentIndex, option) {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === 0) {
        return option.length - 1;
    }
    return currentIndex - 1;
};
var Select = function (_a) {
    var _b;
    var _c = _a.options, options = _c === void 0 ? [] : _c, _d = _a.label, label = _d === void 0 ? "Please select an option ..." : _d, handler = _a.onOptionSelected;
    var _e = useState(false), isOpen = _e[0], setIsOpen = _e[1];
    var _f = useState([]), optionRefs = _f[0], setOptionRefs = _f[1];
    var _g = useState(null), selectedIndex = _g[0], setSelectedIndex = _g[1];
    var _h = useState(null), highlightIndex = _h[0], setHighlightIndex = _h[1];
    var labelRef = useRef(null);
    var _j = useState(0), overlayTop = _j[0], setOverlayTop = _j[1];
    useEffect(function () {
        setOptionRefs(options.map(function (_) { return createRef(); }));
    }, [options.length]);
    var onOptionSelected = function (option, optionIndex) {
        setIsOpen(!isOpen);
        handler && handler(option, optionIndex);
        setSelectedIndex(optionIndex);
        setIsOpen(false);
    };
    var onLabelClick = function () {
        setIsOpen(!isOpen);
    };
    useEffect(function () {
        var _a;
        setOverlayTop((((_a = labelRef.current) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0) + 10);
    }, [(_b = labelRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight]);
    var selectedOption = null;
    if (selectedIndex !== null) {
        selectedOption = options[selectedIndex];
    }
    var highlightItem = function (optionIndex) {
        setHighlightIndex(optionIndex);
    };
    var onButtonDown = function (event) {
        event.preventDefault();
        if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.keyCode)) {
            setIsOpen(true);
            highlightItem(0);
        }
    };
    var onOptionKeydown = function (event) {
        event.preventDefault();
        if (event.keyCode === KEY_CODES.ESC) {
            setIsOpen(false);
        }
        if (event.keyCode === KEY_CODES.DOWN_ARROW) {
            highlightItem(getNextOptionIndex(highlightIndex, options));
        }
        if (event.keyCode === KEY_CODES.UP_ARROW) {
            highlightItem(getPreviousOptionIndex(highlightIndex, options));
        }
        if (event.keyCode === KEY_CODES.ENTER) {
            onOptionSelected(options[highlightIndex], highlightIndex);
        }
    };
    useEffect(function () {
        if (highlightIndex !== null && isOpen) {
            var ref = optionRefs[highlightIndex];
            if (ref && ref.current) {
                ref.current.focus();
            }
        }
    }, [isOpen, highlightIndex]);
    return (React.createElement("div", { className: "dse-select" },
        React.createElement("button", { "data-testid": 'DseSelectButton', onKeyDown: onButtonDown, ref: labelRef, "aria-controls": "dse-select-list", "aria-haspopup": "true", "aria-expanded": isOpen ? true : undefined, className: "dse-select__label", onClick: function () { return onLabelClick(); } },
            React.createElement(Text, null, selectedOption ? selectedOption.label : label),
            React.createElement("svg", { className: "dse-select__caret " + (isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"), xmlns: "http://www.w3.org/2000/svg", height: "1rem", width: "1rem", viewBox: "0 0 20 20", fill: "currentColor" },
                React.createElement("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" }))),
        isOpen && (React.createElement("ul", { style: { top: overlayTop }, "aria-hidden": isOpen ? undefined : false, className: "dse-select__overlay" }, options.map(function (option, optionIndex) {
            var isSelected = selectedIndex === optionIndex;
            var isHighlighted = highlightIndex === optionIndex;
            var ref = optionRefs[optionIndex];
            return (React.createElement("li", { onKeyDown: onOptionKeydown, ref: ref, role: 'menuitemradio', "aria-label": option.label, "aria-checked": isSelected ? true : undefined, tabIndex: isHighlighted ? -1 : 0, onMouseEnter: function () { return highlightItem(optionIndex); }, onMouseLeave: function () { return highlightItem(null); }, className: "dse-select__option " + (isSelected ? "dse-select__option--selected" : "") + " " + (isHighlighted ? "dse-select__option--highlighted" : "") + "\n                ", onClick: function () { return onOptionSelected(option, optionIndex); }, key: option.value },
                React.createElement(Text, null, option.label),
                isSelected && (React.createElement("svg", { height: "1rem", width: "1rem", xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
                    React.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })))));
        })))));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
