import {Component, Inject} from '@angular/core';
import {System} from "../../entities/system";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(
  public dialogRef: MatDialogRef<DialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string,systemData:System}
  ) {}
  onNoClick(): void {
    // console.log(this.data.systemData)
    this.dialogRef.close(false);
  }

  onYesClick(): void {

    this.dialogRef.close(true);
  }
}
