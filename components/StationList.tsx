
import React from 'react';
import { ChargingStation, StationStatus } from '../types';

const MOCK_STATIONS: ChargingStation[] = [
  { id: 'ST-001', name: 'Koregaon Park Plaza', location: 'North Main Road, Pune', status: StationStatus.CHARGING, powerOutput: 150, connectorType: 'CCS', lastMaintained: '2024-03-10', currentOccupant: 'Tata Nexon EV' },
  { id: 'ST-002', name: 'Hinjewadi IT Hub', location: 'Phase 1, Hinjewadi, Pune', status: StationStatus.AVAILABLE, powerOutput: 50, connectorType: 'CHAdeMO', lastMaintained: '2024-04-01' },
  { id: 'ST-003', name: 'Baner Tech Center', location: 'Baner-Pashan Link Rd, Pune', status: StationStatus.MAINTENANCE, powerOutput: 350, connectorType: 'CCS', lastMaintained: '2024-05-15' },
  { id: 'ST-004', name: 'Viman Nagar Express', location: 'Phoenix Marketcity Area, Pune', status: StationStatus.CHARGING, powerOutput: 150, connectorType: 'CCS', lastMaintained: '2024-02-28', currentOccupant: 'MG ZS EV' },
  { id: 'ST-005', name: 'Kothrud Public Lot', location: 'Paud Road, Kothrud, Pune', status: StationStatus.AVAILABLE, powerOutput: 22, connectorType: 'Type 2', lastMaintained: '2024-01-20' },
];

const StationList: React.FC = () => {
  const getStatusBadge = (status: StationStatus) => {
    switch (status) {
      case StationStatus.AVAILABLE:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Available</span>;
      case StationStatus.CHARGING:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Charging</span>;
      case StationStatus.MAINTENANCE:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Maintenance</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">Offline</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">Pune Network: Active Stations</h3>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
          + Register New Pune Station
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Station Info</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Output</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Current User</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_STATIONS.map((station) => (
              <tr key={station.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{station.name}</p>
                    <p className="text-xs text-slate-500">{station.location}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(station.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-700">{station.powerOutput} kW</span>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{station.connectorType}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">{station.currentOccupant || '-'}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-emerald-600 hover:text-emerald-800 text-sm font-semibold">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StationList;
