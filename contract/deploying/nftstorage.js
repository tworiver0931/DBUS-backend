
const {NFTStorage} = require('nft.storage')
const fs = require('fs');
const { File } = require('buffer');
// read the API key from an environment variable. You'll need to set this before running the example!
require("dotenv").config();
const API_KEY = process.env.NFT_STORAGE_API_KEY

// For example's sake, we'll fetch an image from an HTTP URL.
// In most cases, you'll want to use files provided by a user instead.
async function getExampleImage() {
  //const imageOriginUrl = "https://user-images.githubusercontent.com/87873179/144324736-3f09a98e-f5aa-4199-a874-13583bf31951.jpg"
  const imageOriginUrl = 'https://ipfs.io/ipfs/QmZjEszvvopgDTEqBVoiMdzu2DXqDiQdWVUQYu1b84Ka9D?filename=511bus.png'
  const r = await fetch(imageOriginUrl)
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
  }
  return r.blob()
}

async function storeExampleNFT() {
  const image = await getExampleImage()
  //const image = new File([fs.readFileSync('./images/511bus.png')], '511bus.png', {type: "image/png"})
  const nft = {
    image, // use image Blob as `image` field
    name: "511Bus Ticket for 2023/Oct.",
    description: "this nft has orthority to get on the bus of 511 in incheon.",
    properties: {
      type: "blog-post",
      origins: {
        http: "https://blog.nft.storage/posts/2021-11-30-hello-world-nft-storage/",
        ipfs: "ipfs://bafybeieh4gpvatp32iqaacs6xqxqitla4drrkyyzq6dshqqsilkk3fqmti/blog/post/2021-11-30-hello-world-nft-storage/"
      },
      authors: [{ name: "David Choi" }],
      content: {
        "text/markdown": "The last year has witnessed the explosion of NFTs onto the world’s mainstage. From fine art to collectibles to music and media, NFTs are quickly demonstrating just how quickly grassroots Web3 communities can grow, and perhaps how much closer we are to mass adoption than we may have previously thought. <... remaining content omitted ...>"
      }
    }
  }

  const client = new NFTStorage({ token: API_KEY })
  const metadata = await client.store(nft)

  console.log('NFT data stored!')
  console.log('Metadata URI: ', metadata.url)
}

storeExampleNFT()