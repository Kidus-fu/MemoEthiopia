import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'

type FAQItem = {
    question: string;
    answer: string;
};

const faqs: FAQItem[] = [
    {
        question: "What is MemoEthiopia?",
        answer: "MemoEthiopia is an AI-powered memory assistant that helps you save notes, get reminders, and chat with a smart agent."
    },
    {
        question: "Is there a free version?",
        answer: "Yes! Our Free Plan gives you access to up to 100 memos per month with basic AI agent features."
    },
    {
        question: "Can I use it on mobile?",
        answer: "Absolutely! MemoEthiopia is mobile-friendly and works smoothly on phones and tablets."
    },
    {
        question: "How secure is my data?",
        answer: "Your data is encrypted and securely stored. We do not share your notes with any third parties."
    },
    {
        question: "How do I upgrade to Pro?",
        answer: "You can upgrade anytime by going to your account settings and selecting the Pro plan."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);

    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark'
            ? 'bg-[#1C1C1C] text-white p-1'
            : 'bg-[#F3F6FB] text-black p-1';
        return `${base} ${border} ${themeStyle}`;
    };
    return (
        <section className={getClassNames("relative z-0 mt-1 ")}>
            
            <div className={getClassNames("px-6 py-10 md:py-20 md:px-10 max-w-7xl mx-auto")}>
                <h2 className={getClassNames("text-2xl font-bold text-center mb-8 ")}>Frequently Asked Questions</h2>
                <div className="space-y-4 sm:text-sm">
                    {faqs.map((faq, index) => (
                        <div key={index} className={getClassNames(`border-b ${theme === 'dark' ? "border-gray-800" : "border-gray-300"}  rounded-lg`)}>
                            <button
                                onClick={() => toggle(index)}
                                className={getClassNames("w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center")}
                            >
                                <span className={getClassNames("text-lg font-medium ")}>{faq.question}</span>
                                <span className={getClassNames("text-xl")}>{openIndex === index ? "−" : "+"}</span>
                            </button>
                            {openIndex === index && (
                                <div className={getClassNames("py-6 px-14 pb-4")}>
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
            </div>
            <div
                className={getClassNames(`absolute bottom-50 top-50 left-0 z-0 h-1/2 w-1/12 blur-3xl ${theme === 'dark' ? "bg-gray-800" : "bg-black/10"} blur-2xl`)}
            />
            <div
                className={getClassNames(`absolute  top-0 right-0 z-0 h-1/2 w-1/6 blur-3xl ${theme === 'dark' ? "bg-gray-800" : "bg-black/10"} blur-2xl`)}
            />
        </section>
    );
};

export default FAQ;
