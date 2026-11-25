/**
 * Publication gate (Content Model & Governance §3): production builds include only `published`
 * entries; preview builds show every state with a visible label. Pure function — unit tested.
 */
export type PublishState = 'draft' | 'fact-check' | 'approved' | 'published';

export function isPublishable(state: PublishState, mode: 'preview' | 'production'): boolean {
  if (mode === 'preview') return true;
  return state === 'published';
}
