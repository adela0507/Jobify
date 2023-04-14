import main from '../assets/images/main-alternative.svg'
import { Logo } from '../components';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LandingPage';

const Landing = () => {
  return (
    <Wrapper>
        <nav>
<Logo/>
        </nav>
    
        <div className='container page'>
            <div className="info">
                <h1>jobul <span>tracking</span> app</h1>
                <p>dshfcgk uygbcfubd  ychyfre efcbdbh </p>
                <Link to='/register' className='btn btn-hero'>Login/Register</Link>
            </div>
            <img src={main}alt="" />
        </div>
    
    </Wrapper>
  )
}

export default Landing;
