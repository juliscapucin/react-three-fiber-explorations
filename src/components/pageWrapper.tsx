import { useEffect } from "react"

export default function PageWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	useEffect(() => {
		const canvas = document.querySelector("canvas")

		console.log(canvas)
	}, [])
	return <>{children}</>
}
