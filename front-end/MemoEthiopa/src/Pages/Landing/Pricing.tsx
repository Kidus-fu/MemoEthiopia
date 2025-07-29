import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Footer from "../../components/Landing/Footer";
import LandingNavBar from "../../components/Landing/LandingNavBer";
import Pricing from "../../components/Landing/Pricing";

const PricingPage = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark'
            ? 'bg-[#1C1C1C] text-white '
            : 'bg-[#F3F6FB] text-black ';
        return `${base} ${border} ${themeStyle}`;
    };
    return (
        <>
            <div className={getClassNames("")}>
                <LandingNavBar />
                <section className={getClassNames("overflow-hidden ")}>
                    <Pricing />
                </section>
                <Footer />
            </div>
        </>
    );
};

export default PricingPage;
