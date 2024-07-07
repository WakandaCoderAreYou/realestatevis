import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const regions = [
  {
    name: 'City of Toronto',
    may: { avgPrice: 1193202, sales: 2701, newListings: 7360, activeListings: 9029, avgSPLP: 103, avgLDOM: 19 },
    june: { avgPrice: 1173781, sales: 2236, newListings: 6820, activeListings: 9623, avgSPLP: 101, avgLDOM: 20 },
    cities: [
      { name: 'Toronto West', may: { avgPrice: 1089796, sales: 742 }, june: { avgPrice: 1125463, sales: 605 } },
      { name: 'Toronto Central', may: { avgPrice: 1293206, sales: 1305 }, june: { avgPrice: 1235125, sales: 1073 } },
      { name: 'Toronto East', may: { avgPrice: 1110972, sales: 654 }, june: { avgPrice: 1108210, sales: 558 } },
    ],
  },
  {
    name: 'York Region',
    may: { avgPrice: 1340032, sales: 1198, newListings: 3177, activeListings: 3925, avgSPLP: 101, avgLDOM: 19 },
    june: { avgPrice: 1385139, sales: 1082, newListings: 3160, activeListings: 4253, avgSPLP: 101, avgLDOM: 22 },
    cities: [
      { name: 'Aurora', may: { avgPrice: 1443822, sales: 73 }, june: { avgPrice: 1403913, sales: 83 } },
      { name: 'East Gwillimbury', may: { avgPrice: 1290349, sales: 53 }, june: { avgPrice: 1286026, sales: 49 } },
      { name: 'Georgina', may: { avgPrice: 980293, sales: 80 }, june: { avgPrice: 860259, sales: 58 } },
      { name: 'King', may: { avgPrice: 2179952, sales: 21 }, june: { avgPrice: 2493888, sales: 27 } },
      { name: 'Markham', may: { avgPrice: 1292683, sales: 283 }, june: { avgPrice: 1348035, sales: 260 } },
      { name: 'Newmarket', may: { avgPrice: 1173306, sales: 93 }, june: { avgPrice: 1228146, sales: 80 } },
      { name: 'Richmond Hill', may: { avgPrice: 1507973, sales: 203 }, june: { avgPrice: 1470046, sales: 161 } },
      { name: 'Vaughan', may: { avgPrice: 1334545, sales: 339 }, june: { avgPrice: 1400963, sales: 310 } },
      { name: 'Whitchurch-Stouffville', may: { avgPrice: 1394189, sales: 53 }, june: { avgPrice: 1522842, sales: 54 } },
    ],
  },
  {
    name: 'Peel Region',
    may: { avgPrice: 1071480, sales: 1197, newListings: 3341, activeListings: 3820, avgSPLP: 100, avgLDOM: 19 },
    june: { avgPrice: 1077628, sales: 1120, newListings: 3275, activeListings: 4159, avgSPLP: 99, avgLDOM: 21 },
    cities: [
      { name: 'Brampton', may: { avgPrice: 1002608, sales: 484 }, june: { avgPrice: 1009802, sales: 489 } },
      { name: 'Caledon', may: { avgPrice: 1298078, sales: 78 }, june: { avgPrice: 1315105, sales: 79 } },
      { name: 'Mississauga', may: { avgPrice: 1096142, sales: 635 }, june: { avgPrice: 1103727, sales: 552 } },
    ],
  },
  {
    name: 'Durham Region',
    may: { avgPrice: 954942, sales: 907, newListings: 2082, activeListings: 1886, avgSPLP: 104, avgLDOM: 14 },
    june: { avgPrice: 956428, sales: 877, newListings: 2232, activeListings: 2182, avgSPLP: 103, avgLDOM: 15 },
    cities: [
      { name: 'Ajax', may: { avgPrice: 1002821, sales: 132 }, june: { avgPrice: 982871, sales: 118 } },
      { name: 'Brock', may: { avgPrice: 757333, sales: 12 }, june: { avgPrice: 764727, sales: 11 } },
      { name: 'Clarington', may: { avgPrice: 913086, sales: 153 }, june: { avgPrice: 896491, sales: 157 } },
      { name: 'Oshawa', may: { avgPrice: 813004, sales: 240 }, june: { avgPrice: 822846, sales: 225 } },
      { name: 'Pickering', may: { avgPrice: 1019367, sales: 125 }, june: { avgPrice: 991677, sales: 123 } },
      { name: 'Scugog', may: { avgPrice: 1044101, sales: 25 }, june: { avgPrice: 1158254, sales: 39 } },
      { name: 'Uxbridge', may: { avgPrice: 1398709, sales: 22 }, june: { avgPrice: 1304895, sales: 20 } },
      { name: 'Whitby', may: { avgPrice: 1038152, sales: 198 }, june: { avgPrice: 1061199, sales: 184 } },
    ],
  },
  {
    name: 'Halton Region',
    may: { avgPrice: 1271115, sales: 765, newListings: 1865, activeListings: 2060, avgSPLP: 99, avgLDOM: 19 },
    june: { avgPrice: 1252642, sales: 659, newListings: 1765, activeListings: 2284, avgSPLP: 98, avgLDOM: 20 },
    cities: [
      { name: 'Burlington', may: { avgPrice: 1158109, sales: 250 }, june: { avgPrice: 1164925, sales: 203 } },
      { name: 'Halton Hills', may: { avgPrice: 1068644, sales: 73 }, june: { avgPrice: 1140762, sales: 71 } },
      { name: 'Milton', may: { avgPrice: 1046179, sales: 181 }, june: { avgPrice: 1095665, sales: 162 } },
      { name: 'Oakville', may: { avgPrice: 1591978, sales: 261 }, june: { avgPrice: 1482150, sales: 223 } },
    ],
  },
];

