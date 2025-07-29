import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Heros1 from '../../components/DevpafeCom/Heros-1';
import Heros2 from '../../components/DevpafeCom/Heros-2';
import DocmRev from '../../components/DevpafeCom/DocmRev';
import Footer from '../../components/Landing/Footer';
import LandingNavBar from '../../components/Landing/LandingNavBer';

const Devpag: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);

    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle =
            theme === 'dark'
                ? 'bg-[#1C1C1C] text-white'
                : 'bg-[#F3F6FB] text-black';
        return `${base} ${border} ${themeStyle}`;
    };

    return (
        <div className={getClassNames('relative z-0 ')}>
            <LandingNavBar />
           <Heros1 />
           <Heros2 />
           <DocmRev />
           
           <Footer />
        </div>
    );
};

export default Devpag;
