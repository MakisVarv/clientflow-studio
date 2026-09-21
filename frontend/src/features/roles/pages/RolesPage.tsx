import { useState } from 'react';

import {
  DndContext,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core';

import { Plus, ShieldCheck, GripVertical } from 'lucide-react';

const roles = [
  {
    id: 1,
    name: 'Administrator',
  },
  {
    id: 2,
    name: 'Sales Manager',
  },
  {
    id: 3,
    name: 'Sales User',
  },
  {
    id: 4,
    name: 'Viewer',
  },
];

const allPermissions = [
  'users.read',
  'users.create',
  'users.update',
  'companies.read',
  'companies.create',
  'companies.update',
  'contacts.read',
  'leads.read',
  'leads.update',
  'deals.read',
  'deals.update',
  'reports.read',
  'notes.read',
  'tasks.read',
];

type PermissionCardProps = {
  permission: string;
};

function PermissionCard({ permission }: PermissionCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: permission,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
                flex cursor-grab items-center gap-2
                rounded-lg border border-slate-200
                bg-white px-3 py-3
                text-sm text-slate-700
                shadow-sm
                ${isDragging ? 'opacity-50' : ''}
            `}
    >
      <GripVertical size={16} className="text-slate-400" />

      {permission}
    </div>
  );
}

type PermissionZoneProps = {
  id: string;
  title: string;
  permissions: string[];
};

function PermissionZone({
  id,
  title,
  permissions,
}: PermissionZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div className="flex-1">
      <h3 className="mb-3 font-semibold text-slate-700">{title}</h3>

      <div
        ref={setNodeRef}
        className={`
                    min-h-[400px]
                    rounded-xl
                    border-2 border-dashed
                    p-4
                    transition-colors
                    ${
                      isOver
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-300 bg-slate-50'
                    }
                `}
      >
        <div className="flex flex-col gap-3">
          {permissions.map((permission) => (
            <PermissionCard
              key={permission}
              permission={permission}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RolesPage() {
  const [selectedRoleId, setSelectedRoleId] = useState<number>(1);

  const [rolePermissions, setRolePermissions] = useState<
    Record<number, string[]>
  >({
    1: [
      'users.read',
      'users.create',
      'users.update',
      'companies.read',
      'companies.create',
      'companies.update',
      'reports.read',
    ],

    2: [
      'companies.read',
      'contacts.read',
      'leads.read',
      'leads.update',
      'deals.read',
      'deals.update',
      'reports.read',
    ],

    3: [
      'companies.read',
      'contacts.read',
      'leads.read',
      'deals.read',
      'tasks.read',
    ],

    4: ['companies.read', 'contacts.read', 'reports.read'],
  });

  const assignedPermissions = rolePermissions[selectedRoleId] || [];

  const availablePermissions = allPermissions.filter(
    (permission) => !assignedPermissions.includes(permission),
  );

  const selectedRole = roles.find(
    (role) => role.id === selectedRoleId,
  );

  function handleDragEnd(event: DragEndEvent) {
    const permission = event.active.id.toString();

    const target = event.over?.id.toString();

    if (!target) {
      return;
    }

    if (target === 'assigned') {
      if (assignedPermissions.includes(permission)) {
        return;
      }

      setRolePermissions((previous) => ({
        ...previous,

        [selectedRoleId]: [...assignedPermissions, permission],
      }));
    }

    if (target === 'available') {
      setRolePermissions((previous) => ({
        ...previous,

        [selectedRoleId]: assignedPermissions.filter(
          (item) => item !== permission,
        ),
      }));
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Roles</h1>

          <p className="mt-2 text-slate-500">
            Manage roles and assign permissions.
          </p>
        </div>

        <button
          className="
                        flex items-center gap-2
                        rounded-lg
                        bg-blue-600
                        px-4 py-2
                        text-white
                        hover:bg-blue-700
                    "
        >
          <Plus size={18} />
          Add Role
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* ROLES */}

        <div className="col-span-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="mb-4 font-semibold text-slate-800">
              Roles
            </h2>

            <div className="flex flex-col gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`
                                        flex items-center gap-3
                                        rounded-lg
                                        px-4 py-3
                                        text-left
                                        transition-colors

                                        ${
                                          selectedRoleId === role.id
                                            ? 'bg-blue-600 text-white'
                                            : 'text-slate-700 hover:bg-slate-100'
                                        }
                                    `}
                >
                  <ShieldCheck size={18} />

                  {role.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PERMISSIONS */}

        <div className="col-span-9">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-800">
                {selectedRole?.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Drag permissions between the two lists.
              </p>
            </div>

            <DndContext onDragEnd={handleDragEnd}>
              <div className="flex gap-6">
                <PermissionZone
                  id="available"
                  title="Available Permissions"
                  permissions={availablePermissions}
                />

                <PermissionZone
                  id="assigned"
                  title="Assigned Permissions"
                  permissions={assignedPermissions}
                />
              </div>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolesPage;
