import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
  ReactElement,
  forwardRef
} from 'react'

type AsProps<T extends ElementType> = {
  as?: T
}

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref']

type PolymorphicComponentProps<
  T extends ElementType,
  Props = object
> = PropsWithChildren<Props & AsProps<T>> &
  Omit<ComponentPropsWithoutRef<T>, keyof (Props & AsProps<T>)>

export type PolymorphcComponentPropsWithRef<
  T extends ElementType,
  Props = object
> = PolymorphicComponentProps<T, Props> & { ref?: PolymorphicRef<T> }

const PolymorphicComponent: <T extends ElementType = 'span'>(
  props: PolymorphcComponentPropsWithRef<T>
) => ReactElement | null = forwardRef(
  <T extends ElementType = 'span'>(
    { as, children, ...props }: PolymorphcComponentPropsWithRef<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const Component = as || 'span'
    return (
      <Component {...props} ref={ref}>
        {children}
      </Component>
    )
  }
)

export default PolymorphicComponent
