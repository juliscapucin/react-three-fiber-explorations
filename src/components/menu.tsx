import Link from "next/link"
import { usePathname } from "next/navigation"

const menu = [
	{ name: "01. Basics", path: "/01-basics" },
	{ name: "02. Model", path: "/02-model" },
	{ name: "03. Leva Controls", path: "/03-leva-controls" },
	{ name: "04. Events / Light / Shadow", path: "/04-events-light-shadow" },
	{ name: "05. Sparkles", path: "/05-sparkles" },
	{ name: "06. Camera", path: "/06-camera" },
	{ name: "07. Scroll Control", path: "/07-scroll-control" },
	{ name: "08. Transform Control", path: "/08-transform-control" },
	{ name: "09. Pivot Control", path: "/09-pivot-control" },
	{ name: "10. Text", path: "/10-text" },
	{ name: "11. Html", path: "/11-html" },
	{ name: "12. Shaders", path: "/12-shaders" },
	{ name: "13. Lerp", path: "/13-lerp" },
	{ name: "14. Ascii", path: "/14-ascii" },
	{ name: "15. Look at Mouse", path: "/15-look-at-mouse" },
]

export default function Menu() {
	const pathname = usePathname()

	return (
		<div className='absolute top-8 left-8 z-50 flex flex-col items-start gap-1 pointer-events-auto'>
			{menu.map(({ name, path }) => (
				<Link
					href={path}
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
