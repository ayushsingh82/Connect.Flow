"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CONTRACT_ADDRESSES } from '@/utils/address';
import { publicClient, walletClient } from '@/utils/config';
import ConnectFunFactoryAbi from '@/contracts/TimeFactory.sol/ConnectFunFactory.json';
import { useAccount } from 'wagmi';

// Placeholder Logo component
const Logo = () => (
  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-white">CF</div>
);

// Placeholder ConnectButton
const ConnectButton = () => (
  <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">Connect Wallet</button>
);

const NOUNS_IMAGE_BASE = "https://noun.pics/";
const NOUNS_RANGE = {
  start: 1290,
  end: 1350
};

interface FormData {
  name: string;
  tagline: string;
  twitter: string;
  tokenSymbol: string;
  specialties: string[];
  bio: string;
  tags: string[];
}

const RegisterYourself = () => {
  const { address } = useAccount();
  const [selectedNounId, setSelectedNounId] = useState<number | null>(null);
  const [showNounSelector, setShowNounSelector] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    tagline: '',
    twitter: '',
    tokenSymbol: '',
    specialties: [],
    bio: '',
    tags: []
  });

  const [newTag, setNewTag] = useState('');
  
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Specialties/expertise options
  const specialtyOptions = [
    { id: 'designer', label: 'Designer' },
    { id: 'defi', label: 'DeFi Expert' },
    { id: 'nft', label: 'NFTs Expert' },
    { id: 'investor', label: 'Investor' },
    { id: 'founder', label: 'Founder' }
  ];
  
  // Generate array of NOUN IDs
  const nounIds = Array.from(
    { length: NOUNS_RANGE.end - NOUNS_RANGE.start + 1 },
    (_, i) => NOUNS_RANGE.start + i
  );
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle adding a new tag
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  // Handle checkbox changes
  const handleSpecialtyChange = (id: string) => {
    const updatedSpecialties = [...formData.specialties];
    
    if (updatedSpecialties.includes(id)) {
      // Remove if already selected
      const index = updatedSpecialties.indexOf(id);
      updatedSpecialties.splice(index, 1);
    } else {
      // Add if not selected
      updatedSpecialties.push(id);
    }
    
    setFormData({
      ...formData,
      specialties: updatedSpecialties
    });
  };
  
  // Form submission with contract call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      setError('Please connect your wallet first');
      return;
    }

    if (!formData.name.trim() || !formData.tokenSymbol.trim()) {
      setError('Name and Token Symbol are required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Registering creator:', { name: formData.name, symbol: formData.tokenSymbol });

      // Call the contract function registerCreator
      const { request } = await publicClient.simulateContract({
        address: CONTRACT_ADDRESSES.mainContract as `0x${string}`,
        abi: ConnectFunFactoryAbi.abi,
        functionName: 'registerCreator',
        args: [formData.name, formData.tokenSymbol],
        account: address
      });

      // Write to the contract
      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      setSuccess('Creator registered successfully! Your token and bonding contract have been deployed.');
      
      // Store UI-only data in localStorage or your preferred storage
      const creatorData = {
        name: formData.name,
        tokenSymbol: formData.tokenSymbol,
        twitter: formData.twitter,
        bio: formData.bio,
        tags: formData.tags,
        nounId: selectedNounId,
        specialties: formData.specialties
      };
      
      localStorage.setItem(`creator_${address}`, JSON.stringify(creatorData));
      
      // Redirect after successful registration
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      
    } catch (err) {
      console.error('Error registering creator:', err);
      setError('Failed to register creator. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          Register as a Creator
        </h1>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p className="text-green-400">{success}</p>
          </div>
        )}

        <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Selector */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-green-400">
                Choose Your Profile Image
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowNounSelector(!showNounSelector)}
                  className="w-32 h-32 rounded-full overflow-hidden border-2 border-green-500/50 hover:border-green-500 transition-colors"
                >
                  {selectedNounId ? (
                    <img
                      src={`${NOUNS_IMAGE_BASE}${selectedNounId}.png`}
                      alt={`Selected NOUN ${selectedNounId}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-green-400">Select Profile</span>
                    </div>
                  )}
                </button>

                {/* NOUNS Image Selector Dropdown */}
                {showNounSelector && (
                  <div className="absolute z-50 mt-2 p-4 bg-black/95 border border-green-500/50 rounded-xl shadow-xl max-h-[500px] overflow-y-auto">
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
                      {nounIds.map((nounId) => (
                        <button
                          key={nounId}
                          type="button"
                          onClick={() => {
                            setSelectedNounId(nounId);
                            setShowNounSelector(false);
                          }}
                          className="w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-green-500 transition-colors"
                        >
                          <img
                            src={`${NOUNS_IMAGE_BASE}${nounId}.png`}
                            alt={`NOUN ${nounId}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-green-400">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/40 border border-green-500/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-green-500/70 focus:ring-1 focus:ring-green-500/50"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Token Symbol Input */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-green-400">
                Token Symbol *
              </label>
              <input
                type="text"
                name="tokenSymbol"
                value={formData.tokenSymbol}
                onChange={handleChange}
                className="w-full bg-black/40 border border-green-500/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-green-500/70 focus:ring-1 focus:ring-green-500/50"
                placeholder="Enter your token symbol (e.g., NOUN, BEAT, ANIM)"
                maxLength={10}
                required
              />
            </div>

            {/* Twitter Username Input */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-green-400">
                Twitter Username
              </label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full bg-black/40 border border-green-500/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-green-500/70 focus:ring-1 focus:ring-green-500/50"
                placeholder="Enter your Twitter username"
              />
            </div>

            {/* Bio Input */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-green-400">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full bg-black/40 border border-green-500/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-green-500/70 focus:ring-1 focus:ring-green-500/50 h-32"
                placeholder="Tell us about yourself"
              />
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-green-400">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full"
                  >
                    <span className="text-green-400">{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-green-400 hover:text-green-300"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 bg-black/40 border border-green-500/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-green-500/70 focus:ring-1 focus:ring-green-500/50"
                  placeholder="Add a new tag"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Registering Creator...' : 'Register as Creator'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterYourself;