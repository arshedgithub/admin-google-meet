export function isValidGoogleMeetLink(url: string): boolean {
  // Google Meet links are typically https://meet.google.com/{3-4 letters}-{4 letters}-{3 letters}
  const regex = /^https:\/\/meet\.google\.com\/[a-zA-Z0-9]{3,4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{3}(\?.*)?$/;
  return regex.test(url);
}

export function sanitizeGoogleMeetLink(url: string): string {
  try {
    const cleanUrl = new URL(url.trim());
    return `${cleanUrl.protocol}//${cleanUrl.host}${cleanUrl.pathname}`;
  } catch {
    return url.trim();
  }
} 