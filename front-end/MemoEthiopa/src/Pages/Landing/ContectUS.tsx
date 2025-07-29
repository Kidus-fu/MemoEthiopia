import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Footer from "../../components/Landing/Footer";
import LandingNavBar from "../../components/Landing/LandingNavBer";
import ContactUs from "../../components/Landing/ContactUs";
import { useEffect } from "react";

const ContectUS = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark'
            ? 'bg-[#1C1C1C] text-white '
            : 'bg-[#F3F6FB] text-black ';
        return `${base} ${border} ${themeStyle}`;
    };
    useEffect(() => {
        document.title = "Memo Ethiopia | Contect us"
    })
    return (
        <>
            <div className={getClassNames("")}>
                <LandingNavBar />
                <section className={getClassNames("overflow-hidden ")}>
                    <ContactUs />
                </section>
                <Footer />
            </div>
        </>
    );
};

export default ContectUS;
