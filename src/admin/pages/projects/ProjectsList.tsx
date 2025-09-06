import { BiX } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';
import Alert from '../../components/Alert';
import Card from '../../components/Card/Card';
import React, { useEffect, useState } from 'react'
import { formatDate } from '../../../common/utils';
import { useAlert, useConfirmation } from '../../hooks/useModal';
import { BsGithub, BsPencilSquare, BsTrash } from 'react-icons/bs';
import DataTable, { type Column } from '../../components/DataTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { getProjects, ProjectStatus, type ProjectsQueryParams } from '../../services/projects.service';

export interface Project {
	_id: string;
	title: string;
	description: string;
	tech: string[];
	status: string;
	image?: string;
	live?: string;
	github: string;
	createdAt: string;
}

const ProjectsList: React.FC = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });
	const [searchTerm, setSearchTerm] = useState('');
	const [deleteLoading, setDeleteLoading] = useState(false);

	const { confirmationState, showConfirmation, hideConfirmation } = useConfirmation();
	const { alertState, showAlert, hideAlert } = useAlert();

	const fetchBlogs = async (params: ProjectsQueryParams = {}) => {
		try {
			setLoading(true);
			const res = await getProjects(params);
			setProjects(res.projects);
			setPagination(res.pagination);
		} catch (error) {
			showAlert({
				title: "Error",
				message: error instanceof Error ? error.message : "Failed to load projects",
				type: "error"
			});
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchBlogs({ page: 1, limit: 10 });
	}, [])

	const handlePageChange = () => {

	}

	const handlePageSizeChange = () => {

	}

	const handleSearch = () => {

	}

	const handleDelete = (id: string) => {

	}

	const handleStatusChange = (id: string) => {

	}

	const columns: Column<Project>[] = [
		{
			key: "serial",
			label: "Sr.No.",
			render: (_, project) => {
				const index = projects.findIndex(p => p._id === project._id);
				return (
					<div>
						{(pagination.page - 1) * pagination.limit + index + 1}
					</div>
				)
			}
		},
		{
			key: "title",
			label: "Title",
			render: (_, project) => {
				return (
					<div className="font-medium text-gray-900 dark:text-white">
						{project.title}
					</div>
				)
			}
		},
		{
			key: "github",
			label: "GitHub",
			render: (_, project) => {
				return (
					<Link
						to={project.github}
					>
						<BsGithub size={20} />
					</Link>
				)
			}
		},
		{
			key: "status",
			label: "Status",
			render: (_, project) => {
				return (
					<div className="text-gray-600 dark:text-gray-400">
						{project.status}
					</div>
				)
			}
		},
		{
			key: "createdAt",
			label: "Created At",
			render: (_, project) => {
				return (
					<div className="text-gray-600 dark:text-gray-400">
						{formatDate(project.createdAt)}
					</div>
				)
			}
		},
		{
			key: 'actions',
			label: 'Actions',
			render: (_, project) => (
				<div className="flex gap-2">
					<a
						href={`/admin/projects/edit/${project._id}`}
						className="text-blue-600 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200"
						title="Edit project"
					>
						<BsPencilSquare size={20} />
					</a>
					<button
						onClick={() => handleDelete(project._id)}
						className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
						title="Delete Project"
					>
						<BsTrash size={20} />
					</button>
					<div>
						{
							project.status === ProjectStatus.INACTIVE && <button
								onClick={() => handleStatusChange(project._id)}
								className="text-green-600 hover:text-green-700 p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-200"
								title="Unpublish project"
							>
								<TiTick size={20} />
							</button>
						}

						{project.status === ProjectStatus.ACTIVE && <button
							onClick={() => handleStatusChange(project._id)}
							className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
							title="Publish Project"
						>
							<BiX size={20} />
						</button>}
					</div>
				</div>
			)
		}

	]

	return (
		<>
			<Card title='Projects'>
				<div>
					<div className='mb-4 flex items-center justify-end'>
						<Link
							to="/admin/projects/create"
							className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors'
						>
							Create New Project
						</Link>
					</div>

					<DataTable
						data={projects}
						columns={columns}
						loading={loading}
						searchable
						// searchKeys={['title']}
						pagination={{
							total: pagination.total,
							page: pagination.page,
							limit: pagination.limit,
							totalPages: pagination.totalPages,
							onPageChange: handlePageChange,
							onPageSizeChange: handlePageSizeChange,
							onSearch: handleSearch
						}}
					/>
				</div>
			</Card>

			<ConfirmationDialog
				isOpen={confirmationState.isOpen}
				onClose={hideConfirmation}
				onConfirm={confirmationState.onConfirm}
				title={confirmationState.title}
				message={confirmationState.message}
				confirmText={confirmationState.confirmText}
				cancelText={confirmationState.cancelText}
				type={confirmationState.type}
				loading={deleteLoading}
			/>

			<Alert
				isOpen={alertState.isOpen}
				onClose={hideAlert}
				title={alertState.title}
				message={alertState.message}
				type={alertState.type}
				buttonText={alertState.buttonText}
			/>
		</>
	)
}

export default ProjectsList