import Link from "next/link"
import { usePathname } from "next/navigation"

const menu = [
	{ name: "01. Ascii", path: "/ascii" },
	{ name: "02. Look at Mouse", path: "/look-at-mouse" },
	{ name: "03. Custom Geometry", path: "/custom-geometry" },
	{ name: "04. Mask", path: "/mask" },
	{
		name: "05. Custom Post Processing – Transition",
		path: "/custom-post-processing-transition",
	},
	{
		name: "06. Custom Post Processing – Curtain",
		path: "/custom-post-processing-curtain",
	},
	{ name: "07. Shaders on Scroll", path: "/shaders-on-scroll" },
	{ name: "08. Scroll", path: "/scroll" },
	{ name: "09. Horizontal Scroll", path: "/scroll-horizontal" },
]

export default function Menu() {
	const pathname = usePathname()

	return (
		<div className='absolute top-8 left-8 z-50 flex flex-col items-start gap-1 pointer-events-auto'>
			{menu.map(({ name, path }) => (
				<Link
					href={path}
					key={path}
					className={`px-1 h-6 ${
						pathname === path
							? "bg-colorGreen text-colorBlack"
							: "bg-colorBlack text-colorGreen"
					}`}
				>
					{name}
				</Link>
			))}
		</div>
	)
}
