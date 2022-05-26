import { useParams } from 'react-router';
import { useEffect } from 'react';
import { User } from '../User';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { StateType, UserType } from '../../types';
import { fetchUserPost } from '../../reducers/usersSlice';
import { Posts } from '../Posts';
import './userPage.scss';

export const UserPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const userList = useAppSelector((state: StateType) => state.users);

  const currentUser = userList.find((user: UserType) => user.id === Number(id));

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserPost(Number(id)));
    }
  }, [currentUser, dispatch, id]);

  if (!currentUser) return <div>Loading user....</div>;

  return (
    <div className="user-page">
      <User
        name={currentUser.name}
        email={currentUser.email}
        id={currentUser.id}
        address={currentUser.address}
        company={currentUser.company}
        username={currentUser.username}
        website={currentUser.website}
        phone={currentUser.phone}
      />
      <Posts
        name={currentUser.name}
        email={currentUser.email}
        id={currentUser.id}
        address={currentUser.address}
        company={currentUser.company}
        username={currentUser.username}
        website={currentUser.website}
        phone={currentUser.phone}
      />
    </div>
  );
};
