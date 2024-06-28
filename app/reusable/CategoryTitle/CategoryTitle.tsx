type ChildrenProps ={
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode
}


export default function CategoryTitle({level,children}: ChildrenProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag className="poppins-regular">{children}</Tag>
  )
}
