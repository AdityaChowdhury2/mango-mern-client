import { useState } from 'react';
import toast from 'react-hot-toast';

import { Link, useLoaderData } from 'react-router-dom';

const MangoTable = () => {
	const mongoData = useLoaderData();
	const [mangoes, setMangoes] = useState(mongoData);

	const handleDelete = id => {
		fetch(`http://localhost:5000/mango/${id}`, {
			method: 'DELETE',
		})
			.then(res => res.json())
			.then(data => {
				if (data.deletedCount > 0) {
					toast.success('mango data deleted successfully');
					setMangoes(mangoes.filter(mango => mango._id !== id));
				}
			});
	};
	return (
		<div className="container">
			<h1 className="font-semibold text-2xl text-center my-4">Mango Table</h1>

			<div className="overflow-x-auto">
				<table className="table table-zebra">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{mangoes.map(mango => (
							<tr key={mango._id}>
								<td>
									<img src={mango.imageURL} alt="" className="h-10 w-12" />
								</td>
								<td>{mango.name}</td>
								<td>{mango.price}</td>
								<td className="space-x-2">
									<Link to={`http://127.0.0.1:5173/mangoes/${mango._id}`}>
										<button className="btn btn-success">edit</button>
									</Link>
									<button
										onClick={() => handleDelete(mango._id)}
										className="btn btn-error"
									>
										delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MangoTable;
