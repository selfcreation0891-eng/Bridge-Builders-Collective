/**
 * Canonical environment statuses.
 * Authority: docs/canonical/ENVIRONMENT_STATUS_STANDARD.md
 */
export const ENVIRONMENT_STATUSES = [
  'public',
  'public-preview',
  'steward-pilot',
  'invitation-required',
  'in-development',
  'internal',
  'planned',
  'archived',
] as const;

export type EnvironmentStatus = (typeof ENVIRONMENT_STATUSES)[number];

/** Public label and meaning for each status (used for badges and notices). */
export const STATUS_PRESENTATION: Record<
  EnvironmentStatus,
  { label: string; publicMeaning: string; showInPublicNavigation: boolean; mayPublishDestination: boolean }
> = {
  'public': {
    label: 'Available now',
    publicMeaning: 'Available now to anyone.',
    showInPublicNavigation: true,
    mayPublishDestination: true,
  },
  'public-preview': {
    label: 'Public preview',
    publicMeaning: 'Visible now and explicitly incomplete.',
    showInPublicNavigation: true,
    mayPublishDestination: true,
  },
  'steward-pilot': {
    label: 'Steward pilot',
    publicMeaning: 'Being tested with stewards before wider access.',
    showInPublicNavigation: true,
    mayPublishDestination: false,
  },
  'invitation-required': {
    label: 'Invitation required',
    publicMeaning: 'Working; access is granted by invitation.',
    showInPublicNavigation: true,
    mayPublishDestination: true,
  },
  'in-development': {
    label: 'In development',
    publicMeaning: 'Being built now; not yet publicly usable.',
    showInPublicNavigation: true,
    mayPublishDestination: false,
  },
  'internal': {
    label: 'Internal',
    publicMeaning: 'Steward and operations use only.',
    showInPublicNavigation: false,
    mayPublishDestination: false,
  },
  'planned': {
    label: 'Planned',
    publicMeaning: 'An adopted intention; not yet built.',
    showInPublicNavigation: true,
    mayPublishDestination: false,
  },
  'archived': {
    label: 'Archived',
    publicMeaning: 'Preserved; no longer active.',
    showInPublicNavigation: false,
    mayPublishDestination: false,
  },
};
