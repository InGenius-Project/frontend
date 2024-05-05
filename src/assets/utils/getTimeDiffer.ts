export default function getTimeDiffer(time: string): string {
  const timeFormat = time.endsWith('Z') ? new Date(time) : new Date(time + 'Z');
  const now = new Date();
  const diff = Math.floor((now.getTime() - timeFormat.getTime()) / 1000 / 60); // difference in minutes

  if (diff < 1) {
    return '1分鐘前';
  } else if (diff < 60) {
    return `${diff}分鐘前`;
  } else if (diff < 1440) {
    const hours = Math.floor(diff / 60);
    return `${hours}小時前`;
  } else {
    const year = timeFormat.getFullYear();
    const month = timeFormat.getMonth() + 1;
    const day = timeFormat.getDate();
    return `${year}/${month}/${day}`;
  }
}
