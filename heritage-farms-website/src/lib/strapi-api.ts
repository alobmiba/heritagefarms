import qs from 'qs';

interface StrapiApiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiDataItem<T> {
  id: number;
  attributes: T;
}

/**
 * Get the full URL for a Strapi API endpoint.
 * @param path - The path to the resource (e.g., "/api/products").
 * @returns The full URL.
 */
function getStrapiURL(path = "") {
  return `${process.env.STRAPI_API_URL || 'http://localhost:1337'}${path}`;
}

/**
 * Fetches data from the Strapi API.
 * @param path - The path of the API endpoint to fetch (e.g., "/api/products").
 * @param urlParamsObject - Query parameters.
 * @param options - Additional fetch options.
 * @returns The fetched data.
 */
export async function fetchApi<T>(
  path: string,
  urlParamsObject: Record<string, any> = {},
  options: RequestInit = {}
): Promise<StrapiApiResponse<StrapiDataItem<T>[]>> {
  try {
    // Merge default and user options
    const mergedOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(path)}${queryString ? `?${queryString}` : ''}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error(`Error fetching ${requestUrl}: ${response.statusText}`);
      throw new Error('Failed to fetch API');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching the API');
  }
}
