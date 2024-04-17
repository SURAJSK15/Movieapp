import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../feature/User/UserSlice';

function Protected({ children }) {
    const user = useSelector(loginUser);
  if (!user) {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;