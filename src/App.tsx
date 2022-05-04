import './App.css';
import { PageHeader } from './components/header/header';
import { PageFooter } from './components/footer/footer';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/main-page/main-page';
import { WelcomePage } from './pages/welcome-page/welcome-page';
import { BoardPage } from './pages/board-page/board-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { ProfileEditPage } from './pages/profile-edit-page/profile-edit-page';
function App() {
  return (
    <div className="App">
      <PageHeader></PageHeader>
      <main className="main">
        <Routes>
          <Route path="/" element={<WelcomePage></WelcomePage>} />
          <Route path="/main" element={<MainPage></MainPage>} />
          <Route path="/board" element={<BoardPage></BoardPage>} />
          <Route path="/profile" element={<ProfileEditPage></ProfileEditPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>} />
        </Routes>
      </main>
      <PageFooter></PageFooter>
    </div>
  );
}

export default App;
