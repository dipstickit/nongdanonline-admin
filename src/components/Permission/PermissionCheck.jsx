import { useSelector } from 'react-redux';
import NoPermission from './NoPermission';

const PermissionCheck = ({ children }) => {
  const authState = useSelector(state => state.authSlice);
  if (authState.userData.role === 'Admin') return children;

  return <NoPermission />;
};

export default PermissionCheck;
