import { URIS, Kind, URIS2, Kind2, HKT2 } from '@morphic-ts/common/lib/HKT'
import { isOptionalConfig, ByInterp } from '@morphic-ts/common/lib/core'
import { ObjectInterfaceConfig, ObjectPartialConfig } from '@morphic-ts/algebras/lib/hkt'

type AnyMProps<F> = Record<string, HKT2<F, any, any>>

/**
 *  @since 0.0.1
 */
export const ObjectURI = 'ObjectURI' as const
/**
 *  @since 0.0.1
 */
export type ObjectURI = typeof ObjectURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F> {
    [ObjectURI]: ModelAlgebraObject<F>
  }
  export interface Algebra1<F extends URIS> {
    [ObjectURI]: ModelAlgebraObject1<F>
  }
  export interface Algebra2<F extends URIS2> {
    [ObjectURI]: ModelAlgebraObject2<F>
  }
  /**
   *  @since 0.0.1
   */
  export interface ObjectInterfaceConfig<E, A> {}
  /**
   *  @since 0.0.1
   */
  export interface ObjectPartialConfig<E, A> {}
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraObject<F> {
  _F: F
  interface: {
    <Props extends AnyMProps<F>>(props: Props, name: string): isOptionalConfig<
      ObjectInterfaceConfig<{ [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>,
      HKT2<F, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>
    >
    <Props extends AnyMProps<F>>(
      props: Props,
      name: string,
      config: ByInterp<
        ObjectInterfaceConfig<{ [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>,
        URIS | URIS2
      >
    ): HKT2<F, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>
  }
  partial: {
    <Props extends AnyMProps<F>>(props: Props, name: string): isOptionalConfig<
      ObjectPartialConfig<
        Partial<{ [k in keyof Props]: Props[k]['_E'] }>,
        Partial<{ [k in keyof Props]: Props[k]['_A'] }>
      >,
      HKT2<F, Partial<{ [k in keyof Props]: Props[k]['_E'] }>, Partial<{ [k in keyof Props]: Props[k]['_A'] }>>
    >
    <Props extends AnyMProps<F>>(
      props: Props,
      name: string,
      config: ByInterp<
        ObjectPartialConfig<
          Partial<{ [k in keyof Props]: Props[k]['_E'] }>,
          Partial<{ [k in keyof Props]: Props[k]['_A'] }>
        >,
        URIS | URIS2
      >
    ): HKT2<F, Partial<{ [k in keyof Props]: Props[k]['_E'] }>, Partial<{ [k in keyof Props]: Props[k]['_A'] }>>
  }
}

/**
 *  @since 0.0.1
 */
export type PropsKind1<F extends URIS, PropsA> = { [k in keyof PropsA]: Kind<F, PropsA[k]> }

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraObject1<F extends URIS> {
  _F: F
  interface: <Props>(
    props: PropsKind1<F, Props>,
    name: string,
    config?: ByInterp<ObjectInterfaceConfig<Props, Props>, F>
  ) => Kind<F, Props>
  partial: <Props>(
    props: PropsKind1<F, Props>,
    name: string,
    config?: ByInterp<ObjectPartialConfig<Props, Props>, F>
  ) => Kind<F, Partial<Props>>
}

/**
 *  @since 0.0.1
 */
export type PropsKind2<F extends URIS2, PropsA, PropsE> = {
  [k in keyof PropsA & keyof PropsE]: Kind2<F, PropsA[k], PropsE[k]>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraObject2<F extends URIS2> {
  _F: F
  interface: <PropsE, PropsA>(
    props: PropsKind2<F, PropsE, PropsA>,
    name: string,
    config: ByInterp<ObjectInterfaceConfig<PropsE, PropsA>, F>
  ) => Kind2<F, PropsE, PropsA>
  partial: <PropsE, PropsA>(
    props: PropsKind2<F, PropsE, PropsA>,
    name: string,
    config: ByInterp<ObjectPartialConfig<PropsE, PropsA>, F>
  ) => Kind2<F, Partial<PropsE>, Partial<PropsA>>
}
