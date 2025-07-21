import { BarChartOutlined, EditFilled, PieChartFilled, UserOutlined } from '@ant-design/icons';
import React from 'react';

const BlogDeshbordCommingSoon: React.FC = () => {
    return (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-12 w-full ">
	<div className="p-6 bg-gray-100">
		<p className="text-center text-4xl">
			<UserOutlined />
		</p>

		<h2 className="font-semibold text-lg text-center text-gray-800 mt-2">
			Your Feature Here
		</h2>

		<p className="mt-2 text-gray-800 text-center">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias excepturi fuga, laudantium molestias
			nesciunt tempore.
		</p>
	</div>
	<div className="p-6 bg-gray-100">
		<p className="text-center text-4xl">
			<EditFilled />
		</p>

		<h2 className="font-semibold text-lg text-center text-gray-800 mt-2">
			Your Feature Here
		</h2>

		<p className="mt-2 text-gray-800 text-center">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias excepturi fuga, laudantium molestias
			nesciunt tempore.
		</p>
	</div>
	<div className="p-6 bg-gray-100">
		<p className="text-center text-4xl">
			<BarChartOutlined />
		</p>

		<h2 className="font-semibold text-lg text-center text-gray-800 mt-2">
			Analysis
		</h2>

		<p className="mt-2 text-gray-800 text-center">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias excepturi fuga, laudantium molestias
			nesciunt tempore.
		</p>
	</div>
	<div className="p-6 bg-gray-100">
		<p className="text-center text-4xl">
			<PieChartFilled />
		</p>

		<h2 className="font-semibold text-lg text-center text-gray-800 mt-2">
			Your Feature Here
		</h2>

		<p className="mt-2 text-gray-800 text-center">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias excepturi fuga, laudantium molestias
			nesciunt tempore.
		</p>
	</div>
</div>
    );
};

export default BlogDeshbordCommingSoon;