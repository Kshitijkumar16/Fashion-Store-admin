//Global imports
import { format } from "date-fns";
//Local imports
import prismadb from "@/lib/prismadb";
import { ColorClient } from "./components/Client";
import { ColorColumn } from "./components/Columns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
	const colors = await prismadb.color.findMany({
		where: { storeId: params.storeId },
		orderBy: {
			createdAt: "desc"
		},
	});

	const formattedColors: ColorColumn[] = colors.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: format(item.createdAt, "MMMM do, yyyy"),
	}));

	return (
		<div className='flex flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ColorClient data={formattedColors} />
			</div>
		</div>
	);
};

export default ColorsPage;
