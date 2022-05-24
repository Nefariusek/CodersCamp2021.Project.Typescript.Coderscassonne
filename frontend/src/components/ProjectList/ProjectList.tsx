import { observer } from 'mobx-react';
import rootStore from '../../stores/RootStore';

const ProjectList = observer(() => {
  return (
    <table
      className="font-ALMENDRA font-bold text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3"
      style={{ position: 'absolute', right: 0 }}
    >
      <thead>
        <tr>
          <th>no.</th>
          <th>Type</th>
          <th>Tiles</th>
          <th>setlength</th>
          <th>isfinishable</th>
          <th>isfinished</th>
          <th>Meeples</th>
        </tr>
      </thead>
      <tbody>
        {rootStore.projectStore.allProjects.map((project, idx) => {
          return (
            <tr key={idx}>
              <td>{project.id}</td>
              <td>{project.type}</td>
              <td>{project.tiles.length}</td>
              <td>{project.openEdgesSet.size}</td>
              <td>{project.isFinishable ? 'yes' : 'nope'}</td>
              <td>{project.isFinished ? 'yes' : 'nope'}</td>
              <td>{project.meeples.length}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default ProjectList;
