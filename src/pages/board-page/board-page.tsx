import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Board } from '../../components/board/board';
import './board-page.scss';

export function BoardPage() {
  return (
    <>
      <header>
        <button>
          <FormattedMessage id="header_newColumn" defaultMessage="Create new column" />
        </button>

        <Link to="/main">
          <button>
            <FormattedMessage id="boardpage_back" defaultMessage="Back to boards list" />
          </button>
        </Link>
      </header>
      <ul className="board-list">
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
      </ul>
    </>
  );
}
