export type AiBudgetPolicy = {
  monthlyBudgetCents: number;
  dailyMessageLimit: number;
};

export type AiUsageSnapshot = {
  monthCostCents: number;
  todayMessageCount: number;
};

export type AiBudgetDecision =
  | { allowed: true; remainingBudgetCents: number; remainingMessagesToday: number }
  | { allowed: false; reason: 'monthly_budget' | 'daily_message_limit' };

export function checkAiBudget(policy: AiBudgetPolicy, usage: AiUsageSnapshot): AiBudgetDecision {
  if (policy.monthlyBudgetCents < 0 || policy.dailyMessageLimit < 0) {
    throw new Error('AI budget limits must be non-negative');
  }

  if (usage.monthCostCents >= policy.monthlyBudgetCents) {
    return { allowed: false, reason: 'monthly_budget' };
  }

  if (usage.todayMessageCount >= policy.dailyMessageLimit) {
    return { allowed: false, reason: 'daily_message_limit' };
  }

  return {
    allowed: true,
    remainingBudgetCents: policy.monthlyBudgetCents - usage.monthCostCents,
    remainingMessagesToday: policy.dailyMessageLimit - usage.todayMessageCount,
  };
}
