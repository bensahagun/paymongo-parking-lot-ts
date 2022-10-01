import cx from "classnames";

interface Props {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const Tabs = ({ activeTab, setActiveTab }: Props) => {
  return (
    <>
      <div className='mb-4 border-b border-gray-700'>
        <ul
          className='flex flex-wrap -mb-px text-sm font-medium text-center'
          id='myTab'
          data-tabs-toggle='#myTabContent'
          role='tablist'
        >
          <li className='mr-2' role='presentation'>
            <button
              className={cx(
                "text-xl inline-block p-4 rounded-t-lg border-b-2",
                activeTab === 0
                  ? "  hover:text-blue-500  border-blue-500 text-blue-500"
                  : " hover:border-gray-300 hover:text-gray-300 border-transparent  text-gray-400  border-gray-700"
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
              className={cx(
                "text-xl inline-block p-4 rounded-t-lg border-b-2",
                activeTab === 1
                  ? "  hover:text-blue-500  border-blue-500 text-blue-500"
                  : " hover:border-gray-300 hover:text-gray-300 border-transparent  text-gray-400  border-gray-700"
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
