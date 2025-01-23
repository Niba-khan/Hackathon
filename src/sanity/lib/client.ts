import { createClient } from 'next-sanity'

export const client = createClient({
  projectId:"h6zorl2h",
  dataset: "production",
  apiVersion:"2023-01-01",
  useCdn: true,
  token:"skaTQl0tBFpo4g2TLPRE6BzP05kJWxmDZA0pqZVuRZ6M77ArGkIVcqY63MHNXHjDOYwVIozif6KyiVwrTEKvsy18a4vsqfwsvem2Y84ho0UEMMe2rbuLhqx6ih3At0yuVJKgjHeoep9NHp5BC5hRk11Ya9sCzrjPVFTEugeau07WmTd6NuFi" // Set to false if statically generating pages, using ISR or tag-based revalidation
})
