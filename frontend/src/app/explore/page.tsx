"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { publicClient } from '@/utils/config'
import { CONTRACT_ADDRESSES } from '@/utils/address'
import ConnectFunFactoryAbi from '@/contracts/TimeFactory.sol/ConnectFunFactory.json'
import ConnectTokenAbi from '@/contracts/Time.sol/ConnectToken.json'
import { useAccount } from 'wagmi'

interface Creator {
  id: number
  name: string
  title: string
  tokenSymbol: string
  tokenId: string
  flowRate: string
  bio: string
  image: string
  twitter: string
  tags: string[]
  address: string
  tokenAddress: string
}

const Explore = () => {
  const { address } = useAccount()
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCreators()
  }, [])

  const fetchCreators = async () => {
    try {
      setLoading(true)
      setError('')

      // For now, we'll use the connected wallet address if available
      // In a real implementation, you'd want to track all registered creators
      // This could be done by listening to CreatorRegistered events or maintaining a list
      const knownCreatorAddresses = address ? [address] : []
      
      // Debug: Log the connected address
      console.log('Connected wallet address:', address)
      console.log('Known creator addresses:', knownCreatorAddresses)

      const creatorsData: Creator[] = []

      for (let i = 0; i < knownCreatorAddresses.length; i++) {
        const creatorAddress = knownCreatorAddresses[i]
        
        try {
          // Get creator info from factory contract
          const creatorInfo = await publicClient.readContract({
            address: CONTRACT_ADDRESSES.mainContract as `0x${string}`,
            abi: ConnectFunFactoryAbi.abi,
            functionName: 'getCreator',
            args: [creatorAddress as `0x${string}`]
          }) as {
            bondingContract: string
            token: string
            registered: boolean
          }

          if (creatorInfo.registered) {
            // Get token name and symbol
            const tokenName = await publicClient.readContract({
              address: creatorInfo.token as `0x${string}`,
              abi: ConnectTokenAbi.abi,
              functionName: 'name'
            }) as string

            const tokenSymbol = await publicClient.readContract({
              address: creatorInfo.token as `0x${string}`,
              abi: ConnectTokenAbi.abi,
              functionName: 'symbol'
            }) as string

            // Get UI data from localStorage (stored during registration)
            const uiData = localStorage.getItem(`creator_${creatorAddress}`)
            const parsedUIData = uiData ? JSON.parse(uiData) : {}
            
            // Debug: Log what's in localStorage
            console.log(`Creator ${creatorAddress} localStorage data:`, parsedUIData)

            // Check if user has registered (has localStorage data)
            const hasRegistered = Object.keys(parsedUIData).length > 0

            creatorsData.push({
              id: i + 1,
              name: hasRegistered ? (parsedUIData.name as string) : tokenName || 'Unknown Creator',
              title: hasRegistered ? (parsedUIData.specialties?.join(', ') || 'Creator') : 'Creator',
              tokenSymbol: tokenSymbol || 'TOKEN',
              tokenId: (i + 1).toString(),
              flowRate: "90 FLOW/min", // This would come from bonding contract
              bio: hasRegistered ? (parsedUIData.bio as string) : 'Please register to add your bio',
              image: hasRegistered && parsedUIData.nounId 
                ? `https://noun.pics/${parsedUIData.nounId}.png`
                : `https://api.dicebear.com/7.x/avataaars/svg?seed=${tokenName || 'Creator'}&backgroundColor=00ff00&mouth=smile&style=circle`,
              twitter: hasRegistered ? (parsedUIData.twitter as string) : '@creator',
              tags: hasRegistered ? (parsedUIData.tags as string[]) : ['Creator'],
              address: creatorAddress,
              tokenAddress: creatorInfo.token
            })
          }
        } catch (err) {
          console.error(`Error fetching creator ${creatorAddress}:`, err)
        }
      }

      setCreators(creatorsData)
    } catch (err) {
      console.error('Error fetching creators:', err)
      setError('Failed to load creators. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading creators...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={fetchCreators}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (creators.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4">
              Explore Creators
            </h1>
            <p className="text-gray-400 text-lg">
              Discover amazing creators and get connected to them, buy time with FLOW tokens
            </p>
          </div>

          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No creators found</p>
            <p className="text-gray-500 mb-6">
              {address 
                ? "Connect your wallet and register as a creator to get started!"
                : "Connect your wallet to see registered creators or register as a creator!"
              }
            </p>
            <div className="space-x-4">
              <Link href="/register">
                <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                  Register as Creator
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4">
            Explore Creators
          </h1>
          <p className="text-gray-400 text-lg">
            Discover amazing creators and get connected to them, buy time with FLOW tokens
          </p>
        </div>

        {/* Debug Section - Remove in production */}
        {address && (
          <div className="mb-8 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Debug Info</h3>
            <p className="text-sm text-gray-300 mb-2">Connected Address: {address}</p>
            <p className="text-sm text-gray-300 mb-2">LocalStorage Key: creator_{address}</p>
            <p className="text-sm text-gray-300">LocalStorage Data: {localStorage.getItem(`creator_${address}`) || 'No data found'}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <CreatorBox key={creator.id} creator={creator} />
          ))}
        </div>
      </div>
    </div>
  )
}

const CreatorBox = ({ creator }: { creator: Creator }) => {
  return (
    <div className="bg-black rounded-xl p-6 border border-gray-800 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
      {/* Creator Image and Token Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500">
          <img 
            src={creator.image} 
            alt={creator.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.name}&backgroundColor=00ff00&mouth=smile&style=circle`
            }}
          />
        </div>
        <div>
          <div className="text-xl font-bold text-white">
            {creator.name} | ${creator.tokenSymbol}
          </div>
          <div className="text-green-400 text-sm">{creator.twitter}</div>
        </div>
      </div>

      {/* Creator Title */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-green-400">{creator.title}</h3>
      </div>

      {/* Flow Rate */}
      <div className="mb-4">
        <div className="text-2xl font-bold text-green-400">{creator.flowRate}</div>
      </div>

      {/* Bio */}
      <div className="mb-4">
        <p className="text-gray-300 text-sm leading-relaxed">{creator.bio}</p>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {creator.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      {creator.bio === 'Please register to add your bio' ? (
        <Link href="/register">
          <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm">
            Complete Registration
          </button>
        </Link>
      ) : (
        <Link href={`/buy?name=${encodeURIComponent(creator.name)}&twitter=${encodeURIComponent(creator.twitter)}&title=${encodeURIComponent(creator.title)}&bio=${encodeURIComponent(creator.bio)}&tokenSymbol=${encodeURIComponent(creator.tokenSymbol)}&flowRate=${encodeURIComponent(creator.flowRate)}&id=${creator.id}&tags=${encodeURIComponent(creator.tags.join(','))}`}>
          <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm">
            Buy Time
          </button>
        </Link>
      )}
    </div>
  )
}

export default Explore