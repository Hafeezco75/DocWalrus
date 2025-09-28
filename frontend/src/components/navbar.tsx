'use client'
import { useState } from 'react'
import {
	ConnectModal,
	useCurrentAccount,
	useDisconnectWallet,
} from '@mysten/dapp-kit'

interface NavigationLink {
	href: string
	label: string
}

const NavBar = () => {
	const currentAccount = useCurrentAccount()
	const { mutate: disconnect } = useDisconnectWallet()
	const [open, setOpen] = useState<boolean>(false)

	const navLinks: NavigationLink[] = [
		{ href: '/docs', label: 'Documentation' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/pricing', label: 'Pricing' },
		{ href: '/explore', label: 'Explore' },
	]

	return (
		<header className="fixed top-0 left-1/2 -translate-x-1/2 w-7xl z-40">
			<div className="px-4 pt-5">
				<div className="glass-nav rounded-2xl px-4 py-3 flex items-center justify-between">
					<a href="/">
						<div className="flex items-center space-x-3">
							<div className="h-8 w-8 rounded-lg bg-cyan-400/20 border border-cyan-300/40 shadow-[0_0_18px_rgba(0,255,255,0.35)]" />
							<span className="font-semibold tracking-wide">Docwalrus</span>
						</div>
					</a>
					<nav className="hidden md:flex items-center space-x-8 text-sm">
						{navLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="text-faint hover:text-white transition-colors hover:-translate-y-0.5 inline-block"
							>
								{link.label}
							</a>
						))}
					</nav>
					<div className="flex items-center space-x-3">
						{currentAccount ? (
							<button
								onClick={() => {
									disconnect()
								}}
								className="btn-secondary-glass rounded-xl px-4 py-2 text-sm"
							>
								<p className="text-white text-sm flex justify-between items-center">
									{currentAccount.address.slice(0, 6)}...
									{currentAccount.address.slice(-4)}
								</p>
							</button>
						) : (
							<ConnectModal
								trigger={
									<button
										disabled={!!currentAccount}
										className="btn-secondary-glass rounded-xl px-4 py-2 text-sm"
										>
										Get Started
									</button>
								}
								open={open}
								onOpenChange={(isOpen) => setOpen(isOpen)}
							/>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export default NavBar