import PageHeader from './components/header/header';
import PageFooter from './components/footer/footer';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/main-page/main-page';
import { WelcomePage } from './pages/welcome-page/welcome-page';
import { BoardPage } from './pages/board-page/board-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { ProfileEditPage } from './pages/profile-edit-page/profile-edit-page';
import { ProtectedRoute } from './components/protected-route';
import './App.scss';
import { SigninPage } from './pages/signin';
import { SignupPage } from './pages/signup';
import { ErrorPropmt } from './components/error-prompt/error-prompt';

function App() {
  return (
    <div className="App">
      <ErrorPropmt></ErrorPropmt>
      <PageHeader></PageHeader>

      <Routes>
        <Route element={<ProtectedRoute onlyPublic={true} />}>
          <Route path="/" element={<WelcomePage></WelcomePage>} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/main" element={<MainPage></MainPage>} />
          <Route path="/board" element={<BoardPage></BoardPage>} />
          <Route path="/search" element={<BoardPage></BoardPage>} />
          <Route path="/profile" element={<ProfileEditPage></ProfileEditPage>}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>} />
      </Routes>

      <PageFooter></PageFooter>
    </div>
  );
}

export default App;
