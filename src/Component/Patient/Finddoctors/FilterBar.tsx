// FilterBar.jsx
import React from "react";

const data = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grapes"];

interface IData {
  selectedStates?: string[];
  text1: string;
  text2: string;
  text3: string;
  onSelectState?: (currentState: string) => void;
  onDeselectstate?: (currentState: string) => void;
  show?: boolean;
  mobileBool?: boolean;
  isDark?: boolean;
  doctor?: string[];
  specializedIn?: object[];
  addresss?: string[];
}

const FilterBar = (props: IData) => {
  const {
    selectedStates = [],
    onSelectState,
    onDeselectstate,
    text1,
    text2,
    text3,
    doctor,
    specializedIn,
    addresss,
  } = props;

  const handleCheckboxChange = (currentState: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;

      if (isChecked) {
        if (onSelectState) {
          onSelectState(currentState);
        }
      } else {
        if (onDeselectstate) {
          onDeselectstate(currentState);
        }
      }
    };

  return (
    <div className="desktop:w-[15vw] phone:w-[15vw] px-[1rem] dark:bg-lightBlack dark:text-textWhite h-[85vh]">
      <div className="flex flex-col font-[600] text-[18px] border-b py-4">
        Filter By
      </div>

      <div className="pt-4">
        <div className="font-[600] text-[14px]">{text1}</div>
        <div className="py-2 border-b">
          {addresss?.map((item) => (
            <div key={item} className="flex gap-2">
              <input
                type="checkbox"
                className="cursor-pointer"
                onChange={handleCheckboxChange(item)}
                checked={selectedStates.includes(item)}
              />
              <div>{item}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <div className="font-[600] text-[14px]">{text2}</div>
        <div className="py-2 border-b">
          {specializedIn?.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                className="cursor-pointer"
                onChange={handleCheckboxChange(item)}
                checked={selectedStates.includes(item)}
              />
              <div>{item}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-4">
        <div className="font-[600] text-[14px]">{text3}</div>
        <div className="py-2 border-b">
          {doctor?.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="cursor-pointer"
                onChange={handleCheckboxChange(item)}
                checked={selectedStates.includes(item)}
              />
              <div>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
