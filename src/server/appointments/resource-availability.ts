export type Resource = { id: string; active: boolean };
export type ResourceBusyInterval = { resourceId: string; start: Date; end: Date };

export function findAvailableResource(
  resources: Resource[],
  busy: ResourceBusyInterval[],
  start: Date,
  end: Date,
): Resource | null {
  if (start >= end) return null;
  const active = resources.filter((resource) => resource.active);
  return (
    active.find((resource) =>
      busy.every(
        (interval) =>
          interval.resourceId !== resource.id || interval.end <= start || interval.start >= end,
      ),
    ) ?? null
  );
}
