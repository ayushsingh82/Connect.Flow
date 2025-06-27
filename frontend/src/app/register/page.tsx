"use client";

import React, { useState } from 'react';
import Link from 'next/link';

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
  specialties: string[];
  bio: string;
  tags: string[];
}

const RegisterYourself = () => {
  const [selectedNounId, setSelectedNounId] = useState<number | null>(null);
  const [showNounSelector, setShowNounSelector] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    tagline: '',
    twitter: '',
    specialties: [],
    bio: '',
    tags: []
  });

  const [newTag, setNewTag] = useState('');
  
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
  
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    // Then redirect after successful submission
    alert('Registration successful!');
    // Use Next.js router or window.location for navigation
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-black text-white">


      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          Register as a Creator
        </h1>

        <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl p-8">
          <form className="space-y-6">
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
                Your Name
              </label>
              <input
                type="text"
                className="w-full bg-black/40 border border-green-500/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-green-500/70 focus:ring-1 focus:ring-green-500/50"
                placeholder="Enter your name"
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
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
            >
              Register as Creator
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterYourself;