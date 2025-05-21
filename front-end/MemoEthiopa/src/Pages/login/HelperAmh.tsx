import React from 'react';

/*


2,

3,
*/

const HelperAmh: React.FC = () => {

    return (
        <div className="p-1  rounded-lg shadow-lg">
            <p className="">
                <span className="font-semibold text-blue-500">Memo Ethiopia</span>  ለመግባት ሁለት አማራጮችን ይሰጣል። ኢሜል ወይም የተጠቃሚ ስም ። የእርስዎን ደህንነት ለማረጋገጥ አንድ ጊዜ የይለፍ ቃል (OTP) ለእርስዎ በኢሜይል ይላክልዎታል.
            </p>

            <div className="mt-3">
                <h1 className="text-2xl font-semibold ">ኢሜይል</h1>
                <p className="mt-1  px-2">
                    በኢሜል ይለፉ, እባክዎ የእርስዎን ኢሜይል አድራሻ ያስገቡ. ይህም የእርስዎን አካውንት ማግኘት የምትችለው እርስዎ ብቻ መሆኑን ለማረጋገጥ አስፈላጊ ነው.
                </p>
            </div>

            <div className="mt-3">
                <h1 className="text-2xl font-semibold ">ተጠቃሚ ስም</h1>
                <p className="mt-1  px-2">
                    በተጠቃሚ ስም ለማለፍ ከሞከሩ , Memo Ethiopa የተጠቃሚ ስሞች ባዶ ቦታ ሊኖራቸው እንደማይችል ያስታውሱ. የተጠቃሚ ስም ከማስገባትዎ በፊት በትክክል እንደፃፉ  ያረጋግጡ።
                </p>
            </div>

            <div className="mt-3">
                <h1 className="text-2xl font-semibold ">የይለፍ ቃልዎን</h1>
                <p className="mt-1  px-2">
                    ለመግባት የይለፍ ቃልዎን ያስገቡ። የይለፍ ቃልህን እረስተዋል? ከሆነ መጨነቅ አያስፈልግህም! እርስዎ የእኛን ድጋፍ ቡድን ማነጋገር ይችላሉ, እና የእርስዎን ኢሜይል ካረጋገጡ በኋላ, በሦስት የሥራ ቀናት ውስጥ የይለፍ ቃል መልሶ ማገናኛ ይደርሰዎታል.
                </p>
            </div>
        </div>
    );
};

export default HelperAmh;