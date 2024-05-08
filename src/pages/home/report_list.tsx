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
              Authorization: `Bearer ${token.token}`,
            },
          }
        )
        .then((res) => {
          return res.data.data;
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
          {reportQuery.data &&
            reportQuery.data.length > 0 &&
            reportQuery.data.map((data: any) => (
              <TableRow key={data.id}>
                <TableCell className="text-center">{data.id}</TableCell>
                <TableCell className="text-center">Fire</TableCell>
                <TableCell className="text-center">
                  {data.description}
                </TableCell>
                <TableCell className="text-center">{}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ReportList;
