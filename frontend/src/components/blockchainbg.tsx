import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
const BlockchainBackground: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const dpr = Math.max(1, window.devicePixelRatio || 1)
		const resize = () => {
			const parent = canvas.parentElement
			if (!parent) return
			const w = parent.clientWidth
			const h = parent.clientHeight
			canvas.width = Math.floor(w * dpr)
			canvas.height = Math.floor(h * dpr)
			canvas.style.width = `${w}px`
			canvas.style.height = `${h}px`
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
		}

		resize()
		window.addEventListener('resize', resize)

		const nodeCount = 600
		type NodeDatum = d3.SimulationNodeDatum & {
			id: number
			radius: number
			fx?: number
			fy?: number
		}
		type LinkDatum = d3.SimulationLinkDatum<NodeDatum> & {
			source: number | NodeDatum
			target: number | NodeDatum
		}

		const nodes: NodeDatum[] = d3.range(nodeCount).map((i) => ({
			id: i,
			radius: i % 9 === 0 ? 5.5 : Math.random() * 3 + 1.5,
		}))

		const links: LinkDatum[] = d3.range(nodeCount).map(() => ({
			source: Math.floor(Math.random() * nodeCount),
			target: Math.floor(Math.random() * nodeCount),
		}))

		const simulation = d3
			.forceSimulation(nodes)
			.force('charge', d3.forceManyBody().strength(-28))
			.force(
				'link',
				d3.forceLink<NodeDatum, LinkDatum>(links).distance(60).strength(0.5)
			)
			.force(
				'center',
				d3.forceCenter(canvas.width / (2 * dpr), canvas.height / (2 * dpr))
			)
			.force(
				'collision',
				d3.forceCollide<NodeDatum>().radius((d) => d.radius + 2)
			)
			.alpha(0.9)
			.alphaDecay(0.02)

		const cyan = 'rgba(0, 255, 255, 0.7)'
		const orange = 'rgba(244, 162, 97, 0.8)'

		const draw = () => {
			const w = canvas.width / dpr
			const h = canvas.height / dpr
			ctx.clearRect(0, 0, w, h)

			const radial = ctx.createRadialGradient(
				w * 0.5,
				h * 0.35,
				0,
				w * 0.5,
				h * 0.35,
				Math.max(w, h) * 0.8
			)
			radial.addColorStop(0, 'rgba(0, 255, 255, 0.04)')
			radial.addColorStop(1, 'rgba(0, 0, 0, 0)')
			ctx.fillStyle = radial
			ctx.fillRect(0, 0, w, h)

			ctx.lineWidth = 0.6
			ctx.strokeStyle = 'rgba(173, 216, 230, 0.45)'
			links.forEach((l) => {
				const s = l.source as NodeDatum
				const t = l.target as NodeDatum
				ctx.beginPath()
				ctx.moveTo(s.x || 0, s.y || 0)
				ctx.lineTo(t.x || 0, t.y || 0)
				ctx.stroke()
			})

			nodes.forEach((n, idx) => {
				const x = n.x || 0
				const y = n.y || 0
				const isPulse = idx % 9 === 0
				const r =
					n.radius + (isPulse ? Math.sin(Date.now() / 450 + idx) * 0.9 : 0)

				const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 2.2)
				grad.addColorStop(0, cyan)
				grad.addColorStop(1, orange)
				ctx.fillStyle = grad
				ctx.beginPath()
				ctx.arc(x, y, r, 0, Math.PI * 2)
				ctx.fill()
			})
		}

		const ticked = () => {
			draw()
		}

		simulation.on('tick', ticked)

		let raf = 0
		const animate = () => {
			draw()
			raf = requestAnimationFrame(animate)
		}
		raf = requestAnimationFrame(animate)

		return () => {
			window.removeEventListener('resize', resize)
			simulation.stop()
			cancelAnimationFrame(raf)
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			className="absolute inset-0 w-full h-screen"
		/>
	)
}

export default BlockchainBackground
