import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';

import { CSS } from '@dnd-kit/utilities';

import { useDraggable } from '@dnd-kit/core';

import { useMemo, useState } from 'react';

import { GripVertical, Handshake } from 'lucide-react';

import toast from 'react-hot-toast';

import type { Deal, DealStage } from '../../deals/types/deal.types';
import useUpdateDeal from '../../deals/hooks/useUpdateDeal';
import useDeals from '../../deals/hooks/useDeals';

const stages: DealStage[] = [
  'NEW',
  'QUALIFICATION',
  'PROPOSAL',
  'NEGOTIATION',
  'CONTRACT',
  'WON',
  'LOST',
];

const stageLabels: Record<DealStage, string> = {
  NEW: 'New',
  QUALIFICATION: 'Qualification',
  PROPOSAL: 'Proposal',
  NEGOTIATION: 'Negotiation',
  CONTRACT: 'Contract',
  WON: 'Won',
  LOST: 'Lost',
};

export default function PipelinePage() {
  const { data: deals = [], isLoading } = useDeals();

  const updateDeal = useUpdateDeal();

  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const dealsByStage = useMemo(() => {
    const grouped: Record<DealStage, Deal[]> = {
      NEW: [],
      QUALIFICATION: [],
      PROPOSAL: [],
      NEGOTIATION: [],
      CONTRACT: [],
      WON: [],
      LOST: [],
    };

    deals.forEach((deal) => {
      if (grouped[deal.stage]) {
        grouped[deal.stage].push(deal);
      }
    });

    return grouped;
  }, [deals]);

  function handleDragStart(event: DragStartEvent) {
    const deal = deals.find((deal) => deal.id === event.active.id);

    setActiveDeal(deal ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveDeal(null);

    if (!over) {
      return;
    }

    const deal = deals.find((item) => item.id === active.id);

    if (!deal) {
      return;
    }

    const newStage = over.id as DealStage;

    if (!stages.includes(newStage)) {
      return;
    }

    if (deal.stage === newStage) {
      return;
    }

    updateDeal.mutate(
      {
        id: deal.id,

        data: {
          stage: newStage,
        },
      },
      {
        onSuccess: () => {
          toast.success(`Deal moved to ${stageLabels[newStage]}`);
        },

        onError: () => {
          toast.error('Could not update deal stage');
        },
      },
    );
  }

  if (isLoading) {
    return <div className="p-6">Loading pipeline...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Sales Pipeline
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Drag deals between stages to update the sales pipeline.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          className="
            flex
            gap-4
            overflow-x-auto
            pb-6
          "
        >
          {stages.map((stage) => (
            <PipelineColumn
              key={stage}
              stage={stage}
              deals={dealsByStage[stage]}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDeal ? <DealCard deal={activeDeal} overlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

type PipelineColumnProps = {
  stage: DealStage;
  deals: Deal[];
};

function PipelineColumn({ stage, deals }: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage,
  });

  const totalValue = deals.reduce(
    (total, deal) => total + Number(deal.value ?? 0),
    0,
  );

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-[600px]
        w-[300px]
        shrink-0
        rounded-xl
        border
        p-3
        transition

        ${
          isOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-slate-200 bg-slate-100'
        }
      `}
    >
      <div className="mb-4">
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <h2
            className="
              font-semibold
              text-slate-800
            "
          >
            {stageLabels[stage]}
          </h2>

          <span
            className="
              rounded-full
              bg-white
              px-2
              py-1
              text-xs
              font-semibold
              text-slate-600
            "
          >
            {deals.length}
          </span>
        </div>

        <p
          className="
            mt-1
            text-xs
            text-slate-500
          "
        >
          €{totalValue.toLocaleString()}
        </p>
      </div>

      <div className="space-y-3">
        {deals.map((deal) => (
          <DraggableDealCard key={deal.id} deal={deal} />
        ))}

        {deals.length === 0 && (
          <div
            className="
              rounded-lg
              border-2
              border-dashed
              border-slate-300
              p-6
              text-center
              text-xs
              text-slate-400
            "
          >
            Drop deals here
          </div>
        )}
      </div>
    </div>
  );
}

function DraggableDealCard({ deal }: { deal: Deal }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: deal.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        cursor-grab
        rounded-lg
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition

        ${isDragging ? 'opacity-30' : 'hover:shadow-md'}
      `}
    >
      <DealCard deal={deal} />
    </div>
  );
}

function DealCard({
  deal,
  overlay = false,
}: {
  deal: Deal;
  overlay?: boolean;
}) {
  return (
    <div
      className={
        overlay
          ? 'w-[280px] rounded-lg border border-blue-300 bg-white p-4 shadow-xl'
          : ''
      }
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-2
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-2
          "
        >
          <Handshake
            size={17}
            className="
              shrink-0
              text-blue-600
            "
          />

          <h3
            className="
              truncate
              text-sm
              font-semibold
              text-slate-800
            "
          >
            {deal.title}
          </h3>
        </div>

        <GripVertical
          size={17}
          className="
            shrink-0
            text-slate-400
          "
        />
      </div>

      <div className="mt-4">
        <p
          className="
            text-lg
            font-bold
            text-slate-800
          "
        >
          €{Number(deal.value ?? 0).toLocaleString()}
        </p>

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            text-xs
            text-slate-500
          "
        >
          <span>Probability</span>

          <span className="font-semibold">
            {deal.probability ?? 0}%
          </span>
        </div>

        <div
          className="
            mt-2
            h-1.5
            overflow-hidden
            rounded-full
            bg-slate-100
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-blue-500
            "
            style={{
              width: `${deal.probability ?? 0}%`,
            }}
          />
        </div>

        {deal.expected_close_date && (
          <p
            className="
              mt-3
              text-xs
              text-slate-400
            "
          >
            Close:{' '}
            {new Date(deal.expected_close_date).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
