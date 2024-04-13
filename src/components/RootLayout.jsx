import { Columns, Column } from "./basicComponents/Column";
export default function RootLayout({ left, right }) {
  return (
    <Columns>
      <Column ratio={3}>{left}</Column>
      <Column ratio={9}>{right}</Column>
    </Columns>
  );
}
