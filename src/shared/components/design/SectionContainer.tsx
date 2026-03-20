export const SectionContainer: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border p-4 rounded-lg space-y-3">
    {title && <h2 className="text-lg font-semibold">{title}</h2>}
    {children}
  </div>
);
