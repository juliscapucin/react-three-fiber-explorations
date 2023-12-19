"use client"

// import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
// 	title: "Create Next App",
// 	description: "Generated by create next app",
// }

function Overlay() {
	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				pointerEvents: "none",
				width: "100%",
				height: "100%",
			}}
		>
			<a
				href='https://pmnd.rs/'
				style={{ position: "absolute", bottom: 40, left: 90, fontSize: "13px" }}
			>
				pmnd.rs
				<br />
				dev collective
			</a>
			<div
				style={{ position: "absolute", top: 40, left: 40, fontSize: "13px" }}
			>
				bad —
			</div>
			<div
				style={{
					position: "absolute",
					bottom: 40,
					right: 40,
					fontSize: "13px",
				}}
			>
				10/17/2021
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
			<body className={inter.className}>
				{children} <Overlay />
			</body>
		</html>
	)
}
