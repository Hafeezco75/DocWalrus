import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';

const suiClient = new SuiClient({
    url: getFullnodeUrl('testnet')
});

export async function register_chain(blobId: string, site_metadata: string, signer: any) {
    const tx = new Transaction();

    tx.moveCall({
        target: 0xf7167b7f38d17b3e6b85b5627db4b069f23d12fbdedc76648258fa969391fdd::doc_walrus::register_chain,
        arguments: [
            tx.pure(blobId),
            tx.pure(site_metadata),
        ]
    });

    const result = await signer

}    