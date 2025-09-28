import Landing from './page/Landing'
import {
	createNetworkConfig,
	SuiClientProvider,
	WalletProvider,
} from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@mysten/dapp-kit/dist/index.css'

const App = () => {
	const { networkConfig } = createNetworkConfig({
		testnet: { url: getFullnodeUrl('testnet') },
	})
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<SuiClientProvider
				networks={networkConfig}
				defaultNetwork="testnet"
			>
				<WalletProvider>
					<Landing />
				</WalletProvider>
			</SuiClientProvider>
		</QueryClientProvider>
	)
}
export default App
