import React, { useState } from 'react';
import axios from 'axios';

const PINATA_API_KEY = 'YOUR_PINATA_API_KEY';
const PINATA_SECRET_API_KEY = 'YOUR_PINATA_SECRET_API_KEY';

interface Metadata {
  name: string;
  description: string;
  tags: string[];
  timestamp: string;
}

async function uploadJSONToIPFS(data: Metadata): Promise<string | undefined> {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });

    console.log('✅ Uploaded to IPFS via Pinata');
    console.log('CID:', response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error: any) {
    console.error('❌ Failed to upload to IPFS:', error.response?.data || error.message);
    return undefined;
  }
}

const TimeCapsuleForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cid, setCid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim()) {
      setError('Please fill in both name and description');
      return;
    }

    setIsLoading(true);
    setError(null);

    const metadata: Metadata = {
      name: name.trim(),
      description: description.trim(),
      tags: ['time', 'capsule', 'future', 'decentralized'],
      timestamp: new Date().toISOString(),
    };

    try {
      const uploadedCid = await uploadJSONToIPFS(metadata);
      if (uploadedCid) {
        setCid(uploadedCid);
        // Reset form
        setName('');
        setDescription('');
      } else {
        setError('Failed to upload to IPFS');
      }
    } catch (err) {
      setError('An error occurred while uploading');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Time Capsule</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter time capsule name"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your message or description"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Uploading...' : 'Create Time Capsule'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {cid && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
          <p className="font-medium">✅ Successfully uploaded to IPFS!</p>
          <p className="text-sm mt-1">CID: {cid}</p>
          <p className="text-sm mt-1">
            View on IPFS: <a href={`https://gateway.pinata.cloud/ipfs/${cid}`} target="_blank" rel="noopener noreferrer" className="underline">Click here</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeCapsuleForm; 