import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AddUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`form should be invalid`, () => {
    component.addUserForm.controls['email'].setValue('');
    component.addUserForm.controls['first_name'].setValue('');
    component.addUserForm.controls['last_name'].setValue('');
    component.addUserForm.controls['avatar'].setValue('');
    component.addUserForm.controls['id'].setValue('');
    expect(component.addUserForm.valid).toBeFalsy();
  });

  it(`form should be valid`, () => {
    component.addUserForm.controls['email'].setValue('asd@asd.com');
    component.addUserForm.controls['first_name'].setValue('ashsih');
    component.addUserForm.controls['last_name'].setValue('ashish');
    component.addUserForm.controls['avatar'].setValue('ashshs');
    component.addUserForm.controls['id'].setValue('3');
    expect(component.addUserForm.valid).toBeTruthy();
  });

  it(`should have as button 'Create'`, () => {
    const fixture = TestBed.createComponent(AddUserComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Create');
  });
});
