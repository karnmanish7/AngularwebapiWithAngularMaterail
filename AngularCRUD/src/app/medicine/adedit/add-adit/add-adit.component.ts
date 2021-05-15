import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Medicine } from 'src/app/medicine';
import { MedicineService } from 'src/app/medicine.service';

@Component({
  selector: 'app-add-adit',
  templateUrl: './add-adit.component.html',
  styleUrls: ['./add-adit.component.css']
})
export class AddAditComponent implements OnInit {

  dataSaved = false;
  medicineForm: any;
  allmedicines: Observable<Medicine[]>;
  // dataSource: MatTableDataSource<Medicine>;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<Medicine>(true, []);
  medicineIdUpdate = null;
  massage = null;
  
  SelectedDate = null;
  isMale = true;
  isFeMale = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['select', 'Name', 'Brand', 'Price', 'Quantity','Notes', 'ExpiryDate', 'Edit', 'Delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   sampleData = [
     {
      "Id": 1,
      "Name": "coughsyrrup",
      "Brand": "cough",
      "Price": 12,
      "Quantity": 200,
      "Notes": "cough",
      "ExpiryDate": "2047-09-8"
     }
     
   ];
 
  
  


  constructor(private route: ActivatedRoute,private router: Router,private formbulider: FormBuilder, private medicineService: MedicineService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    // this.medicineService.getAllmedicine().subscribe(data => {
    //   this.dataSource = new MatTableDataSource(data);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
// debugger;

//     this.dataSource = new MatTableDataSource(this.sampleData);
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    debugger;
   
    this.medicineForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      Brand: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Quantity: ['', [Validators.required]],
      Notes: ['', [Validators.required]],
      ExpiryDate: ['', [Validators.required]]
    });
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = !!this.dataSource && this.dataSource.data.length;
    return numSelected === numRows;
  }

 /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(r => this.selection.select(r));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row: Medicine): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }
  
  DeleteData() {
    debugger;
    const numSelected = this.selection.selected;
    if (numSelected.length > 0) {
      if (confirm("Are you sure to delete items ")) {
        this.medicineService.deleteData(numSelected).subscribe(result => {
          this.SavedSuccessful(2);
          
        })
      }
    } else {
      alert("Select at least one row");
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // loadAllMedicines() {

  //   debugger;

  //   this.dataSource = new MatTableDataSource(this.sampleData);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  // }
  onFormSubmit() {
    debugger;
    
      this.router.navigate(['../'], { relativeTo: this.route });
      this.medicineIdUpdate=null;
      this.dataSaved = false;
      const medicine = this.medicineForm.value;
      this.CreateMedicine(medicine);
      this.medicineForm.reset();

   
  }

  loadMedicineToEdit(medicineId: number) {
    debugger;
    
     // Converts the route into a string that can be used 
  // with the window.open() function
  // const url = this.router.serializeUrl(
  //   this.router.createUrlTree([`/Medicine/${medicineId}`])
  // );

  //  window.open(url, '_blank');
  // window.open(url:'/Medicine');
  
  // window.open( "https://www.google.com",'_blank');
  this.router.navigateByUrl('/Medicine/'+medicineId);

let medicine:any=this.sampleData.filter(x=>x.Id==medicineId)[0];

      this.massage = null;
      this.dataSaved = false;
      this.medicineIdUpdate = medicine.Id;
      this.medicineForm.controls['Name'].setValue(medicine.Name);
      this.medicineForm.controls['Brand'].setValue(medicine.Brand);
      this.medicineForm.controls['Price'].setValue(medicine.Price);
      this.medicineForm.controls['Quantity'].setValue(medicine.Quantity);
      this.medicineForm.controls['Notes'].setValue(medicine.Notes);
      this.medicineForm.controls['ExpiryDate'].setValue(medicine.ExpiryDate);
    
      // window.open( "/Medicine",'_blank');

    // this.medicineService.getMedicineById(medicineId).subscribe(medicine => {
    //   this.massage = null;
    //   this.dataSaved = false;
    //   this.medicineIdUpdate = medicine.Id;
    //   this.medicineForm.controls['Name'].setValue(medicine.Name);
    //   this.medicineForm.controls['Brand'].setValue(medicine.Brand);
    //   this.medicineForm.controls['Price'].setValue(medicine.Price);
    //   this.medicineForm.controls['Quantity'].setValue(medicine.Quantity);
    //   this.medicineForm.controls['Notes'].setValue(medicine.Notes);
    //   this.medicineForm.controls['ExpiryDate'].setValue(medicine.ExpiryDate);
    
    // });

  }
  CreateMedicine(medicine: Medicine) {
    console.log(medicine.ExpiryDate);
    if (this.medicineIdUpdate == null) {
      this.dataSaved = true;
      this.sampleData.push(medicine);
      this.SavedSuccessful(1);
      
      this.medicineIdUpdate = null;
      this.medicineForm.reset();
      // this.medicineService.createMedicine(medicine).subscribe(
      //   () => {
      //     this.dataSaved = true;
      //     this.SavedSuccessful(1);
      //     this.loadAllMedicines();
      //     this.medicineIdUpdate = null;
      //     this.medicineForm.reset();
      //   });
    } else {
      medicine.Id = this.medicineIdUpdate;
        this.dataSaved = true;
        const targetIdx = this.sampleData.map(item => item.Id).indexOf(medicine.Id);
        this.sampleData[targetIdx] = medicine;
        this.SavedSuccessful(0);
        
        this.medicineIdUpdate = null;
        this.medicineForm.reset();

      // this.medicineService.updateMedicine(medicine).subscribe(() => {
      //   this.dataSaved = true;
      //   this.SavedSuccessful(0);
      //   this.loadAllMedicines();
      //   this.medicineIdUpdate = null;
      //   this.medicineForm.reset();
      // });
    }
  }
  deleteMedicine(medicineId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.medicineService.deleteMedicineById(medicineId).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(2);
        
        this.medicineIdUpdate = null;
        this.medicineForm.reset();

      });
    }

  }

  
  resetForm() {
    this.medicineForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.isMale = true;
    this.isFeMale = false;
    
  }

  SavedSuccessful(isUpdate) {
    if (isUpdate == 0) {
      this._snackBar.open('Record Updated Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } 
    else if (isUpdate == 1) {
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('Record Deleted Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}