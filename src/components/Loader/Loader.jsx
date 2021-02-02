import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function PageLoader() {
  //other logic

  return <Loader type="ThreeDots" color="#00BFFF" height={400} width={200} />;
}
