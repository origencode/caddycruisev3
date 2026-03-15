export type ImageKitLoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

// Builds an ImageKit URL with responsive width & quality and automatic format
export default function imageKitLoader({ src, width, quality }: ImageKitLoaderParams) {
  const q = typeof quality === 'number' ? quality : 75;
  const hasQuery = src.includes('?');
  const sep = hasQuery ? '&' : '?';
  // Use ImageKit transformations: width, quality, automatic format
  return `${src}${sep}tr=w-${width},q-${q},f-auto`;
}
