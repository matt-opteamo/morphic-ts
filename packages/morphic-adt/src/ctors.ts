import { Remove, ExtractUnion } from './utils'
import { identity } from 'fp-ts/lib/function'
import { KeysDefinition, Tagged } from '../src'
import { record } from 'fp-ts'

export type CtorType<C extends Ctors<any, any>> = C extends Ctors<infer A, any> ? A : never

export type Of<A, Tag extends keyof A> = {
  [key in A[Tag] & string]: (a: Remove<ExtractUnion<A, Tag, key>, Tag>) => A
}

export type As<A, Tag extends keyof A> = {
  [key in A[Tag] & string]: (a: Remove<ExtractUnion<A, Tag, key>, Tag>) => ExtractUnion<A, Tag, key>
}

export interface Ctors<A, Tag extends keyof A & string> {
  of: Of<A, Tag>
  as: As<A, Tag>
  make: (a: A) => A
}

export const Ctors = <A extends Tagged<Tag>, Tag extends string>(tag: Tag) => (
  keys: KeysDefinition<A, Tag>
): Ctors<A, Tag> => {
  const ctors = record.mapWithIndex((key, _) => (props: object) => ({
    [tag]: key,
    ...props
  }))(keys)
  return {
    of: ctors as Of<A, Tag>,
    as: ctors as As<A, Tag>,
    make: identity
  }
}