import axios from 'axios';

const ALL_RESOURCES_ENDPOINT = 'https://api.nasa.gov/EPIC/api/enhanced/all?api_key=DEMO_KEY';
const RESOURCE_ENDPOINT = (dateStr: string) =>
  `https://api.nasa.gov/EPIC/api/enhanced/date/${dateStr}?api_key=DEMO_KEY`;
const IMAGE_ENDPOINT = (dateStr: string, imageName: string) => {
  const dateWithSlashes = dateStr.split('-').join('/');
  return `https://api.nasa.gov/EPIC/archive/enhanced/${dateWithSlashes}/png/${imageName}.png?api_key=DEMO_KEY`;
};

type ValidDatesResponse = { date: string }[];
type ImageMetadata = { image: string; caption: string };

/**
 * Fetches all the valid dates with earth pictures.
 * @returns Promise of array of dates in YYYY-MM-DD format. Array should be sorted from newest to oldest.
 */
export async function fetchAllValidDates(): Promise<string[]> {
  const allRsp = await axios.get<ValidDatesResponse>(ALL_RESOURCES_ENDPOINT);
  const validDates = allRsp.data.map(({ date }) => date);

  return validDates;
}

/**
 * Fetches all the image metadata for a date.
 * @param dateStr The date in YYYY-MM-DD format
 * @returns Promise of array of all image metadata that match that date.
 */
export async function fetchImageMetadatas(dateStr: string): Promise<ImageMetadata[]> {
  const resourceRsp = await axios.get<ImageMetadata[]>(RESOURCE_ENDPOINT(dateStr));

  return resourceRsp.data;
}

/**
 *
 * @param dateStr The date in YYYY-MM-DD format
 * @param imageName The image name, gotten from the image metadata.
 * @returns The formatted image url for an earth picture.
 */
export function getEarthImageUrl(dateStr: string, imageName: string): string {
  return IMAGE_ENDPOINT(dateStr, imageName);
}
