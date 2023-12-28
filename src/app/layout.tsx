"use client"

// import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Link from "next/link"

// Load custom font //
const font = localFont({
	variable: "--font-primary",
	src: [
		{
			path: "../../public/fonts/PPSupplySans-Regular.otf",
			weight: "400",
		},
		{
			path: "../../public/fonts/PPSupplySans-Ultralight.otf",
			weight: "200",
		},
	],
})

// export const metadata: Metadata = {
// 	title: "Create Next App",
// 	description: "Generated by create next app",
// }

function Overlay() {
	return (
		<div className='absolute top-0 left-0 z-50 w-full h-full pointer-events-none'>
			<a
				href='https://juliscapucin.com/'
				className='absolute left-8 bottom-8 bg-colorBlack'
			>
				Juli Scapucin
				<br />
				Creative Developer
			</a>
			<div className='absolute top-8 left-8 z-50 flex flex-col items-start pointer-events-auto [&>a]:bg-colorBlack'>
				<Link href={"/01-basics"}>01. Basics</Link>
				<Link href={"/02-model"}>02. Model</Link>
				<Link href={"/03-leva-controls"}>03. Leva Controls</Link>
				<Link href={"/04-events-light-shadow"}>
					04. Events / Light / Shadow
				</Link>
				<Link href={"/05-sparkles"}>05. Sparkles</Link>
				<Link href={"/06-camera"}>06. Camera</Link>
				<Link href={"/07-scroll-control"}>07. Scroll Control</Link>
				<Link href={"/08-transform-control"}>08. Transform Control</Link>
				<Link href={"/09-pivot-control"}>09. Pivot Control</Link>
				<Link href={"/10-text"}>10. Text</Link>
				<Link href={"/11-html"}>11. Html</Link>
				<Link href={"/12-shaders"}>12. Shaders</Link>
				<Link href={"/13-lerp"}>13. Lerp</Link>
				<Link href={"/14-ascii"}>14. Ascii</Link>
			</div>
			<div className='absolute bottom-8 right-8 bg-colorBlack'>
				December 2023
			</div>
		</div>
	)
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body
				className={`${font.className} font-light text-colorGreen bg-colorBlack`}
			>
				{children}
				<Overlay />
			</body>
		</html>
	)
}
