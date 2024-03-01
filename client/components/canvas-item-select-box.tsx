import React, { useState } from "react";
import { CanvasItemOption } from "@/app/_common/types/item";

const CanvasItemSelectBox = (props: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(props.options);

  const handleSearch = (e: any) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filteredOptions = props.options.filter((option: any) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  const handleSelect = (e: any) => {
    const selectedValue = e.target.value;
    const selectedOption = props.options.find(
      (option: CanvasItemOption) => option.id.toString() === selectedValue
    );
    setSearchTerm("");
    props.onSelect(selectedOption);
    e.target.value = ""; // リセット
    handleSearch(e);
  };

  return (
    <div>
      <select onChange={handleSelect}>
        <option value="">選択してください</option>
        {filteredOptions.map((option: CanvasItemOption) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <div>
        <input
          type="text"
          placeholder="↑入力してアイテムを絞る"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default CanvasItemSelectBox;
