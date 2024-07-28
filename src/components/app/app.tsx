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
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';
import { IngredientDetails, Modal } from '@components';
import { ProtectedRoute } from '../protected-route';
import { RootState } from '../../services/store';
import { useCallback, useEffect } from 'react';
import { getUserThunk } from '../../features/user/userSlice';
import { getIngredientsThunk } from '../../features/ingredients/ingredientsSlice';
import { Layout } from '../layout/layout';
import { OrderModal } from '../order-modal';
import { useAppDispatch, useAppSelector } from '../../services/hook';
import { DetailsPage } from '../../pages/details';
import { OrderDetailsPage } from '../..//pages/details/order-details';

export const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userState = useAppSelector((store: RootState) => store.user);
  const ingredientState = useAppSelector(
    (store: RootState) => store.ingredients
  );
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

  const location = useLocation();
  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <Routes location={background || location}>
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
          element={
            <Layout>
              <OrderDetailsPage />
            </Layout>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Layout>
              <DetailsPage title='Детали ингредиента'>
                <IngredientDetails />
              </DetailsPage>
            </Layout>
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
              <Layout>
                <OrderDetailsPage />
              </Layout>
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
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => onModalClose('/')}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Layout>
                  <OrderModal onClose={() => onModalClose('/profile/orders')} />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Layout>
                <OrderModal onClose={() => onModalClose('/feed')} />
              </Layout>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
