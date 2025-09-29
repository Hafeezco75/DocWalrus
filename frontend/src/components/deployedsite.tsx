import { motion } from 'framer-motion'
import { useMemo } from 'react'

const DeployedSite = () => {
	// Site data for the grid
	const hostedSites = useMemo(
		() =>
			Array.from({ length: 8 }).map((_, i) => ({
				img: 'https://docs.sui.io/img/sui-logo-footer.svg',
				suiNs: `dev${(i + 1).toString().padStart(2, '0')}.sui`,
				date: '2025-09-23',
				version: `v${1 + (i % 3)}.0.${i % 5}`,
				contributors: 2 + (i % 7),
			})),
		[]
	)

	return (
		<section className="relative py-14">
			<div className="mx-auto max-w-7xl px-4">
				<div className="flex items-end justify-between mb-6">
					<h2 className="text-2xl md:text-3xl font-bold">
						Sites Hosted on Walrus
					</h2>
					<a
						href="/explore"
						className="text-sm text-faint hover:text-white"
					>
						Explore all
					</a>
				</div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
					}}
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6"
				>
					{hostedSites.map((site, i) => (
						<motion.div
							key={i}
							variants={{
								hidden: { opacity: 0, y: 22 },
								visible: { opacity: 1, y: 0 },
							}}
							whileHover={{ y: -6 }}
							className="glass rounded-2xl overflow-hidden hover-glow-cyan-orange transition-all duration-300"
						>
							<div className="relative">
								<img
									src={site.img}
									alt={site.suiNs}
									className="w-full h-24 object-contain"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F]/80 to-transparent" />
							</div>
							<div className="p-4 text-[#0A1A2F]">
								<h3 className="font-semibold text-white">{site.suiNs}</h3>
								<div className="px-4 mt-4 flex items-center justify-between">
									<p className="text-xs opacity-80 text-white">
										Hosted: {site.date}
									</p>
									<p className="text-xs opacity-80 text-white">
										Contributors: {site.contributors}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}

export default DeployedSite
