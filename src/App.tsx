import PageHeader from './components/header/header';
import PageFooter from './components/footer/footer';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/main-page/main-page';
import { WelcomePage } from './pages/welcome-page/welcome-page';
import { BoardPage } from './pages/board-page/board-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { ProfileEditPage } from './pages/profile-edit-page/profile-edit-page';

import { RootState, useTypedSelector } from './store';
import { ProtectedRoute } from './components/protected-route';
import './App.scss';
import { SigninPage } from './pages/signin';
import { SignupPage } from './pages/signup';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './lang/locales';
import { messages } from './lang/messages';

function App() {
  const lang = useTypedSelector((state: RootState) => state.langSlice.lang);
  const locale = LOCALES[lang];
  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={LOCALES.ENGLISH}>
      <div className="App">
        <PageHeader></PageHeader>
        <main className="main">
          <Routes>
            <Route path="/" element={<WelcomePage></WelcomePage>} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/main" element={<MainPage></MainPage>} />
              <Route path="/board" element={<BoardPage></BoardPage>} />
              <Route path="/profile" element={<ProfileEditPage></ProfileEditPage>}></Route>
            </Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>} />
          </Routes>
        </main>
        <PageFooter></PageFooter>
      </div>
    </IntlProvider>
  );
}

export default App;
