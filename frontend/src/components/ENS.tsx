import { createPublicClient, http, getAddress, namehash, Address } from 'viem';
import { mainnet } from 'viem/chains';

// ENS Resolver ABI - minimal ABI for ENS resolution
const ENS_RESOLVER_ABI = [
  {
    name: 'addr',
    type: 'function',
    inputs: [{ name: 'node', type: 'bytes32' }],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    name: 'name',
    type: 'function',
    inputs: [{ name: 'node', type: 'bytes32' }],
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
] as const;

// ENS Registry ABI - minimal ABI for ENS registry
const ENS_REGISTRY_ABI = [
  {
    name: 'resolver',
    type: 'function',
    inputs: [{ name: 'node', type: 'bytes32' }],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
] as const;

// Mainnet ENS Registry address
const ENS_REGISTRY_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';

export class ENSResolver {
  private client: ReturnType<typeof createPublicClient>;

  constructor(rpcUrl?: string) {
    this.client = createPublicClient({
      chain: mainnet,
      transport: http(rpcUrl),
    });
  }

  /**
   * Resolve ENS name to address
   * @param ensName - The ENS name to resolve (e.g., "vitalik.eth")
   * @returns The resolved address or null if not found
   */
  async resolveENSName(ensName: string): Promise<string | null> {
    try {
      // Normalize the ENS name
      const normalizedName = ensName.toLowerCase().trim();
      
      // Get the resolver contract for this ENS name
      const node = namehash(normalizedName);
      const resolverAddress = await this.client.readContract({
        address: ENS_REGISTRY_ADDRESS as Address,
        abi: ENS_REGISTRY_ABI,
        functionName: 'resolver',
        args: [node],
      });
      
      if (resolverAddress === '0x0000000000000000000000000000000000000000') {
        console.log(`No resolver found for ${ensName}`);
        return null;
      }

      // Resolve the address
      const address = await this.client.readContract({
        address: resolverAddress as Address,
        abi: ENS_RESOLVER_ABI,
        functionName: 'addr',
        args: [node],
      });
      
      if (address === '0x0000000000000000000000000000000000000000') {
        console.log(`No address found for ${ensName}`);
        return null;
      }

      return address;
    } catch {
      console.error(`Error resolving ENS name ${ensName}`);
      return null;
    }
  }

  /**
   * Lookup ENS name from address (reverse resolution)
   * @param address - The address to lookup
   * @returns The ENS name or null if not found
   */
  async lookupENSName(address: string): Promise<string | null> {
    try {
      // Normalize the address
      const normalizedAddress = getAddress(address);
      
      // Create reverse node
      const reverseNode = namehash(
        `${normalizedAddress.slice(2)}.addr.reverse`
      );

      // Get the resolver for the reverse node
      const resolverAddress = await this.client.readContract({
        address: ENS_REGISTRY_ADDRESS as Address,
        abi: ENS_REGISTRY_ABI,
        functionName: 'resolver',
        args: [reverseNode],
      });
      
      if (resolverAddress === '0x0000000000000000000000000000000000000000') {
        console.log(`No reverse resolver found for ${address}`);
        return null;
      }

      // Get the ENS name
      const ensName = await this.client.readContract({
        address: resolverAddress as Address,
        abi: ENS_RESOLVER_ABI,
        functionName: 'name',
        args: [reverseNode],
      });
      
      if (!ensName || ensName === '') {
        console.log(`No ENS name found for ${address}`);
        return null;
      }

      return ensName;
    } catch {
      console.error(`Error looking up ENS name for ${address}`);
      return null;
    }
  }

  /**
   * Check if an ENS name is valid
   * @param ensName - The ENS name to validate
   * @returns True if valid, false otherwise
   */
  isValidENSName(ensName: string): boolean {
    try {
      // Basic validation - ENS names should end with .eth and contain valid characters
      const ensRegex = /^[a-zA-Z0-9-]+\.eth$/;
      return ensRegex.test(ensName.toLowerCase());
    } catch {
      return false;
    }
  }

  /**
   * Check if an address is valid
   * @param address - The address to validate
   * @returns True if valid, false otherwise
   */
  isValidAddress(address: string): boolean {
    try {
      getAddress(address);
      return true;
    } catch {
      return false;
    }
  }
}

// React hook for ENS resolution
import { useState, useCallback } from 'react';

export const useENS = (rpcUrl?: string) => {
  const [resolver] = useState(() => new ENSResolver(rpcUrl));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolveName = useCallback(async (ensName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!resolver.isValidENSName(ensName)) {
        throw new Error('Invalid ENS name format');
      }
      
      const address = await resolver.resolveENSName(ensName);
      return address;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [resolver]);

  const lookupName = useCallback(async (address: string) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!resolver.isValidAddress(address)) {
        throw new Error('Invalid address format');
      }
      
      const ensName = await resolver.lookupENSName(address);
      return ensName;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [resolver]);

  return {
    resolveName,
    lookupName,
    loading,
    error,
    isValidENSName: resolver.isValidENSName.bind(resolver),
    isValidAddress: resolver.isValidAddress.bind(resolver),
  };
};

// Example usage component
export const ENSLookupComponent: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<'resolve' | 'lookup'>('resolve');
  const { resolveName, lookupName, loading, error, isValidENSName, isValidAddress } = useENS();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'resolve') {
      const address = await resolveName(input);
      setResult(address);
    } else {
      const ensName = await lookupName(input);
      setResult(ensName);
    }
  };

  const isValidInput = mode === 'resolve' ? isValidENSName(input) : isValidAddress(input);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">ENS Lookup</h2>
      
      <div className="mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setMode('resolve')}
            className={`px-4 py-2 rounded-md ${
              mode === 'resolve'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            ENS → Address
          </button>
          <button
            onClick={() => setMode('lookup')}
            className={`px-4 py-2 rounded-md ${
              mode === 'lookup'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Address → ENS
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'resolve' ? 'ENS Name' : 'Address'}
          </label>
          <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={mode === 'resolve' ? 'vitalik.eth' : '0x...'}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !isValidInput}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Looking up...' : 'Lookup'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
          <p className="font-medium">Result:</p>
          <p className="text-sm mt-1 break-all">{result}</p>
        </div>
      )}
    </div>
  );
};

export default ENSResolver;
