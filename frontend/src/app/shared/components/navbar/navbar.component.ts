import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Web3Service } from 'src/app/features/web3/services/web3.service';
import { getBalanceOfCurrentAddress, getCurrentAddress } from 'src/app/features/web3/StoreWeb3/web3.selectors';
import { endMatchAction } from 'src/app/features/winner/WinnerStore/winner.actions';
import { selectIsEndingMatch } from 'src/app/features/winner/WinnerStore/winner.selectors';

@Component({
  selector: 'att-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public currentTheme: string;
  public currentAddress: Observable<string>;
  public balance: Observable<string>;
  public isEndingMatch: Observable<boolean>;

  constructor(private web3Service: Web3Service, private store: Store) {}

  async ngOnInit() {
    const successInit = await this.web3Service.init();
    if (successInit) {
      this.currentAddress = this.store.select(getCurrentAddress);
      this.balance = this.store.select(getBalanceOfCurrentAddress);
      this.isEndingMatch = this.store.select(selectIsEndingMatch);
    }

    this.currentTheme = localStorage.getItem('theme') || 'dark-theme';
    this.setTheme(this.currentTheme);
  }

  toggleTheme(): void {
    this.currentTheme === 'light-theme' ? this.setTheme('dark-theme') : this.setTheme('light-theme');
  }

  setTheme(theme: string): void {
    if (this.currentTheme) {
      document.body.classList.remove(this.currentTheme);
    }

    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
  }

  async connectWallet() {
    await this.web3Service.web3.eth.requestAccounts();
  }

  endMatch() {
    this.store.dispatch(endMatchAction());
  }
}
