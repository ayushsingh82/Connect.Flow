import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { flowTestnet } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: flowTestnet,
  transport: http()
});

export const walletClient = createWalletClient({
  chain: flowTestnet,
  transport: custom(window.ethereum)
}); 