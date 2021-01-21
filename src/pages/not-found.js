import { Link } from 'react-router-dom';
import PageFrame from '../components/page-frame';

export default function NotFoundScreen() {
  return (
    <PageFrame>
      <div>
        Sorry... nothing here. <Link to="/">Go home</Link>
      </div>
    </PageFrame>
  );
}
