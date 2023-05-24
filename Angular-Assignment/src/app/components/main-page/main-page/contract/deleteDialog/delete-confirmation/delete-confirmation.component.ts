import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {
  constructor(private dialog: MatDialogRef<DeleteConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onClose(){
    this.dialog.close(false);
  }

  onTrue(){
    this.dialog.close(true)
  }

  onFalse(){
    this.dialog.close(false)
  }

}
