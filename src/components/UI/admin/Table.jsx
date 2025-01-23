export default function Table({ children }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 table-auto">{children}</table>
    </div>
  );
}

export function TableHead({ children }) {
  return (
    <thead className="bg-gray-50">
      <tr>{children}</tr>
    </thead>
  );
}

export function TableHeader({ children }) {
  return (
    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );
}

export function TableBody({ children }) {
  return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="hover:bg-gray-100">{children}</tr>;
}

export function TableCell({ children }) {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-[200px]">
      {children}
    </td>
  );
}