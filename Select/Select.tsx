import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectBody,
  Value,
  SelectDropdown,
  SelectItem,
  SelectSearch,
  SearchField,
  SelectList,
  ArrowIcon,
} from "./Select.styles";

type SelectItemID = number | string;

interface SelectItem {
  id: SelectItemID;
  label: string;
}

interface SelectProps {
  items: SelectItem[];
  activeIndex: SelectItemID;
  mainStyles?: React.CSSProperties;
  dropdownStyles?: React.CSSProperties;
  hasArrow?: boolean;
  hasSearch?: boolean;
  disableToId?: SelectItemID;
  customLabel?: string;
  placeholder?: string;

  onChange: (id: SelectItemID) => void;
}

const CustomSelect: React.FunctionComponent<SelectProps> = ({
  items,
  activeIndex,
  hasSearch,
  hasArrow,
  customLabel,
  placeholder,
  disableToId,
  mainStyles,
  dropdownStyles,
  onChange,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const selectInput: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const selectRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const handleOutsideClick: any = (e: React.MouseEvent<HTMLElement>) => {
    if (selectRef.current && !(selectRef.current as any).contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    if (selectInput && selectInput.current) {
      selectInput.current.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value);

  const handleSelect = (item: SelectItem) => {
    onChange(item.id);
    setOpen(false);
  };

  const filteredData: SelectItem[] = searchText
    ? items.filter(
        (item: SelectItem) =>
          item.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 ||
          (item.id + "").toLowerCase().indexOf(searchText.toLowerCase()) >= 0,
      )
    : items;

  let disableItemsEdge: number = -1;

  if (disableToId) {
    disableItemsEdge = filteredData.findIndex((item: SelectItem) => item.id === disableToId);
  }

  return (
    <Select>
      <SelectBody onClick={() => setOpen(true)} hasArrow={hasArrow} style={mainStyles}>
        <Value>{customLabel || activeIndex || placeholder}</Value>
        {hasArrow && <ArrowIcon isReverse={isOpen} />}
      </SelectBody>
      <SelectDropdown isVisible={isOpen} onClick={handleOutsideClick} style={dropdownStyles} ref={selectRef}>
        {hasSearch && (
          <SelectSearch>
            <SearchField onChange={handleSearch} value={searchText} autoFocus={true} ref={selectInput} />
          </SelectSearch>
        )}
        <SelectList hasSearch={hasSearch}>
          {filteredData.map((item: SelectItem, index: number) => {
            const isDisabled: boolean = index <= disableItemsEdge;

            return (
              <SelectItem
                key={item.id}
                onClick={() => (!isDisabled ? handleSelect(item) : null)}
                isActive={item.id === activeIndex}
                isDisabled={isDisabled}
              >
                {item.label}
              </SelectItem>
            );
          })}
        </SelectList>
      </SelectDropdown>
    </Select>
  );
};

export default CustomSelect;
