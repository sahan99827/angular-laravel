import {Component, Inject} from '@angular/core';
import {Item} from "../../entities/Item";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-item',
  templateUrl: './dialog-item.component.html',
  styleUrls: ['./dialog-item.component.scss']
})
export class DialogItemComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string,itemData:Item}
  ) {}
  onNoClick(): void {
    // console.log(this.data.systemData)
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
