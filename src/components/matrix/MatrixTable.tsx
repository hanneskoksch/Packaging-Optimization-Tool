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

  console.log(matrix);

  return (
    <div>
      <Table className="text-xs">
        <TableHeader>
          <TableRow>
            <TableHead className="align-bottom">Sustainability</TableHead>
            <TableHead className="align-bottom">Category</TableHead>
            <TableHead className="align-bottom">Variable</TableHead>
            <TableHead className="align-bottom">Sources</TableHead>
            <TableHead className="align-bottom">ID</TableHead>
            {matrix[0].slice(1).map((matrixEntry, index) => {
              if (index === matrix[0].slice(1).length - 1) {
                return (
                  <TableHead className="h-48 whitespace-nowrap align-bottom font-bold">
                    <div className="origin-bottom-left -rotate-[45deg] translate-x-[36px] w-[30px]">
                      <span className="border-b border-solid p-1">
                        Aktivsumme
                      </span>
                    </div>
                  </TableHead>
                );
              } else {
                return (
                  <TableHead className="h-48 whitespace-nowrap align-bottom">
                    <div className="origin-bottom-left -rotate-[45deg] translate-x-[36px] w-[30px]">
                      <span className="border-b border-solid p-1">
                        {matrixEntry}
                      </span>
                    </div>
                  </TableHead>
                );
              }
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {variables.map((variable, index) => (
            <TableRow key={index}>
              <TableCell className="border py-1 whitespace-nowrap">
                {variable.sustainability}
              </TableCell>
              <TableCell className="border py-1 whitespace-nowrap">
                {variable.category}
              </TableCell>
              <TableCell className="border py-1 whitespace-nowrap">
                {variable.variable}
              </TableCell>
              <TableCell className="border py-1 whitespace-nowrap">
                {variable.variableSource.join(", ")}
              </TableCell>
              {matrix[index + 1].map((matrixEntry) => (
                <TableCell className="border py-1">{matrixEntry}</TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="text-right font-bold" colSpan={5}>
              Passivsumme
            </TableCell>
            {matrix[matrix.length - 1].slice(1).map((matrixEntry) => (
              <TableCell className="border py-1">{matrixEntry}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default MatrixTable;
