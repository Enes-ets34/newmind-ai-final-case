import { useParams, useNavigate } from 'react-router-dom';
import { profileSidebarStlyes } from './profileSidebar.styles';
import { listItems, ListItemType } from '../profile-dropdown/listItems';

const ProfileSidebar: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <aside className={profileSidebarStlyes.aside}>
      <ul className={profileSidebarStlyes.list}>
        {listItems.map((listItem: ListItemType) => (
          <li
            onClick={() => navigate(`/profile/${listItem.path}`)}
            key={listItem.id}
            className={`${
              params?.path === listItem.path ? 'text-primary bg-lilac' : ''
            } ${profileSidebarStlyes.listItem}`}
          >
            <p>{listItem.text}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ProfileSidebar;
