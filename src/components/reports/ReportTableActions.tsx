import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ReportTableActionsProps {
  itemId: string;
  itemName: string;
  onViewDetail: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  detailContent?: React.ReactNode;
  editContent?: React.ReactNode;
}

export const ReportTableActions = ({
  itemId,
  itemName,
  onViewDetail,
  onEdit,
  onDelete,
  detailContent,
  editContent,
}: ReportTableActionsProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleViewDetail = () => {
    setShowDetail(true);
    onViewDetail();
  };

  const handleEdit = () => {
    setShowEdit(true);
    onEdit?.();
  };

  const handleDelete = () => {
    setShowDelete(false);
    onDelete?.();
    toast({
      title: "Item Deleted",
      description: `${itemName} (${itemId}) has been deleted successfully.`,
    });
  };

  const handleSaveEdit = () => {
    setShowEdit(false);
    toast({
      title: "Changes Saved",
      description: `${itemName} (${itemId}) has been updated successfully.`,
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleViewDetail}>
            <Eye className="mr-2 h-4 w-4" />
            View Detail
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDelete(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail - {itemId}</DialogTitle>
            <DialogDescription>{itemName}</DialogDescription>
          </DialogHeader>
          {detailContent}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetail(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit - {itemId}</DialogTitle>
            <DialogDescription>Make changes to {itemName}</DialogDescription>
          </DialogHeader>
          {editContent}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEdit(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {itemName} ({itemId}). This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ReportTableActions;
