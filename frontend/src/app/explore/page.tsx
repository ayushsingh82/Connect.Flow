"use client"

import React from 'react'
import Link from 'next/link'

const Explore = () => {
  const creators = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Digital Artist",
      tokenSymbol: "NOUN",
      tokenId: "1290",
      flowRate: "90 FLOW/min",
      bio: "Pioneering digital artist exploring the intersection of AI and human creativity. Known for generative art pieces that blend traditional techniques with cutting-edge technology.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=00ff00&mouth=smile&style=circle",
      twitter: "@sarahchen",
      tags: ["Digital Art", "AI", "Generative", "NFTs"]
    },
    {
      id: 2,
      name: "Alex Rivera",
      title: "Music Producer",
      tokenSymbol: "BEAT",
      tokenId: "456",
      flowRate: "120 FLOW/min",
      bio: "Electronic music producer creating ambient soundscapes and experimental beats. Pushing boundaries in the digital music space.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=00ff00&mouth=smile&style=circle",
      twitter: "@alexrivera",
      tags: ["Music", "Electronic", "Ambient", "Production"]
    },
    {
      id: 3,
      name: "Maya Patel",
      title: "3D Animator",
      tokenSymbol: "ANIM",
      tokenId: "789",
      flowRate: "75 FLOW/min",
      bio: "Award-winning 3D animator specializing in character design and storytelling through motion graphics and visual effects.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya&backgroundColor=00ff00&mouth=smile&style=circle",
      twitter: "@mayapatel",
      tags: ["3D Animation", "Character Design", "VFX", "Storytelling"]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4">
            Explore Creators
          </h1>
          <p className="text-gray-400 text-lg">
            Discover amazing creators and get connected to then , buy time  with FLOW tokens
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <CreatorBox key={creator.id} creator={creator} />
          ))}
        </div>
      </div>
    </div>
  )
}

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
      <div className="mb-6">
        <p className="text-gray-300 text-sm leading-relaxed">{creator.bio}</p>
      </div>

      {/* Buy Time Button */}
      <Link href={`/buy?name=${encodeURIComponent(creator.name)}&twitter=${encodeURIComponent(creator.twitter)}&title=${encodeURIComponent(creator.title)}&bio=${encodeURIComponent(creator.bio)}&tokenSymbol=${encodeURIComponent(creator.tokenSymbol)}&flowRate=${encodeURIComponent(creator.flowRate)}&id=${creator.id}&tags=${encodeURIComponent(creator.tags.join(','))}`}>
        <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm">
          Buy Time
        </button>
      </Link>
    </div>
  )
}

export default Explore