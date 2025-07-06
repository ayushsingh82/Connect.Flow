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

// Example metadata to upload
const metadata: Metadata = {
  name: 'Time Capsule #42',
  description: 'A message to my future self stored on IPFS',
  tags: ['time', 'capsule', 'future', 'decentralized'],
  timestamp: new Date().toISOString(),
};

uploadJSONToIPFS(metadata);
