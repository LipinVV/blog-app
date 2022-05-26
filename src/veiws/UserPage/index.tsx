import { useParams } from 'react-router';
import { useEffect, useMemo } from 'react';
import { User } from '../User';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { UserType } from '../../types';
import { fetchUserPosts } from '../../reducers/usersSlice';
import { Posts } from '../Posts';
import { getUsers } from '../../selectors';
import { appConsts } from '../../consts';
import './userPage.scss';

export const UserPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const userList = useAppSelector(getUsers);
  const { onPageMinimumLimit } = appConsts;
  const currentUser = useMemo(() => userList.find((user: UserType) => user.id === Number(id)), [id]);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserPosts({ id: Number(id), limit: onPageMinimumLimit }));
    }
  }, [currentUser, id, onPageMinimumLimit]);

  if (!currentUser) return <div>Loading user....</div>;

  return (
    <div className="user-page">
      <User
        geo={currentUser.geo}
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
        geo={currentUser.geo}
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
