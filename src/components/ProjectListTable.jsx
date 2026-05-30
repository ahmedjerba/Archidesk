import { useMemo, useState } from 'preact/hooks';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

const parseFrenchDate = (value) => {
  if (!value) {
    return 0;
  }

  const [day, month, year] = value.split('/').map(Number);
  if (!day || !month || !year) {
    return 0;
  }

  return new Date(year, month - 1, day).getTime();
};

const getStatusBadgeClass = (status) => {
  if (status === 'Terminé') {
    return 'bg-success-subtle text-success';
  }

  if (status === 'En cours') {
    return 'bg-primary-subtle text-primary';
  }

  return 'bg-warning-subtle text-warning';
};

const isDirectoryEntry = (project) => {
  if (project.type) {
    return project.type === 'DIRECTORY';
  }

  return !project.name.includes('.');
};

export function ProjectListTable({ projects, onOpenProject, onBrowseProject }) {
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Nom du Projet',
      cell: ({ row }) => (
        <span className="ps-4 fw-semibold text-dark">
          <span className="me-2 text-warning">{isDirectoryEntry(row.original) ? '📁' : '📄'}</span>
          {row.original.name}
        </span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'client',
      header: 'Client',
      enableSorting: false,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      sortingFn: (rowA, rowB) => parseFrenchDate(rowA.original.date) - parseFrenchDate(rowB.original.date),
      enableSorting: true,
    },
    {
      accessorKey: 'status',
      header: 'Statut',
      enableSorting: false,
      cell: ({ row }) => (
        <span className={`badge px-2.5 py-1.5 rounded-pill ${getStatusBadgeClass(row.original.status)}`}>
          {row.original.status}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="btn-group gap-1">
          <button className="btn btn-sm btn-outline-secondary" onClick={() => onOpenProject(row.original.path)}>
            📂 Ouvrir
          </button>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => onBrowseProject(row.original)}
            disabled={!isDirectoryEntry(row.original)}
          >
            🔍 Fichiers
          </button>
        </div>
      ),
    },
  ], [onOpenProject, onBrowseProject]);

  const table = useReactTable({
    data: projects,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="table table-hover align-middle mb-0">
      <thead className="table-light">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className={header.column.id === 'actions' ? 'text-end' : ''}>
                {header.isPlaceholder ? null : (
                  header.column.getCanSort() ? (
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none fw-bold text-dark d-inline-flex align-items-center gap-1"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{ asc: '▲', desc: '▼' }[header.column.getIsSorted()] ?? ''}
                    </button>
                  ) : (
                    <span className="fw-bold text-dark">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </span>
                  )
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={cell.column.id === 'actions' ? 'text-end pe-4' : ''}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        {table.getRowModel().rows.length === 0 && (
          <tr>
            <td colSpan={5} className="text-center text-muted py-4">
              Aucun projet ne correspond à la recherche.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
