import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import toast from 'react-hot-toast';

const Update = () => {
	const initialMangoData = useLoaderData();
	const [mangoData, setMangoData] = useState(initialMangoData);
	const [loading, setLoading] = useState();
	const handleSubmit = e => {
		e.preventDefault();
		fetch(`http://localhost:5000/mango/${mangoData._id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(mangoData),
		})
			.then(res => res.json())
			.then(data => {
				if (data.modifiedCount) {
					toast.success('Data Modified successfully');
				}
			});
	};
	const handleChange = e => {
		setMangoData({ ...mangoData, [e.target.name]: e.target.value });
	};

	const getFiles = async file => {
		setLoading(true);
		const formData = new FormData();
		formData.set('image', file.base64.split('base64,')[1]);
		await fetch(
			`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API}`,
			{
				method: 'POST',
				body: formData,
			}
		)
			.then(res => res.json())
			.then(data => {
				setLoading(false);
				setMangoData({ ...mangoData, imageURL: data.data.display_url });
			});
	};
	return (
		<div>
			<h1 className="font-semibold text-2xl text-center my-4">
				Update mango data
			</h1>
			{loading && <p className="bg-green-700 text-white">Loading</p>}
			<form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
				<input
					type="text"
					name="name"
					onChange={handleChange}
					placeholder="Mango name"
					className="input input-bordered w-full max-w-lg"
					value={mangoData.name}
				/>
				<input
					type="text"
					name="price"
					onChange={handleChange}
					placeholder="Mango price"
					className="input input-bordered w-full max-w-lg"
					value={mangoData.price}
				/>
				<FileBase64 onDone={getFiles} />
				<br />
				<div className="text-center">
					<input type="submit" value="submit" className="btn btn-accent" />
				</div>
			</form>
		</div>
	);
};

export default Update;
