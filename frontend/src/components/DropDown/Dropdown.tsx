import { FunctionComponent } from 'react';
import './Dropdown.css';
import rootStore from '../../stores/RootStore';
import { observer } from 'mobx-react-lite';
import Project from '../../model/Project';
import { GamePhases } from '../NextPhaseButton/NextPhaseButton';

export const DisabledInfo = () => {
  return (
    <div className="p-10">
      <div className="group inline-block z-50">
        <div className="outline-none focus:outline-none font-ALMENDRA  px-3 py-1 bg-DARKTHEME_LIGHT_GREEN_COLOR rounded-sm flex items-center min-w-32">
          <span className="pr-1 font-semibold flex-1">Meeple can't be place now</span>
        </div>
      </div>
    </div>
  );
};

interface DropdownProps {}

export const Dropdown: FunctionComponent<DropdownProps> = observer(() => {
  const availableProjects = rootStore.projectStore.availableProjects;
  const currentPhase = rootStore.gameStore.currentPhase;
  const handleOptionClick = (project: Project) => {
    rootStore.gameStore.placeMeeple(project);
  };

  return availableProjects?.length && currentPhase === GamePhases.MEEPLE_PLACEMENT ? (
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
          {availableProjects?.map((project) => (
            <li
              onClick={() => handleOptionClick(project)}
              className="rounded-sm relative px-3 py-1 hover:bg-DARKTHEME_DARK_GREEN_COLOR hover:text-white"
            >
              {project.type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className="p-10">
      <div className="group inline-block z-50">
        <div className="outline-none focus:outline-none font-ALMENDRA  px-3 py-1 bg-DARKTHEME_LIGHT_GREEN_COLOR rounded-sm flex items-center min-w-32">
          <span className="pr-1 font-semibold flex-1">Meeple placed</span>
        </div>
      </div>
    </div>
  );
});
