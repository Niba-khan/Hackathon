import { createClient } from 'next-sanity'
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export default sanity;