const metrics = [
  { key: 'avgPrice', name: 'Average Price', format: (val) => `$${val.toLocaleString()}`, explanation: 'Reflects overall market value and affordability trends.' },
  { key: 'sales', name: 'Sales', format: (val) => val, explanation: 'Indicates market activity and demand levels.' },
  { key: 'newListings', name: 'New Listings', format: (val) => val, explanation: 'Shows fresh inventory entering the market.' },
  { key: 'activeListings', name: 'Active Listings', format: (val) => val, explanation: 'Represents total available inventory and market supply.' },
  { key: 'avgSPLP', name: 'Avg. SP/LP', format: (val) => `${val}%`, explanation: 'Measures how close properties sell to their list price.' },
  { key: 'avgLDOM', name: 'Avg. LDOM', format: (val) => `${val} days`, explanation: 'Indicates how quickly properties are selling.' },
];

const ChangeIndicator = ({ value }) => {
  let className = "inline-block w-0 h-0 ml-2 border-solid border-8 ";
  if (value > 0) {
    className += "border-b-0 border-l-transparent border-r-transparent border-t-green-500";
  } else if (value < 0) {
    className += "border-t-0 border-l-transparent border-r-transparent border-b-red-500";
  } else {
    className += "border-l-0 border-t-transparent border-b-transparent border-r-gray-500";
  }
  return <span className={className}></span>;
};

const RegionComparison = ({ region }) => {
  const data = metrics.map(metric => ({
    name: metric.name,
    May: region.may[metric.key],
    June: region.june[metric.key],
  }));

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-4 text-indigo-700">{region.name} Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="May" fill="#8884d8" />
          <Bar dataKey="June" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map(metric => {
          const mayValue = region.may[metric.key];
          const juneValue = region.june[metric.key];
          const change = ((juneValue - mayValue) / mayValue * 100).toFixed(2);
          return (
            <div key={metric.key} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
              <h4 className="font-bold text-lg text-indigo-600 mb-2">{metric.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{metric.explanation}</p>
              <p className="font-semibold">May: {metric.format(mayValue)}</p>
              <p className="font-semibold">June: {metric.format(juneValue)}</p>
              <p className="mt-2">
                Change: <span className={change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-gray-500'}>
                  {change}%
                </span>
                <ChangeIndicator value={change} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CityComparison = ({ cities }) => {
  const data = cities.map(city => ({
    name: city.name,
    'May Avg Price': city.may.avgPrice,
    'June Avg Price': city.june.avgPrice,
    'May Sales': city.may.sales,
    'June Sales': city.june.sales,
  }));

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-4 text-indigo-700">City Comparison</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={80} />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="May Avg Price" fill="#8884d8" />
          <Bar yAxisId="left" dataKey="June Avg Price" fill="#82ca9d" />
          <Bar yAxisId="right" dataKey="May Sales" fill="#ffc658" />
          <Bar yAxisId="right" dataKey="June Sales" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const GTARealEstateComparison = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">GTA Real Estate Comparison (May vs June 2024)</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {regions.map(region => (
          <button
            key={region.name}
            onClick={() => setSelectedRegion(region)}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${
              selectedRegion === region
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-indigo-600 hover:bg-indigo-100'
            }`}
          >
            {region.name}
          </button>
        ))}
      </div>
      {selectedRegion && (
        <>
          <RegionComparison region={selectedRegion} />
          <CityComparison cities={selectedRegion.cities} />
        </>
      )}
    </div>
  );
};

export default GTARealEstateComparison;

