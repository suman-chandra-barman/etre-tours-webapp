import { StationSyncStatus } from "@/app/(main)/direct-sales/page";

export function getSyncStatusDisplay(syncStatus: StationSyncStatus) {
  if (!syncStatus.isOnline) {
    return (
      <span className="flex items-center gap-2 text-red-600 font-semibold">
        <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
        OFFLINE
      </span>
    );
  }

  if (syncStatus.lastSyncMinutes !== undefined) {
    return (
      <span className="flex items-center gap-2 text-yellow-600 font-semibold">
        <span className="w-3 h-3 bg-yellow-600 rounded-full"></span>
        Last sync: {syncStatus.lastSyncMinutes} min ago
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2 text-green-600 font-semibold">
      <span className="w-3 h-3 bg-green-600 rounded-full"></span>
      Online
    </span>
  );
}
