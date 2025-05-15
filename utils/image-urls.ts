// Base URL for all images
const IMAGE_BASE_URL = "https://ik.imagekit.io/ufbtcakpl"

// Function to get full image URL - with safeguards for URL construction
export function getImageUrl(filename: string): string {
  // Make sure we're working with a clean filename (no leading slashes)
  const cleanFilename = filename.replace(/^\/+/, "")

  // Ensure we have a valid base URL that ends with a slash if needed
  const baseUrl = IMAGE_BASE_URL.endsWith("/") ? IMAGE_BASE_URL : `${IMAGE_BASE_URL}/`

  // For SSR safety, use string concatenation instead of URL constructor
  return `${baseUrl}${cleanFilename}`
}

// Common image URLs
export const IMAGES = {
  // Hero images
  heroBackground: getImageUrl("hero-background.jpg"),
  heroBackgroundMobile: getImageUrl("hero-background-mobile.jpg"),

  // Storytelling section
  signatureRingCloseup: getImageUrl("signature-ring-closeup.jpg"),
  jewelryMaterials: getImageUrl("jewelry-materials.jpg"),
  signatureProcess: getImageUrl("signature-process.jpg"),

  // Product gallery
  signatureRingRoseGold: getImageUrl("signature-ring-rose-gold.jpg"),
  signatureNecklaceYellowGold: getImageUrl("signature-necklace-yellow-gold.jpg"),
  signatureBraceletSilver: getImageUrl("signature-bracelet-silver.jpg"),
  signatureRingPlatinum: getImageUrl("signature-ring-platinum.jpg"),
  signatureEarringsWhiteGold: getImageUrl("signature-earrings-white-gold.jpg"),
  signatureNecklaceRoseGold: getImageUrl("signature-necklace-rose-gold.jpg"),
}
