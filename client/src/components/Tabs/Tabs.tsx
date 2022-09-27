import React from "react";
import classNames from "classnames";

interface Props {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const Tabs = ({ activeTab, setActiveTab }: Props) => {
  return (
    <>
      <div className='mb-4 border-b border-gray-200 dark:border-gray-700'>
        <ul
          className='flex flex-wrap -mb-px text-sm font-medium text-center'
          id='myTab'
          data-tabs-toggle='#myTabContent'
          role='tablist'
        >
          <li className='mr-2' role='presentation'>
            <button
              className={classNames(
                "text-xl inline-block p-4 rounded-t-lg border-b-2",
                activeTab === 0
                  ? "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
              )}
              id='park-tab'
              data-tabs-target='#park'
              type='button'
              role='tab'
              aria-controls='park'
              aria-selected='true'
              onClick={() => setActiveTab(0)}
            >
              Park
            </button>
          </li>
          <li className='mr-2' role='presentation'>
            <button
              className={classNames(
                "text-xl inline-block p-4 rounded-t-lg border-b-2",
                activeTab === 1
                  ? "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
              )}
              id='unpark-tab'
              data-tabs-target='#unpark'
              type='button'
              role='tab'
              aria-controls='unpark'
              aria-selected='false'
              onClick={() => setActiveTab(1)}
            >
              Unpark
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Tabs;
