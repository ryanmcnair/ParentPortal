/* eslint-disable react/react-in-jsx-scope */
import { RainbowSpinner } from 'react-spinners-kit';

const Loader = () => (
  <div className='spinner'>
    <RainbowSpinner size={250} color='#ff0000' role='status' />
  </div>
);

export default Loader;
