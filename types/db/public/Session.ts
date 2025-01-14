// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { PersonId } from './Person.ts';

/** Identifier type for public.session */
export type SessionId = string & { __brand: 'SessionId' };

/** Represents the table public.session */
export default interface Session {
  id: SessionId;

  person_id: PersonId;

  created_at: Date;
}

/** Represents the initializer for the table public.session */
export interface SessionInitializer {
  /** Default value: gen_random_uuid() */
  id?: SessionId;

  person_id: PersonId;

  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;
}

/** Represents the mutator for the table public.session */
export interface SessionMutator {
  id?: SessionId;

  person_id?: PersonId;

  created_at?: Date;
}
