type ChildrenProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
};

export default function Title({ level, children }: ChildrenProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <div className="box-title">
      <Tag className="title poppins-semibold">{children}</Tag>
    </div>
  );
}
