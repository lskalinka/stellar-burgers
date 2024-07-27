import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '../../pages';
import {
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
  useParams
} from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { getUserThunk } from '../../features/user/userSlice';
import { getIngredientsThunk } from '../../features/ingredients/ingredientsSlice';
import { Layout } from '../layout/layout';
import { OrderModal } from '../order-modal';

export const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((store: RootState) => store.user);
  const ingredientState = useSelector((store: RootState) => store.ingredients);
  const onModalClose = (url: string) => {
    navigate(url, {
      replace: true
    });
  };

  const userLoad = useCallback(() => {
    if (ingredientState.isExist === false) {
      dispatch(getIngredientsThunk());
    }
    if (localStorage.getItem('refreshToken') && !userState.user) {
      dispatch(getUserThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    userLoad();
  }, [userLoad]);

  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/feed'
          element={
            <Layout>
              <Feed />
            </Layout>
          }
        />
        <Route
          path='/feed/:number'
          element={<OrderModal onClose={() => onModalClose('/feed')} />}
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={() => onModalClose('/')}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Layout>
                <Login />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Layout>
                <Register />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <Layout>
                <ForgotPassword />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <Layout>
                <ResetPassword />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <Layout>
                <ProfileOrders />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderModal onClose={() => onModalClose('/profile/orders')} />
            </ProtectedRoute>
          }
        />
        <Route
          path='*'
          element={
            <Layout>
              <NotFound404 />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
