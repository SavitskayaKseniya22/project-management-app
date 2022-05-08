import './header.scss';

const PageHeader = () => {
  return (
    <header className="header">
      <label className="header-search">
        <i className="fa-solid fa-magnifying-glass" />
        <input type="text" placeholder="search" />
      </label>
      <button className="header-new-board">Create new board</button>
      <button className="header-edit">Edit profile</button>
      <button className="header-logout">Log out</button>
    </header>
  );
};

export default PageHeader;
