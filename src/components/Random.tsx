import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { plans } from '@/utils/outing';

interface Searched {
  id?: number;
  header?: string;
  ideas?: Idea[];
}

interface Idea {
  id: number;
  idea: string;
}

interface RandomProps {
  setOpenModal: (modalState: { name: string; status: boolean }) => void;
}

const Random: React.FC<RandomProps> = ({ setOpenModal }) => {
  const [keyW, setKeyW] = useState<string>('');
  const [results, setResults] = useState<Searched>({});
  const [startIndex, setStartIndex] = useState<number>(0);
  const itemsPerPage = 4;

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searched =
      plans.find((item) => item.header === keyW.toUpperCase()) || {};

    setResults(searched);
    setStartIndex(0); // Reset start index when a new search is performed
  };

  useEffect(() => {
    if (keyW.length === 0) {
      setResults({});
    }
  }, [keyW]);

  const handleMoreClick = () => {
    const nextIndex = startIndex + itemsPerPage;
    if (nextIndex < (results.ideas?.length ?? 0)) {
      setStartIndex(nextIndex);
    }
  };

  const handlePreviousClick = () => {
    const prevIndex = startIndex - itemsPerPage;
    if (prevIndex >= 0) {
      setStartIndex(prevIndex);
    }
  };

  const itemsToShow =
    results.ideas?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div className="relative bg-white text-black w-full h-fit lg:h-fit lg:w-1/3 mx-auto rounded-lg p-8">
      <button
        onClick={() => setOpenModal({ name: '', status: false })}
        className="absolute top-0 right-0 h-12 w-12 rounded-md shadow-md"
      >
        X
      </button>

      <div>
        <h2 className="font-semibold text-xl text-black">Random Outyn Ideas</h2>
        <p className="text-sm text-gray-500">
          Search through our list of outyn ideas
        </p>

        <div className="mt-12 mb-4">
          <div
            className={`overflow-hidden transition-all duration-500 ${
              results.header ? 'animate-expand' : 'animate-collapse'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-2xl text-black">
                {results.header}
              </span>

              <div className="flex justify-between gap-x-8">
                <button
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-md "
                  disabled={startIndex === 0}
                  onClick={handlePreviousClick}
                >
                  <svg
                    className={
                      startIndex > 0
                        ? 'stroke-black animate-fadeIn'
                        : 'stroke-gray-100'
                    }
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.10007 12.8834L1.2334 7.00003L7.10007 1.1167"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  className=" h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-md "
                  disabled={
                    startIndex + itemsPerPage > (results.ideas?.length ?? 0)
                  }
                  onClick={handleMoreClick}
                >
                  <svg
                    className={
                      startIndex + itemsPerPage < (results.ideas?.length ?? 0)
                        ? 'stroke-black animate-fadeIn'
                        : 'stroke-gray-100'
                    }
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.899902 12.8834L6.76657 7.00003L0.899902 1.1167"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <ul>
              {itemsToShow.map((item) => (
                <li
                  className="py-1 px-2 border  border-gray-100 mt-1"
                  key={item.id}
                >
                  {item.idea}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={handleSearch} className="my-4">
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setKeyW(e.target.value)
            }
            className="w-full   focus:outline-red-200 px-3 py-2 border border-pink-200 rounded text-base text-black"
            type="search"
            placeholder="Search with just a letter e.g A"
          />
          <button
            type="submit"
            className="shadow-lg shadow-red-500 text-white absolute -bottom-2 -right-4 bg-red-400 text-base font-semibold px-8 py-4 rounded-full"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Random;
