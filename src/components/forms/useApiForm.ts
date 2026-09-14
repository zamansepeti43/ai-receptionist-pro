'use client';

import { useCallback, useState, type FormEvent } from 'react';

export type ApiFormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ApiFormState {
  readonly status: ApiFormStatus;
  readonly message: string | null;
}

interface ApiErrorEnvelope {
  ok: false;
  error: { code: string; message: string };
}

interface ApiSuccessEnvelope {
  ok: true;
  data: unknown;
}

export interface UseApiFormOptions {
  /** API route that receives the JSON POST body. */
  readonly endpoint: string;
  /** Message shown on success when no redirect is configured. */
  readonly successMessage: string;
  /** If set, navigate here after success instead of showing a message. */
  readonly redirectTo?: string;
  /** Transform form fields into the JSON request body. */
  readonly buildBody?: (formData: FormData) => unknown;
}

/**
 * User-facing messages for API error codes.
 *
 * The API may return developer-oriented messages or the generic
 * "Internal server error". Neither should be exposed directly to users.
 */
const MESSAGE_BY_CODE: Record<string, string> = {
  rate_limited: 'Too many attempts. Please try again in a few minutes.',
  bad_request: 'Some information is invalid. Check the fields and try again.',
  validation_error: 'Some information is invalid. Check the fields and try again.',
  unauthorized: 'Your session is no longer valid. Please sign in again.',
  forbidden: 'You do not have permission to complete this action.',
  not_found: 'The requested resource was not found.',
  conflict: 'An account with these details already exists.',
};

const FALLBACK_MESSAGE =
  'Something went wrong. Please try again, or contact us if the problem persists.';

function defaultBuildBody(formData: FormData): Record<string, string> {
  const body: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      body[key] = value;
    }
  }
  return body;
}

function messageFor(payload: unknown, httpStatus: number): string {
  const envelope = payload as Partial<ApiErrorEnvelope> | null;
  const code = envelope?.error?.code;

  if (code && MESSAGE_BY_CODE[code]) {
    return MESSAGE_BY_CODE[code];
  }

  // An exposed API message has already been approved for user display.
  const exposed = envelope?.error?.message;
  if (exposed && exposed !== 'Internal server error') {
    return exposed;
  }

  if (httpStatus >= 500) {
    return 'The service is temporarily unavailable. Please try again shortly.';
  }

  return FALLBACK_MESSAGE;
}

/**
 * Submit a form to a JSON API while exposing an observable UI state.
 *
 * Project API routes accept JSON only. A native HTML POST form sends
 * application/x-www-form-urlencoded, so this hook keeps the request contract
 * explicit and returns a user-facing error instead of navigating to raw API output.
 */
export function useApiForm(options: UseApiFormOptions): {
  state: ApiFormState;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
} {
  const [state, setState] = useState<ApiFormState>({ status: 'idle', message: null });

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      const form = event.currentTarget;
      const formData = new FormData(form);
      const body = (options.buildBody ?? defaultBuildBody)(formData);

      setState({ status: 'submitting', message: null });

      let response: Response;
      try {
        response = await fetch(options.endpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body),
        });
      } catch {
        setState({
          status: 'error',
          message: 'Connection failed. Check your network and try again.',
        });
        return;
      }

      let payload: unknown = null;
      try {
        payload = (await response.json()) as ApiSuccessEnvelope | ApiErrorEnvelope;
      } catch {
        payload = null;
      }

      if (!response.ok) {
        setState({ status: 'error', message: messageFor(payload, response.status) });
        return;
      }

      form.reset();

      if (options.redirectTo !== undefined) {
        window.location.assign(options.redirectTo);
        return;
      }

      setState({ status: 'success', message: options.successMessage });
    },
    [options],
  );

  return { state, onSubmit };
}
