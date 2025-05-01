import React from 'react';
import LandingNavBar from './LandingNavBer';
import Section1 from '../Section1';
import { Popover } from 'antd';
import { backToClentMode, changeToDeveloperMode } from '../../store/Developer_test';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { BugFilled, BugOutlined } from '@ant-design/icons';
import Section2 from '../Section2';
import Section3 from '../Section3';
import LandingFooter from './LandingFooter';
import LandingPageCarousel from './Carousel';

const LandingPage: React.FC = () => {
    const DeveloperTest: boolean = useSelector((state: RootState) => state.developertest.border_test)
    const dispatch = useDispatch()
    // Helper function to add Developer_test class if needed
    const getClassNames = (baseClass: string) => `${baseClass} ${DeveloperTest ? 'border border-red-700' : ''}`;

    const HandelerDeveloperTest = () => {
        dispatch(changeToDeveloperMode())
    }
    const HandelerClient = () => {
        dispatch(backToClentMode())
    }

    return (
        <>
            <LandingNavBar />
                <LandingPageCarousel />
            <div className='text-white mx-3 md:mx-10 mt-2'>
                <Section1 />
                <Section2 />
                <div className="">
                    <Section3 />
                </div>
            </div>
            <Popover title="1 Click to Off, Double Click to On">
                <button
                    className={getClassNames("fixed bottom-0 z-50 text-white text-2xl border p-4 right-0 m-2 rounded-full border-red-800")}
                    onDoubleClick={HandelerDeveloperTest}
                    onClick={HandelerClient}
                >
                    {DeveloperTest ? <BugFilled /> : <BugOutlined />}
                </button>
            </Popover>
            <LandingFooter />
        </>
    );
};

export default LandingPage;