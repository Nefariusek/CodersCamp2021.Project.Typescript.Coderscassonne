import { FunctionComponent } from 'react';
import './DropDown.css';
import rootStore from '../../stores/RootStore';
import { observer } from 'mobx-react-lite';

interface DropDownProps {}

const DropDown: FunctionComponent<DropDownProps> = observer(() => {
  const availableProjects = rootStore.projectStore.availableProjects;

  console.log(availableProjects);

  return (
    <div className="p-10">
      <div className="group inline-block z-50">
        <button className="outline-none focus:outline-none font-ALMENDRA  px-3 py-1 bg-DARKTHEME_LIGHT_GREEN_COLOR rounded-sm flex items-center min-w-32">
          <span className="pr-1 font-semibold flex-1">Place meeple</span>
          <span>
            <svg
              className="fill-current h-4 w-4 transform group-hover:-rotate-180
                transition duration-150 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </span>
        </button>
        <ul
          className="bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA z-50 rounded-sm transform scale-0 group-hover:scale-100 absolute 
          transition duration-400 ease-in-out origin-top min-w-32"
        >
          <li className="rounded-sm relative px-3 py-1 hover:bg-DARKTHEME_DARK_GREEN_COLOR hover:text-white">
            {availableProjects?.map((project) => (
              <>
                <button className="w-full text-left flex items-center outline-none focus:outline-none">
                  <span className="pr-1 flex-1">{project.type}</span>
                  <span className="mr-auto">
                    <svg
                      className="fill-current h-4 w-4
                    transition duration-400 ease-in-out"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                </button>
              </>
            ))}
            <ul
              className="bg-DARKTHEME_LIGHT_GREEN_COLOR text-black z-50 rounded-sm absolute top-0 right-0 
          transition duration-400 ease-in-out origin-top-left
          min-w-32
          "
            >
              {availableProjects?.map((meeple) => (
                <li className="px-3 py-1 text-black hover:bg-DARKTHEME_DARK_GREEN_COLOR hover:text-white">
                  {meeple.meeples}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
});
export default DropDown;
