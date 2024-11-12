import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";
import { createMatrix } from "@/utils/matrix-calculations";
import { useMemo } from "react";

interface IProps {
  variables: ICsvVariable[];
  interactions: ICsvInteraction[];
}

function MatrixTable({ variables, interactions }: IProps) {
  const matrix = useMemo(
    () => createMatrix(variables, interactions),
    [variables, interactions],
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="align-bottom">Sustainability</TableHead>
            <TableHead className="align-bottom">Category</TableHead>
            <TableHead className="align-bottom">Variable</TableHead>
            <TableHead className="align-bottom">Sources</TableHead>
            <TableHead className="align-bottom">ID</TableHead>
            {matrix[0].slice(1).map((matrixEntry) => (
              <TableHead className="h-48 whitespace-nowrap align-bottom">
                <div className="origin-bottom-left -rotate-[45deg] translate-x-[36px] w-[30px]">
                  <span className="border-b border-solid p-1">
                    {matrixEntry}
                  </span>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {variables.map((variable, index) => (
            <TableRow key={index}>
              <TableCell className="border py-1">
                {variable.sustainability}
              </TableCell>
              <TableCell className="border py-1">{variable.category}</TableCell>
              <TableCell className="border py-1">{variable.variable}</TableCell>
              <TableCell className="border py-1">
                {variable.variableSource}
              </TableCell>
              {matrix[index + 1].map((matrixEntry) => (
                <TableCell className="border py-1">{matrixEntry}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MatrixTable;
