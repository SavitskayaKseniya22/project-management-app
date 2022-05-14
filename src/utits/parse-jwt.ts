/**
 * Deprecated. Use jwt-decode lib instead. This function will be removed in the next minor version.
 * @param token
 * @returns
 */
function parseJwt<T>(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    Buffer.from(base64, 'base64')
      .toString('utf8')
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload) as T;
}

export default parseJwt;
