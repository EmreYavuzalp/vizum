export class formatHelpers {
  static formatDuration(isoDateString: string): string {
    const now = new Date();
    const date = new Date(isoDateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const days = Math.floor(diffInSeconds / (3600 * 24));

    if (days > 7) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2.$1.$3');
    } else {
      const minutes = Math.floor(diffInSeconds / 60);
      const hours = Math.floor(minutes / 60);

      if (days > 0) return `${days}d`;
      if (hours > 0) return `${hours}h`;
      if (minutes > 0) return `${minutes}m`;
      return `${diffInSeconds}s`;
    }
  }
}
