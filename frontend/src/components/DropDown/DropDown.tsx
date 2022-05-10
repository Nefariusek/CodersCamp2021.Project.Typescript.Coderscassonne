const DropDowonComponent = (buttonValue: any, values: Array<any>, handleOnClick: Function) => {
  return (
    <div>
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="text-DARKTHEME_BACKGROUND_COLOR hover:text-white  font-ALMENDRA font-bold text-3xl bg-DARKTHEME_LIGHT_GREEN_COLOR hover:bg-DARKTHEME_DARK_GREEN_COLOR focus:ring-4 focus:outline-none rounded-lg px-4 py-2.5 mt-3 text-center inline-flex items-center"
        type="button"
      >
        {buttonValue}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div id="dropdown" className="z-10 hidden bg-DARKTHEME_LIGHT_GREEN_COLOR divide-gray-100 rounded shadow w-44">
        <ul className="py-1 text-sm text-DARKTHEME_BACKGROUND_COLOR" aria-labelledby="dropdownDefault">
          {values.map((value) => (
            <li key={value}>
              <a
                onClick={() => handleOnClick}
                className="block px-4 py-2 hover:bg-DARKTHEME_DARK_GREEN_COLOR hover:text-white"
              >
                {value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDowonComponent;
