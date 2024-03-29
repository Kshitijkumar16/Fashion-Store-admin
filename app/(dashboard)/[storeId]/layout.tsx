// Dashboard page's layout

// Global imports
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
// Local imports
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/Navbar";

// Component

export default async function DashboardLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: {
		userID: string; storeId: string 
};
}) {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	if (!params.storeId) {
		redirect("/");
	}

	const store = await prismadb.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		},
	});

	if (!store) {
		redirect("/");
	}

	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
