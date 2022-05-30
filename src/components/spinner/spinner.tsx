import './spinner.scss';

export const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="active-search">
        <span className="non-visible">Loading data</span>
      </div>
    </div>
  );
};
