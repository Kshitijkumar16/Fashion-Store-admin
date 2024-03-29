import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = async () => {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const stores = await prismadb.store.findMany({
		where: {
			userId,
		},
	});

	return (
		<section className='border-b '>
			<div className='flex items-center h-16 px-4 '>
				<StoreSwitcher items={stores} />
				<MainNav className='mx-6' />
				<div className='flex items-center ml-auto space-x-4 '>
					<ThemeToggle />
					<UserButton afterSignOutUrl='/' />
				</div>
			</div>
		</section>
	);
};

export default Navbar;
