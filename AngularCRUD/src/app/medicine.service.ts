import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicine } from './medicine';


@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  url = 'http://localhost:59465/Api/Medicine';
  constructor(private http: HttpClient) { }
  getAllMedicine(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.url + '/AllMedicineDetails');
  }
  getMedicineById(medicineId: number): Observable<Medicine> {
    return this.http.get<Medicine>(this.url + '/GetMedicineDetailsById/' + medicineId);
  }
  createMedicine(medicine: Medicine): Observable<Medicine> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Medicine>(this.url + '/InsertMedicineDetails/',
    medicine, httpOptions);
  }
  updateMedicine(medicine: Medicine): Observable<Medicine> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.put<Medicine>(this.url + '/UpdateMedicineDetails/',
    medicine, httpOptions);
  }
  deleteMedicineById(medicineid: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/DeleteMedicineDetails?id=' + medicineid,
      httpOptions);
  }


  deleteData(user: Medicine[]): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<string>(this.url + '/DeleteRecord/', user, httpOptions);
  }  
}
