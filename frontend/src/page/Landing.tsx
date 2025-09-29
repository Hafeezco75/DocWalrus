import { motion } from 'framer-motion'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import DeployedSite from '../components/deployedsite'
import HeroSection from '../components/herosection'

const Landing = () => {

	// Sui tools data
	const suiTools = [
		{
			img: 'https://cdn.prod.website-files.com/65fdccb65290aeb1c597b611/66006f0d351a0e5dfab1d9e1_logo.svg',
			title: 'DeepBook',
			desc: 'High-throughput DEX on Sui.',
			link: 'https://deepbook.tech',
		},
		{
			img: 'https://cdn.prod.website-files.com/687615731a76518b8c27cf39/6876169e0803aae135cb6931_Group%202147263405.svg',
			title: 'Seal',
			desc: 'Data protection in Walrus.',
			link: 'https://seal.mystenlabs.com/',
		},
		{
			img: 'https://cdn.prod.website-files.com/6864f039b26f4afedada6bc5/6864f039b26f4afedada6c10_logo.svg',
			title: 'Walrus',
			desc: 'Decentralized storage.',
			link: 'https://walrus.xyz',
		},
	]

	return (
		<div className="min-h-screen text-white bg-deep-space overflow-hidden">
			<NavBar />
			{/* Hero Section */}
			<HeroSection />

			<div className="divider-soft mx-4 md:mx-auto md:max-w-7xl" />

			{/* Hosted Sites Showcase */}
			<DeployedSite />

			{/* Sui Tools Showcase */}
			<section className="py-16 bg-[#0A1A2F]/40 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-4 text-center">
					<h2 className="text-2xl md:text-3xl font-bold mb-8">
						Explore Sui Ecosystem Tools
					</h2>
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={{
							hidden: { opacity: 0 },
							visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
						}}
						className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto"
					>
						{suiTools.map((tool, index) => (
							<motion.div
								key={index}
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: { opacity: 1, y: 0 },
								}}
								whileHover={{ y: -6 }}
								className="w-full sm:w-64 glass rounded-lg hover-glow-cyan-orange transition-all duration-300 p-6 text-center"
							>
								<img
									src={tool.img}
									alt={tool.title}
									className="h-24 w-auto mx-auto mb-4 rounded"
								/>
								<h3 className="font-semibold text-cyan-300 text-lg">
									{tool.title}
								</h3>
								<p className="text-sm text-faint mt-2">{tool.desc}</p>
								<a
									href={tool.link}
									target="_blank"
									rel="noopener noreferrer"
									className="btn-secondary-glass rounded-xl px-4 py-2 text-sm mt-4 inline-block"
								>
									Learn More
								</a>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default Landing