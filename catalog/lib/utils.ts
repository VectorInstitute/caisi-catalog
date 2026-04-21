export function getBasePath(): string {
  const isProduction = process.env.NEXT_PUBLIC_BASE_PATH === 'true';
  return isProduction ? '/caisi-catalog' : '';
}

export function getAssetPath(path: string): string {
  const basePath = getBasePath();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}
