/**
 * API Service- fetches content.json with simulated 1000–1500ms network delay
 */

const getDelay = () => Math.random() * 500 + 1000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchContent = async () => {
  const response = await fetch('/data/content.json');
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

/** Returns { navigation, hero } */
export const fetchHeroContent = async () => {
  await delay(getDelay());
  const content = await fetchContent();
  return { navigation: content.navigation, hero: content.hero };
};

/** Returns { featuresSection, carousel } */
export const fetchFeaturesContent = async () => {
  await delay(getDelay());
  const content = await fetchContent();
  return { featuresSection: content.featuresSection, carousel: content.carousel };
};

/** Returns navigation object */
export const fetchNavigation = async () => {
  await delay(getDelay());
  const content = await fetchContent();
  return content.navigation;
};
