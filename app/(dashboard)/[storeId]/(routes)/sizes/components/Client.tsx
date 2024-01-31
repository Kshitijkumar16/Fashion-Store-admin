"use client";
// Global imports
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
//Local imports
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SizeColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/dataTable";
import { APIList } from "@/components/ui/apiList";

interface SizeClientProps {
	data: SizeColumn[];
}

export const SizeClient = ({ data }: SizeClientProps) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Sizes (${data.length})`}
					description='Manage sizes for your store'
				/>
				<Button
					onClick={() => {
						router.push(`/${params.storeId}/sizes/new`);
					}}
				>
					<Plus className='h-4 w-4 mr-2' />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				data={data}
				searchKey='label'
			/>
			<Heading
				title='API'
				description='API calls for sizes'
			/>
			<Separator />
			<APIList
				entityName='sizes'
				entityIdName='sizeId'
			/>
		</>
	);
};
