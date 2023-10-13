import { useState } from 'react';
import FileBase64 from 'react-file-base64';
import toast from 'react-hot-toast';

const Home = () => {
	const [mangoData, setMangoData] = useState({});

	const handleSubmit = async e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		e.target.reset();
		const newData = {};
		for (const data of formData.entries()) {
			newData[data[0]] = data[1];
		}
		setMangoData({ ...mangoData, ...newData });
		await fetch('http://localhost:5000/', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(mangoData),
		})
			.then(res => res.json())
			.then(data => {
				if (data.insertedId) toast.success('Mango added successfully');
			})
			.catch(err => {
				toast.error(err.message);
			});
	};

	const getFiles = async file => {
		// setLoading(true);
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
				setMangoData({ ...mangoData, imageURL: data.data.display_url });
			});
	};
	console.log(mangoData);
	return (
		<div className="container">
			<h1 className="font-semibold text-2xl text-center my-4">
				Mango data create
			</h1>
			{/* {loading ? (
				<p>Loading</p>
			) : ( */}
			<form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
				<input
					type="text"
					name="name"
					onBlur={e =>
						setMangoData({ ...mangoData, [e.target.name]: e.target.value })
					}
					placeholder="Mango name"
					className="input input-bordered w-full max-w-lg"
				/>
				<input
					type="text"
					name="price"
					onBlur={e =>
						setMangoData({ ...mangoData, [e.target.name]: e.target.value })
					}
					placeholder="Mango price"
					className="input input-bordered w-full max-w-lg"
				/>
				<FileBase64 onDone={getFiles} />
				<br />
				<div className="text-center">
					<input type="submit" value="submit" className="btn btn-accent" />
				</div>
			</form>
			{/* )} */}
		</div>
	);
};

export default Home;
