import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [UserProfileComponent]
})
export class UserModule {}