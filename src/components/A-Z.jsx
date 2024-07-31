import React from 'react';
import { plans } from '@/utils/outing';

const AZ = ({ setOpenModal }) => {
  return (
    <div className="overflow-y-auto relative bg-white text-black h-full w-11/12 lg:w-[33%] ml-auto rounded-lg">
      <button
        onClick={() =>
          setOpenModal({
            name: '',
            status: false,
          })
        }
        className="absolute top-0 right-0 h-12 w-12 rounded-md shadow-md"
      >
        X
      </button>

      <div className="py-10 px-6 ">
        <h3 className="font-bold text-lg">A-Z Date Ideas</h3>

        <p className="mb-4 mt-2 text-base ">
          We have taken the time to represent several dating ideas in
          alphabetical order to make perusing a lot more easier
        </p>

        <div className="overflow-y-scroll">
          {' '}
          {plans?.map((item) => (
            <div className="mb-6" key={item.header}>
              <span className="font-bold text-xl">{item.header}</span>

              <ul className="mt-3">
                {item.ideas?.map((_item) => (
                  <li className="pl-4 mb-2" key={_item.id}>
                    {_item.idea}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AZ;
