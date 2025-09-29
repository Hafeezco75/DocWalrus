import { motion } from 'framer-motion'
import BlockchainBackground from './blockchainbg'
const HeroSection = () => {
	return (
		<section className="relative h-screen flex items-center pt-8">
			<div className="absolute inset-0">
				<BlockchainBackground />
			</div>

			<div className="mx-auto max-w-7xl px-4 pt-20 pb-24 flex justify-center">
				<div className="max-w-3xl text-center">
					<motion.h1
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7 }}
						className="text-4xl md:text-6xl font-extrabold leading-tight"
					>
						Build Documentation That Lives Forever On-Chain
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.15 }}
						className="mt-5 text-lg md:text-xl text-faint"
					>
						Docwalrus lets you host, secure, and scale your docs on
						decentralized Walrus storage.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.25 }}
						className="mt-8 flex flex-wrap gap-4 justify-center"
					>
						<a
							href="/get-started"
							className="btn-primary-glow rounded-xl px-6 py-3 text-sm font-semibold"
						>
							Get Started
						</a>
						<a
							href="/docs"
							className="btn-secondary-glass rounded-xl px-6 py-3 text-sm font-semibold"
						>
							Explore Docs
						</a>
					</motion.div>

					<div className="mt-10 w-full max-w-2xl glass rounded-2xl p-4 mx-auto">
						<div className="text-xs text-faint">
							Fully transparent, permanent, and verifiable documentation —
							powered by Sui + Walrus.
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
