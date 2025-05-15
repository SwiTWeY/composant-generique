import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTableComponentComponent } from './generic-table-component.component';
import { AppComponent } from '../app.component';
import { By } from '@angular/platform-browser';

describe('GenericTableComponentComponent', () => {
  let component: GenericTableComponentComponent;
  let fixture: ComponentFixture<GenericTableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericTableComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('affichage des données dans le tableau', () => {
    component.colonne = ['Nom', 'Age', 'Ville'];

    component.data = [
      { Nom: 'Alice', Age: 28, Ville: 'Paris' },
      { Nom: 'Bob', Age: 35, Ville: 'Lyon' },
      { Nom: 'Claire', Age: 22, Ville: 'Marseille' },
    ];
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
    expect(rows[0].textContent).toContain('Alice');
    expect(rows[1].textContent).toContain('Bob');
    expect(rows[2].textContent).toContain('Claire');
  });
  it('les en-tetes des colones', () => {
    component.colonne = ['Nom', 'Age', 'Ville'];

    fixture.detectChanges();
    const entete = fixture.nativeElement.querySelectorAll('thead th');
    expect(entete.length).toBe(3);
    expect(entete[0].textContent).toContain('Nom');
    expect(entete[1].textContent).toContain('Age');
    expect(entete[2].textContent).toContain('Ville');
  });
  it('verif que le tri fonctionne', () => {
    component.colonne = ['Nom'];

    component.data = [{ Nom: 'Bob' }, { Nom: 'Alice' }];
    fixture.detectChanges();
    const entete = fixture.debugElement.query(By.css('thead th'));
    entete.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.data[0]['Nom']).toBe('Alice');
    expect(component.data[1]['Nom']).toBe('Bob');
  });
  it('verif de la pagination', () => {
    component.colonne = ['Nom'];
    component.data = Array.from({ length: 25 }, (_, i) => ({
      Nom: `Nom ${i + 1}`,
    }));
    component.itemsPerPage = 10;
    component.currentPage = 2;
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(20);
  });
});
