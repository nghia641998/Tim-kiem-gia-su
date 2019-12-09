import React from "react";
import './SelectOption.scss';


const SelectOption = props => {
  const { selectedOption, arrOption, setOption } = props;

  return (
    <div className='btn-group select-option'>
      <div className="sort-options" >
        <button className="dropdown btn btn-toggle-custom selected-option" data-toggle='dropdown'>
          {selectedOption.text}
          <i className='ml-3 mt-1 fas fa-chevron-down rotate-focus' />
        </button>
        <div className='dropdown-menu' id='sort'>
        {arrOption.map((item, index) => {
          return (
            <button
              className='dropdown-item'
              key={index}
              type='button'
              onClick={e => {
                setOption(index);
                console.log(e);
              }}
            >
              {item.text}
            </button>
          );
        })}
      </div>
      </div>
      
    </div>
  );
};

export default SelectOption;
