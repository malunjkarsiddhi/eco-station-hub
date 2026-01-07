
export enum StationStatus {
  AVAILABLE = 'AVAILABLE',
  CHARGING = 'CHARGING',
  MAINTENANCE = 'MAINTENANCE',
  OFFLINE = 'OFFLINE'
}

export interface ChargingStation {
  id: string;
  name: string;
  location: string;
  status: StationStatus;
  powerOutput: number; // in kW
  connectorType: string;
  lastMaintained: string;
  currentOccupant?: string;
}

export interface Transaction {
  id: string;
  stationId: string;
  userId: string;
  startTime: string;
  endTime: string;
  energyDelivered: number; // in kWh
  cost: number;
}

export interface SystemStats {
  totalStations: number;
  activeSessions: number;
  totalEnergyDelivered: number;
  revenueToday: number;
}
