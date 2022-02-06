import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { Store } from '@ngrx/store';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import Web3 from 'web3';
import { changeAddressAction, getAddressAction } from '../../Store/web3.actions';
import { Contract } from 'web3-eth-contract';
import AttentionsContractJSON from '../../../../ethereum/contracts/Attentions.json';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  public web3: Web3;
  public provider: any;
  public AttentionsContract: Contract;

  constructor(private store: Store, private snackbarService: SnackbarService) {}

  async init() {
    this.provider = await detectEthereumProvider();
    if (this.provider) {
      this.web3 = new Web3(this.provider);
      this.registerMetamaskEvents();
      this.initContracts();

      this.store.dispatch(getAddressAction());
      return true;
    } else {
      this.snackbarService.show('make sure to install a wallet');
      return false;
    }
  }

  private initContracts() {
    this.AttentionsContract = new this.web3.eth.Contract(
      AttentionsContractJSON.abi as any,
      environment.attentionsContractAddress,
    );
  }

  private registerMetamaskEvents() {
    this.provider.on('accountsChanged', async (accounts: string[]) => {
      this.store.dispatch(changeAddressAction({ address: accounts[0] }));
    });

    this.provider.on('chainChanged', (chainId: string) => {
      if (chainId !== '0x1' && chainId !== '0x539' && chainId !== '0x3') {
        this.snackbarService.show('Wrong Chain selected');
      }
    });
  }
}
