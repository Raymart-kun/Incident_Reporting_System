import Container from "@/components/Container";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { user$ } from "@/lib/states/userState";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const ReportList = () => {
  const user: any = user$.user.get();
  const token = user$.token.get();

  const reportQuery = useQuery({
    queryKey: ["reportlist"],
    queryFn: () =>
      axios
        .get(
          `${import.meta.env.VITE_STAGING_BASE_URL}/incident-report/user/${
            user.id
          }/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          return res;
        }),
  });

  return (
    <Container title="Report List">
      <Table>
        <TableCaption>A list of your reports.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead className="text-center">City</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">INV001</TableCell>
            <TableCell className="text-center">Fire</TableCell>
            <TableCell className="text-center">House Fire</TableCell>
            <TableCell className="text-center">Quezon City</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

export default ReportList;
