import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileInput } from "@/components/ui/file-input";

const InteractiveTable = () => {
  const [rows, setRows] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true); // Change this to test different roles
  const [newRow, setNewRow] = useState({ id: "", name: "", role: "", notes: "", documents: null });

  const handleAddRow = () => {
    setRows([...rows, newRow]);
    setNewRow({ id: "", name: "", role: "", notes: "", documents: null });
  };

  const handleEditRow = (index, updatedRow) => {
    const updatedRows = [...rows];
    updatedRows[index] = updatedRow;
    setRows(updatedRows);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleAddNote = (index, note) => {
    const updatedRows = [...rows];
    updatedRows[index].notes = note;
    setRows(updatedRows);
  };

  const handleUploadDocument = (index, document) => {
    const updatedRows = [...rows];
    updatedRows[index].documents = document;
    setRows(updatedRows);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Interactive Table</h1>
      {isAdmin && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">Add Row</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Row</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="id">ID</Label>
                <Input id="id" value={newRow.id} onChange={(e) => setNewRow({ ...newRow, id: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={newRow.name} onChange={(e) => setNewRow({ ...newRow, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={newRow.role} onChange={(e) => setNewRow({ ...newRow, role: e.target.value })} />
              </div>
              <Button onClick={handleAddRow}>Add</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Documents</TableHead>
            {isAdmin && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>
                <Textarea
                  value={row.notes}
                  onChange={(e) => handleAddNote(index, e.target.value)}
                  disabled={!isAdmin}
                />
              </TableCell>
              <TableCell>
                <FileInput
                  onChange={(e) => handleUploadDocument(index, e.target.files[0])}
                  disabled={!isAdmin}
                />
              </TableCell>
              {isAdmin && (
                <TableCell>
                  <Button variant="secondary" onClick={() => handleEditRow(index, row)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDeleteRow(index)}>Delete</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InteractiveTable;