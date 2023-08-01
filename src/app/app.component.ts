import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  books:any[] =[];
  bookDetails:any[] =[];
  selectedVolumeInfo:any;
  page = 10;
  pageSize=10
  searchText='';
  dropDownOptions = ['select an option','title','author', 'description'];
  selectedDropDownValue= '';

  constructor(private http: HttpClient, private modalService: NgbModal,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.http.get('assets/books_data.json').subscribe((response:any)=>{ this.books = response['books']; });
    this.http.get('assets/book_details.json').subscribe((response:any)=>{this.bookDetails = response});
    this.selectDropDownValue('select an option');

  }


  openXl(content: any,bookId:any) {
		this.modalService.open(content, { size: 'xl',scrollable: true });
    this.bookDetails.forEach((element)=>{
      if(element.id===bookId){
        this.selectedVolumeInfo = element.volumeInfo;

      }
    })
	}

  parseDescription(bookDescription:string){
    return this.sanitizer.bypassSecurityTrustHtml(bookDescription);
  }



  selectDropDownValue(value:string){
    this.selectedDropDownValue = value;
  }


}
