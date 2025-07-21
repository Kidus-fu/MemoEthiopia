import BlogFooter from "../../components/Blog/BlogFooter";
import BlogNavber from "../../components/Blog/BlogNavber";

const BlogAboutUs = () => {
    return (
        <>
            <BlogNavber />
            <section className="overflow-hidden pt-15 pb-12 lg:pt-[50px] px-2 lg:pb-[120px] bg-white">
                <div className="container mx-auto">
                    <div className="flex flex-wrap items-center justify-between -mx-4">
                        <div className="w-full px-4 lg:w-6/12">
                            <div className="flex items-center -mx-3 sm:-mx-4">
                                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                                    <div className="py-3 sm:py-4">
                                        <img
                                            src="https://img.pikbest.com/origin/10/51/03/3pIkbEsTCpIkbEsTIDf.jpg!bw700"
                                            alt=""
                                            className="w-full rounded-2xl"
                                        />
                                    </div>
                                    <div className="py-3 sm:py-4">
                                        <img
                                            src="https://thumbs.dreamstime.com/b/smile-portrait-black-man-office-confidence-strategic-planning-information-review-male-intern-arms-crossed-happy-326196315.jpg"
                                            alt=""
                                            className="w-full rounded-2xl"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                                    <div className="relative z-10 my-4">
                                        <img
                                            src="https://tse1.mm.bing.net/th/id/OIP.DCTm3UpoDnYbto3liTtgJAHaE1?w=514&h=336&rs=1&pid=ImgDetMain&o=7&rm=3"
                                            alt=""
                                            className="w-full rounded-2xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                            <div className="mt-10 lg:mt-0">
                                <span className="block mb-4 text-lg font-semibold text-primary">
                                    About MemoEthiopia Blog
                                </span>
                                <h2 className="mb-5 text-3xl font-bold text-dark  sm:text-[40px]/[48px]">
                                    Stay Updated with MemoEthiopia
                                </h2>
                                <p className="mb-5 text-base text-body-color dark:text-dark-6">
                                    MemoEthiopia is a note-taking application power by AI designed to help you capture your thoughts, organize your ideas, and stay productive wherever you are. We believe note-taking should be simple, fast, and accessible for everyone.
                                </p>
                                <p className="mb-8 text-base text-body-color dark:text-dark-6">
                                    This blog is your place to stay updated on what's new with MemoEthiopia, including feature updates, tips on making the most of your notes, and stories from our team. Whether we are rolling out a new feature or sharing productivity insights, you'll find it here.
                                </p>
                                <a
                                    href="/signup"
                                    className="inline-flex items-center justify-center py-3 text-base font-medium text-center border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90"
                                >
                                    Try MemoEthiopia Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <BlogFooter />
        </>
    );
};

export default BlogAboutUs;
