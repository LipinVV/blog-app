import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchUsers } from '../../reducers/usersSlice';
import { Pagination } from '../../components/Pagination';
import { getUsers, getLoading } from '../../selectors';
import { appConsts } from '../../consts';
import { LoadingPage } from '../../components/LoadingPage';
import './users.scss';

export const Users: FC = () => {
  const dispatch = useAppDispatch();
  const userList = useAppSelector(getUsers);
  const loading = useAppSelector(getLoading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const { pageSize } = appConsts;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentUsersOnThePage = userList.slice(indexOfFirstItem, indexOfLastItem);

  const handleClickIncrease = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const handleClickDecrease = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="users">
      <h1 className="users__header">Our gorgeous users:</h1>
      {currentUsersOnThePage.map((user: UserType) => (
        <div className="users__user-card" key={user.id}>
          <span className="users__user-card-name">{user.username}</span>
          <span className="users__user-card-city">{user.address.city}</span>
          <Link
            className="users__link"
            to={`/users/${user.username}/${user.id}`}
          >
            Watch profile
          </Link>
        </div>
      ))}
      <Pagination
        handleClickDecrease={handleClickDecrease}
        handleClickIncrease={handleClickIncrease}
        currentPage={currentPage}
        indexOfLastItem={indexOfLastItem}
        users={userList}
      />
    </div>
  );
};
