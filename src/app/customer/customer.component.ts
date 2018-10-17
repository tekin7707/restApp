import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { NotificationsService } from 'angular2-notifications';
import { Customer } from '../../model/Customer';
import { LoginService } from '../login/login.service';
import { User } from '../../model/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]

})
export class CustomerComponent implements OnInit {
  selectedCustomer: Customer;
  customers: Customer[] = [];
  selectedUser: User = new User();
  constructor(
    private customerService: CustomerService,
    private loginService: LoginService,
    private notificationsService: NotificationsService) {
    this.selectedUser = this.loginService.getLoginUser();
    this.getCustomers();


    setTimeout(function () {
      $('#example').DataTable();
      $('#example1').DataTable();
      $(function () {
        $('#myDataTable').DataTable(
          {
            "pagingType": 'full_numbers',
            responsive: true,
            "processing": true,
            "language": {
              "lengthMenu": "her sayfada _MENU_ kayıt gösteriliyor",
              "zeroRecords": "Kayıt Yok",
              "info": " _PAGE_ / _PAGES_ gösteriliyor",
              "infoEmpty": "Kayıt Yok",
              "infoFiltered": "(_MAX_ kayıt filtrelendi)",
              "search": "Arama",
              "processing": "bekleyin...",
              "paginate": {
                "first": "İlk",
                "last": "Son",
                "next": "Sonraki",
                "previous": "Önceki"
              },
              "aria": {
                "sortAscending": ": küçükten büyüğe",
                "sortDescending": ": büyükten küçüğe"
              }
            }
          }

        );
      });
    }, 1000);
  }

  ngOnInit() {
  }

  getCustomers() {
    this.customerService.getCustomers(this.selectedUser.company_id).subscribe(x => {
      this.customers = x;
    });

  }
}
