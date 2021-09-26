import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEventHandler,
  createRef,
} from "react";

import Text from "../../atoms/Text";

const KEY_CODES = {
  ENTER: 13,
  SPACE: 32,
  DOWN_ARROW: 40,
  ESC: 7,
  UP_ARROW: 38,
};
interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
}
const getNextOptionIndex = (
  currentIndex: number | null,
  option: Array<SelectOption>
) => {
  if (currentIndex === null) {
    return 0;
  }
  if (currentIndex === option.length - 1) {
    return 0;
  }
  return currentIndex + 1;
};
const getPreviousOptionIndex = (
  currentIndex: number | null,
  option: Array<SelectOption>
) => {
  if (currentIndex === null) {
    return 0;
  }
  if (currentIndex === 0) {
    return option.length - 1;
  }
  return currentIndex - 1;
};
const Select: React.FC<SelectProps> = ({
  options = [],
  label = "Please select an option ...",
  onOptionSelected: handler,
}) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLLIElement>[]
  >([]);

  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [highlightIndex, setHighlightIndex] = useState<null | number>(null);
  const labelRef = useRef<HTMLButtonElement>(null);
  const [overlayTop, setOverlayTop] = useState<number>(0);

  useEffect(() => {
    setOptionRefs(options.map((_) => createRef<HTMLLIElement>()));
  }, [options.length]);

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    setIsOpen(!isOpen);
    handler && handler(option, optionIndex);
    setSelectedIndex(optionIndex);
    setIsOpen(false);
  };

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  let selectedOption = null;

  if (selectedIndex !== null) {
    selectedOption = options[selectedIndex];
  }

  const highlightItem = (optionIndex: number | null) => {
    setHighlightIndex(optionIndex);
  };
  const onButtonDown: KeyboardEventHandler = (event) => {
    event.preventDefault();

    if (
      [KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(
        event.keyCode
      )
    ) {
      setIsOpen(true);

      highlightItem(0);
    }
  };
  const onOptionKeydown: KeyboardEventHandler = (event) => {
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
      onOptionSelected(options[highlightIndex!], highlightIndex!)
    }
  };
  useEffect(() => {
    if (highlightIndex !== null && isOpen) {
      const ref = optionRefs[highlightIndex];
      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen, highlightIndex]);
  return (
    <div className={"dse-select"}>
      <button
      data-testid='DseSelectButton'
        onKeyDown={onButtonDown}
        ref={labelRef}
        aria-controls="dse-select-list"
        aria-haspopup="true"
        aria-expanded={isOpen ? true : undefined}
        className={"dse-select__label"}
        onClick={() => onLabelClick()}
      >
        <Text>{selectedOption ? selectedOption.label : label}</Text>
        <svg
          className={`dse-select__caret ${
            isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          height="1rem"
          width="1rem"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <ul
          style={{ top: overlayTop }}
          aria-hidden={isOpen ? undefined : false}
          className={"dse-select__overlay"}
        >
          {options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isHighlighted = highlightIndex === optionIndex;
            const ref = optionRefs[optionIndex];
            return (
              <li
                onKeyDown={onOptionKeydown}
                ref={ref}
                role='menuitemradio'
                aria-label={option.label}
                aria-checked={isSelected ? true : undefined}
                tabIndex={isHighlighted ? -1 : 0}
                onMouseEnter={() => highlightItem(optionIndex)}
                onMouseLeave={() => highlightItem(null)}
                className={`dse-select__option ${
                  isSelected ? "dse-select__option--selected" : ""
                } ${isHighlighted ? "dse-select__option--highlighted" : ""}
                `}
                onClick={() => onOptionSelected(option, optionIndex)}
                key={option.value}
              >
                <Text>{option.label}</Text>
                {isSelected && (
                  <svg
                    height="1rem"
                    width="1rem"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
