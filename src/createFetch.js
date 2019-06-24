/* @flow */
// eslint-disable-next-line flowtype/no-types-missing-file-annotation
type Fetch = (url: string, options: ?any) => Promise<any>;

// eslint-disable-next-line flowtype/no-types-missing-file-annotation
type Options = {
  baseUrl: string,
  cookie?: string,
};

/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
// eslint-disable-next-line flowtype/no-types-missing-file-annotation
function createFetch(fetch: Fetch, { baseUrl, cookie }: Options) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    method: 'POST',
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : null),
    },
  };

  return async (url: string, options: any) =>
    url.startsWith('/api')
      ? fetch(`${baseUrl}${url}`, {
          ...defaults,
          ...options,
          headers: {
            ...defaults.headers,
            ...(options && options.headers),
          },
        })
      : fetch(url, options);
}

export default createFetch;
