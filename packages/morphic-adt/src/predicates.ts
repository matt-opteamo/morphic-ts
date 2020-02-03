import { ExtractUnion, ElemType } from './utils'
import { KeysDefinition } from '../src'
import { record } from 'fp-ts'

export type Is<A, Tag extends keyof A> = {
  [key in A[Tag] & string]: (a: A) => a is ExtractUnion<A, Tag, key>
}

export interface IsAny<A, Tag extends keyof A> {
  <Keys extends A[Tag][]>(keys: Keys): (a: A) => a is ExtractUnion<A, Tag, ElemType<Keys>>
}

export interface Verified<A> {
  (a: A): a is A
}

export interface Predicates<A, Tag extends keyof A & string> {
  is: Is<A, Tag>
  verified: Verified<A>
  isAnyOf: IsAny<A, Tag>
}

export const Predicates = <A, Tag extends keyof A & string>(tag: Tag) => (
  keys: KeysDefinition<A, Tag>
): Predicates<A, Tag> => ({
  is: record.mapWithIndex((key, _) => (rest: A) => (rest[tag] as any) === key)(keys) as any, // FIXME: typecheck that
  verified: (a: A): a is A => ((a[tag] as unknown) as string) in keys,
  isAnyOf: <Keys extends A[Tag][]>(keys: Keys) => (rest: A): rest is ExtractUnion<A, Tag, ElemType<Keys>> =>
    keys.indexOf(rest[tag]) !== -1
})