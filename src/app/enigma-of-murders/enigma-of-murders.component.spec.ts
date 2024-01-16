import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnigmaOfMurdersComponent } from './enigma-of-murders.component';

describe('EnigmaOfMurdersComponent', () => {
  let component: EnigmaOfMurdersComponent;
  let fixture: ComponentFixture<EnigmaOfMurdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnigmaOfMurdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnigmaOfMurdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
