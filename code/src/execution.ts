import type { ExecutionLimits } from "@mit-sdg/sync-engine/boundary";
/** Allow bounded provider work to finish before the public request deadline. */
export const executionLimits: ExecutionLimits = {
  maxActiveRootFlows: 32,
  maxPendingRequests: 128,
  maxActionsPerFlow: 32,
  maxFiringsPerFlow: 64,
  maxRowsPerEvaluation: 4096,
  maxRequestDurationMs: 120_000,
};
